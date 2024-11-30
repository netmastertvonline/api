import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Query as ExpressQuery } from 'express-serve-static-core'

@Controller('employees/sales/services/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
  
  @Get('results')
  async search(@Query() query: ExpressQuery) {
    return await this.messagesService.search(query);
  }

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    return await this.messagesService.create(createMessageDto);
  }

  @Get()
  async findAll() {
    return await this.messagesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.messagesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {

    return await this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.messagesService.remove(id);
  }
}
