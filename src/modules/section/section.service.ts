import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateSectionDto, CreateSectionDto } from './dto';
import { Section } from './section.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
  ) {}

  async getAll() {
    return await this.sectionRepository.find({
      order: {
        title: 'ASC',
      },
    });
  }

  async getOne(id: string) {
    const data = await this.sectionRepository
      .findOne({
        where: { id },
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    return data;
  }

  async deleteOne(id: string) {
    const response = await this.sectionRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(value: UpdateSectionDto, id: string) {
    const response = await this.sectionRepository.update({ id }, value);
    return response;
  }

  async create(value: CreateSectionDto) {
    const data = await this.sectionRepository
    .createQueryBuilder()
    .insert()
    .into(Section)
    .values(value as unknown as Section)
    .returning('id')
    .execute()

    return await this.getOne(data.raw[0].id)
  }
}
