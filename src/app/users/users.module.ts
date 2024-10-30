import { Module } from '@nestjs/common';
import { UsersRepository } from 'src/domain/repositories/users/users.repository';
import { UsersService } from 'src/domain/services/users/users.service';
import { UsersController } from 'src/interfaces/controllers/users/users.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PrismaService],
})
export class UsersModule {}
