import { EntityRepository } from '@mikro-orm/postgresql';
import { Transaction } from '@app/transactions/entities';

export class TransactionRepository extends EntityRepository<Transaction> {}
