import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { InjectUser } from '@app/auth/decorators';
import { User } from '@app/users/entities';
import { SpendingQueryDto } from '@app/statistics/dtos';
import { SpendingQuery } from '@app/statistics/queries';
import { ApiSpending } from '@app/statistics/decorators';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiSpending()
  @Get('spending')
  public async getSpending(
    @Query() dto: SpendingQueryDto,
    @InjectUser() user: User,
  ) {
    return await this.queryBus.execute(new SpendingQuery(dto, user));
  }
}
