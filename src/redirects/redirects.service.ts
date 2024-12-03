import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRedirectDto } from './dto/create-redirect.dto';
import { UpdateRedirectDto } from './dto/update-redirect.dto';
import { RedirectRepository } from './redirects.repository';
import { Query } from 'express-serve-static-core'

@Injectable()
export class RedirectsService {
  constructor(private readonly redirectRepository: RedirectRepository) {}

  async search(query: Query) {
    return await this.redirectRepository.search(query);;
  }

  async create(createRedirectDto: CreateRedirectDto) {
    const redirectExists = await this.redirectRepository.findByRedirectTo(createRedirectDto.redirect_to);
    if (redirectExists) throw new ConflictException('Este link ja existe');
    
    return await this.redirectRepository.create(createRedirectDto);
  }

  async findAllAciveRedirects() {
    return await this.redirectRepository.findAllAciveRedirects();
  }

  async findAll() {
    return await this.redirectRepository.findAll();
  }

  async findOne(id: number) {
    return `This action returns a #${id} redirect`;
  }

  async update(id: number, updateRedirectDto: UpdateRedirectDto) {
    return `This action updates a #${id} redirect`;
  }

  async remove(id: string) {
    return await this.redirectRepository.remove(id);
  }
}
