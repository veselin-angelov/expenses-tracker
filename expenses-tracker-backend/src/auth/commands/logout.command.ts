import { User } from '@app/users/entities';

export class LogoutCommand {
  constructor(public readonly user: User) {}
}
