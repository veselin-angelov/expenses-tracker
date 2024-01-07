import { ResultWithCountDto } from '@app/shared/dtos';
import { User } from '@app/users/entities';
import { ApiProperty } from '@nestjs/swagger';

export class UsersResultWithCountDto extends ResultWithCountDto<User> {
  @ApiProperty({
    type: () => User,
    isArray: true,
  })
  public result: User[];
}
