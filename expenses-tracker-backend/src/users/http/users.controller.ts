import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { User } from '@app/users/entities';
import { ApiUser } from '@app/users/decorators';
import { UserQuery } from '@app/users/queries';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiUser()
  @Get('/:id')
  public async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return await this.queryBus.execute(new UserQuery(id));
  }
}
