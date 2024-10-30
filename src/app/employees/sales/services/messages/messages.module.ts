import { Module } from '@nestjs/common';
import { MessagesRepository } from 'src/domain/repositories/employees/sales/services/messages/messages.repository';
import { MessagesService } from 'src/domain/services/employees/sales/services/messages/messages.service';
import { MessagesController } from 'src/interfaces/controllers/employees/sales/services/messages/messages.controller';

import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepository, PrismaService],
})

export class MessagesModule {}
