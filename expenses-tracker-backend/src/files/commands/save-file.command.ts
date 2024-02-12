import { ICommand } from '@nestjs/cqrs';
import { User } from '@app/users/entities';

export class SaveFileCommand implements ICommand {
  public constructor(
    public readonly file: Express.Multer.File,
    public readonly user: User,
  ) {}
}
