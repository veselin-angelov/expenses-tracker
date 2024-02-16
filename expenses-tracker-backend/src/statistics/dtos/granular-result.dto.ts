export class GranularResultDto {
  public constructor(period: string, total: number) {
    this.period = period;
    this.total = total;
  }

  public period: string;
  public total: number;
}
