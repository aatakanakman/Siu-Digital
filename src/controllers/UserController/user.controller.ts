import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/services/base.service';
import { User } from '../../models/user.schema';
//User Controller.
@ApiTags('users')
@Controller('users')
export default class UserController {
  constructor(private readonly UserService: UserService) {}
  //Create User Endpoint
  @Post()
  async createUser(@Res() response, @Body() user: User) {
    const newUser = await this.UserService.create(user);
    return response.status(HttpStatus.CREATED).json({
      newUser,
    });
  }

  //Update User Endpoint
  @Put('/:id')
  async update(@Res() response, @Param('id') id, @Body() user: User) {
    const updatedUser = await this.UserService.update(id, user);
    return response.status(HttpStatus.OK).json({
      updatedUser,
    });
  }

  //Get All User Endpoint
  @Get()
  async fetchAll(@Res() response) {
    const users = await this.UserService.readAll();
    return response.status(HttpStatus.OK).json({
      users,
    });
  }

  // Update all user fields
  //It updates a new field from the Body for all collection members.
  @Put('/add/new_field')
  async addField(@Res() res, @Body() key: Record<string, unknown>) {
    try {
      await this.UserService.addNewField(key);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Add new field success', key });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        err,
      });
    }
  }

  //Delete User Endpoint
  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    const deletedUser = await this.UserService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedUser,
    });
  }
}
