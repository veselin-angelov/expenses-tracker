import { ApiProperty } from '@nestjs/swagger';

export class MessageResponseDto {
  public constructor(message?: string) {
    if (message) {
      this.message = message;
    }
  }

  @ApiProperty()
  public message: string;

  @ApiProperty({
    type: 'boolean',
  })
  public success = true;
}
