import * as moment from 'moment';
import * as mimeTypes from 'mime-types';
import * as path from 'path';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SaveFileCommand } from '@app/files/commands/save-file.command';
import { EntityManager } from '@mikro-orm/postgresql';
import { File } from '@app/files/entities';
import { ObjectsService } from '@lab08/nestjs-s3';
import { v4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { AWS_S3_CONFIG_KEY, AwsS3Config } from '@app/config/aws-s3';
import { FileResponseTransformerFactory } from '@app/files/factories';

@CommandHandler(SaveFileCommand)
export class SaveFileHandler implements ICommandHandler<SaveFileCommand> {
  public constructor(
    private readonly em: EntityManager,
    private readonly objectService: ObjectsService,
    private readonly configService: ConfigService,
    private readonly fileResponseTransformer: FileResponseTransformerFactory,
  ) {}

  public async execute({ file, user }: SaveFileCommand): Promise<File> {
    const { bucket } = this.configService.get<AwsS3Config>(AWS_S3_CONFIG_KEY)!;

    const fileEntity = new File();

    const date = moment().format('YYYY-MM-DD');
    const extension = path.extname(file.originalname);
    const key = `${date}/${file.originalname.replace(/ /g, '-')}-${v4()}`;
    const fileMimeType = mimeTypes.lookup(extension) as string;

    await this.objectService.putObject(bucket, file.buffer, key, {
      ContentType: fileMimeType,
    });

    fileEntity.fileName = file.originalname;
    fileEntity.setCreatedBy(user);
    fileEntity.remote = key;
    fileEntity.extension = extension;
    fileEntity.mimeType = fileMimeType;
    fileEntity.size = file.size;
    fileEntity.bucket = bucket;

    await this.em.persistAndFlush(fileEntity);

    return await this.fileResponseTransformer.transform(fileEntity);
  }
}
