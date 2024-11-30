import { ConflictException, Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Query } from 'express-serve-static-core'

@Injectable()
export class MessagesService {
  constructor(private readonly messagesRepository: MessagesRepository) {}
  
  async search(query: Query) {
    return await this.messagesRepository.search(query);;
  }

  async create(createMessageDto: CreateMessageDto) {
    const messageExists = await this.messagesRepository.findByTitle(createMessageDto.title);
    if (messageExists) throw new ConflictException('Esta mensagem ja existe');
    
    return await this.messagesRepository.create(createMessageDto);
  }

  async findAll() {    
    return await this.messagesRepository.findAll();
  }

  async findOne(id: string) {
    return await this.messagesRepository.findOne(id);;
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    const messageExists = await this.messagesRepository.findByTitle(updateMessageDto.title);
    if (messageExists) throw new ConflictException('Esta mensagem ja existe');
    return await this.messagesRepository.update(id, updateMessageDto);;
  }

  async remove(id: string) {
    return await this.messagesRepository.remove(id);;
  }
}
