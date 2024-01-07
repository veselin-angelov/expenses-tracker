import { User } from '@app/users/entities';
import { EntityRepository } from '@mikro-orm/postgresql';

export class UserRepository extends EntityRepository<User> {}
