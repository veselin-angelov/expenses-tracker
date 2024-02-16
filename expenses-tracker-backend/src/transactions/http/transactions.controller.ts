import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TransactionQuery, TransactionsQuery } from '@app/transactions/queries';
import {
  ApiCreateTransactionFromImage,
  ApiSaveTransaction,
  ApiTransaction,
  ApiTransactions,
} from '@app/transactions/decorators';
import { InjectUser } from '@app/auth/decorators';
import { User } from '@app/users/entities';
import { ListingQueryDto } from '@app/shared/dtos';
import {
  TransactionDto,
  TransactionFromImageDto,
  TransactionsResultWithCountDto,
} from '@app/transactions/dtos';
import { Transaction } from '@app/transactions/entities';
import {
  CreateTransactionFromImageCommand,
  SaveTransactionCommand,
} from '@app/transactions/commands';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @ApiTransactions()
  @Get()
  async find(
    @Query() query: ListingQueryDto,
    @InjectUser() user: User,
  ): Promise<TransactionsResultWithCountDto> {
    return await this.queryBus.execute(
      new TransactionsQuery(query, {
        owner: user,
      }),
    );
  }

  @ApiTransaction()
  @Get(':id')
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
    @InjectUser() user: User,
  ): Promise<Transaction> {
    return await this.queryBus.execute(
      new TransactionQuery(id, {
        owner: user,
      }),
    );
  }

  @ApiCreateTransactionFromImage()
  @Post('image')
  async createFromImage(
    @Body() dto: TransactionFromImageDto,
    @InjectUser() user: User,
  ): Promise<Transaction> {
    return await this.commandBus.execute(
      new CreateTransactionFromImageCommand(dto, user),
    );
  }

  @ApiSaveTransaction()
  @Post()
  async save(
    @Body() dto: TransactionDto,
    @InjectUser() user: User,
  ): Promise<Transaction> {
    return await this.commandBus.execute(new SaveTransactionCommand(dto, user));
  }

  @ApiSaveTransaction(true)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: TransactionDto,
    @InjectUser() user: User,
  ): Promise<Transaction> {
    return await this.commandBus.execute(
      new SaveTransactionCommand(
        dto,
        user,
        {
          owner: user,
        },
        id,
      ),
    );
  }
}
