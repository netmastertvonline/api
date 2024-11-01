import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { Query } from 'express-serve-static-core'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async search(query: Query) {
    return await this.usersRepository.search(query);;
  }

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.create(createUserDto);;
  }

  async findAll() {
    return await this.usersRepository.findAll();;
  }

  async findOne(id: string) {
    return await this.usersRepository.findOne(id);;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
