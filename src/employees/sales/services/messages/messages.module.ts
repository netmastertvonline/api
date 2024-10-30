import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesRepository } from './messages.repository';

@Module({
  controllers: [MessagesController],
  providers: [PrismaService, MessagesService, MessagesRepository],
})

export class MessagesModule {}
