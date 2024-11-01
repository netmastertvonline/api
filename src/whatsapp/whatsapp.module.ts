import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WhatsappService } from './whatsapp.service';
import { WhatsappController } from './whatsapp.controller';
import { WhatsAppRepository } from './whatsapp.repository';

@Module({
  controllers: [WhatsappController],
  providers: [PrismaService, WhatsappService, WhatsAppRepository],
})
export class WhatsappModule {}
