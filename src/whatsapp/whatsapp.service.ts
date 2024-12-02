import { Injectable } from '@nestjs/common';
import { CreateWhatsappDto } from './dto/create-whatsapp.dto';
import { UpdateWhatsappDto } from './dto/update-whatsapp.dto';
import { WhatsAppRepository } from './whatsapp.repository';
import { Query } from 'express-serve-static-core'

@Injectable()
export class WhatsappService {
  constructor(private readonly whatsAppRepository: WhatsAppRepository) {}

  async search(query: Query) {
    return await this.whatsAppRepository.search(query);;
  }

  async toggleStatus(id: string) {
    return await this.whatsAppRepository.toggleStatus(id);
  }

  async create(createWhatsappDto: CreateWhatsappDto) {
    return await this.whatsAppRepository.create(createWhatsappDto);;
  }

  async findAllSuportNumbers() {
    return await this.whatsAppRepository.findAllSuportNumbers();;
  }

  async findAllSalesNumbers() {
    return await this.whatsAppRepository.findAllSalesNumbers();;
  }

  async findAll() {
    return await this.whatsAppRepository.findAll();;
  }

  findOne(id: number) {
    return `This action returns a #${id} whatsapp`;
  }

  async update(id: string, updateWhatsappDto: UpdateWhatsappDto) {
    return await this.whatsAppRepository.update(id, updateWhatsappDto);;
  }

  async remove(id: string) {
    return await this.whatsAppRepository.remove(id);;
  }
}
