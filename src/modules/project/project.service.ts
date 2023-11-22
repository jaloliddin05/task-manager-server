import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateProjectDto, CreateProjectDto } from './dto';
import { Project } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async getAll() {
    return await this.projectRepository.find({
      order: {
        title: 'ASC',
      },
    });
  }

  async getOne(id: string) {
    const data = await this.projectRepository
      .findOne({
        where: { id },
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    return data;
  }

  async deleteOne(id: string) {
    const response = await this.projectRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(value: UpdateProjectDto, id: string) {
    const response = await this.projectRepository.update({ id }, value);
    return response;
  }

  async create(value: CreateProjectDto) {
    const data = this.projectRepository.create(value);
    return await this.projectRepository.save(data);
  }
}
