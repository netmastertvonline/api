import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from '../../../domain/services/users/users.service';
import { CreateUserDto } from 'src/interfaces/dtos/users/create-user.dto';
import { UpdateUserDto } from 'src/interfaces/dtos/users/update-user.dto';
import { signInUserDto } from 'src/interfaces/dtos/users/signIn-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signIn')
  signIn(@Body() signInUserDto: signInUserDto) {    
    return this.usersService.signIn(signInUserDto);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {    
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
