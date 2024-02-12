import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserTransactionsQuery } from '@app/transactions/queries';

@ApiTags('Transactions')
@Controller('users/:userId/transactions')
export class TransactionsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async findAllByUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    // @Query() dto: any,
  ) {
    return await this.queryBus.execute(new GetUserTransactionsQuery(userId));
  }
}
