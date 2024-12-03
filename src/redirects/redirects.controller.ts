import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RedirectsService } from './redirects.service';
import { CreateRedirectDto } from './dto/create-redirect.dto';
import { UpdateRedirectDto } from './dto/update-redirect.dto';
import { Query as ExpressQuery } from 'express-serve-static-core'

@Controller('redirects')
export class RedirectsController {
  constructor(private readonly redirectsService: RedirectsService) {}

  @Get('results')
  async search(@Query() query: ExpressQuery) {
    return await this.redirectsService.search(query);
  }

  @Post()
  async create(@Body() createRedirectDto: CreateRedirectDto) {
    return await this.redirectsService.create(createRedirectDto);
  }

  @Get('actives')
  async findAllAciveRedirects() {
    return await this.redirectsService.findAllAciveRedirects();
  }

  @Get()
  async findAll() {
    return await this.redirectsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.redirectsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRedirectDto: UpdateRedirectDto) {
    return await this.redirectsService.update(+id, updateRedirectDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.redirectsService.remove(id);
  }
}
