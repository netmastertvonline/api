import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { CreateWhatsappDto } from './dto/create-whatsapp.dto';
import { UpdateWhatsappDto } from './dto/update-whatsapp.dto';
import { Query as ExpressQuery } from 'express-serve-static-core'

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Get('results')
  async search(@Query() query: ExpressQuery) {
    return await this.whatsappService.search(query);
  }

  @Patch('/toggle/:id')
  async toggleStatus(@Param('id') id: string) {
    return await this.whatsappService.toggleStatus(id);
  }

  @Post()
  async create(@Body() createWhatsappDto: CreateWhatsappDto) {
    return await this.whatsappService.create(createWhatsappDto);
  }

  @Get('suport')
  async findAllSuportNumbers() {
    return await this.whatsappService.findAllSuportNumbers();
  }
  
  @Get('sales')
  async findAllSalesNumbers() {
    return await this.whatsappService.findAllSalesNumbers();
  }

  @Get()
  async findAll() {
    return await this.whatsappService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.whatsappService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateWhatsappDto: UpdateWhatsappDto) {    
    return await this.whatsappService.update(id, updateWhatsappDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.whatsappService.remove(id);
  }
}
