import { Granularity, Period } from '@app/statistics/enums';
import { GranularResultDto } from '@app/statistics/dtos/granular-result.dto';

export class SpendingResultDto {
  constructor(
    period: Period,
    total: number,
    granularity: Granularity,
    granularResults: GranularResultDto[],
  ) {
    this.period = period;
    this.total = total;
    this.granularity = granularity;
    this.granularResults = granularResults;
  }

  public period: Period;
  public total: number;
  public granularity: Granularity;
  public granularResults: GranularResultDto[];
}
