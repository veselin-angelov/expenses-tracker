export class GranularResultDto {
  public constructor(period: number, display: string, total: number) {
    this.period = period;
    this.display = display;
    this.total = total;
  }

  public period: number;
  public display: string;
  public total: number;
}
