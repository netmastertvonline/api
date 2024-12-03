import { Module } from '@nestjs/common';
import { RedirectsService } from './redirects.service';
import { RedirectsController } from './redirects.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedirectRepository } from './redirects.repository';

@Module({
  controllers: [RedirectsController],
  providers: [PrismaService, RedirectsService, RedirectRepository],
})
export class RedirectsModule {}
