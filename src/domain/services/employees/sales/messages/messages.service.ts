import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateMessageDto } from 'src/interfaces/dtos/employees/sales/messages/update-message.dto';
import { MessagesRepository } from 'src/domain/repositories/employees/sales/messages/messages.repository';
import { CreateMessageDto } from 'src/interfaces/dtos/employees/sales/messages/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly messagesRepository: MessagesRepository) {}

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
