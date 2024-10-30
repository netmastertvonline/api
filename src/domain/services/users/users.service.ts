import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/interfaces/dtos/users/create-user.dto';
import { UpdateUserDto } from 'src/interfaces/dtos/users/update-user.dto';
import { UsersRepository } from '../../repositories/users/users.repository';
import { signInUserDto } from 'src/interfaces/dtos/users/signIn-user.dto';

@Injectable()
export class UsersService {

  constructor(private repository: UsersRepository){}

  async signIn(signInUserDto: signInUserDto) {
    const user = await this.repository.signIn(signInUserDto);
    if (!user) throw new NotFoundException({ message: "Email ou senha inválidos", error: "Not Found", statusCode: 404 });

    return 
  }

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.repository.findByEmail(createUserDto.email);
    if (userExists) throw new NotFoundException({ message: "Email já está em uso", error: "Not Found", statusCode: 404 });

    return await this.repository.create(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
