import { ApiProperty } from '@nestjs/swagger';

export class ResultWithCountDto<T> {
  @ApiProperty({
    readOnly: true,
    isArray: true,
  })
  public result: T[];

  @ApiProperty({
    readOnly: true,
  })
  public count: number = 0;

  @ApiProperty({
    readOnly: true,
  })
  public fetched: number = 0;

  public constructor(result: T[], count: number) {
    this.result = result;
    this.fetched = result.length;
    this.count = count;
  }
}
