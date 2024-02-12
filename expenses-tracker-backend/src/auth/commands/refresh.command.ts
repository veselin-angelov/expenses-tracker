import { User } from '@app/users/entities';

export class RefreshCommand {
  constructor(public readonly user: User) {}
}
