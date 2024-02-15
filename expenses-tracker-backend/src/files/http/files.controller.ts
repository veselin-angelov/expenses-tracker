import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Express } from 'express';
import { ApiFile, ApiSaveFile } from '@app/files/decorators';
import { FileQuery } from '@app/files/queries';
import { SaveFileCommand } from '@app/files/commands';
import { InjectUser } from '@app/auth/decorators';
import { User } from '@app/users/entities';
import { FileValidationService } from '@app/files/services';
import { File } from '@app/files/entities';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  public constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly fileValidationService: FileValidationService,
  ) {}

  @ApiFile()
  @Get(':id')
  public async single(
    @Param('id', ParseUUIDPipe) id: string,
    @InjectUser() user: User,
  ): Promise<File> {
    return await this.queryBus.execute(new FileQuery(id, { createdBy: user }));
  }

  @ApiSaveFile()
  @Post()
  public async create(
    @UploadedFile() file: Express.Multer.File,
    @InjectUser() user: User,
  ): Promise<File> {
    await this.fileValidationService.validate(file);

    return await this.commandBus.execute(new SaveFileCommand(file, user));
  }
}
