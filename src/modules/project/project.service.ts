import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateProjectDto, CreateProjectDto } from './dto';
import { Project } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly userService: UserService,
  ) {}

  async getAll() {
    return await this.projectRepository.find({
      order: {
        title: 'ASC',
      },
    });
  }

  async getMyProjects(id: string) {
    return await this.projectRepository.find({
      where: {
        members: { id },
      },
    });
  }

  async getOne(id: string) {
    const data = await this.projectRepository
      .findOne({
        where: { id },
        relations: {
          owner: true,
          sections: {
            tasks: true,
          },
          members: true,
        },
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    data.sections.sort((a,b)=> a.index - b.index)

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

  async create(value: CreateProjectDto, owner: string) {
    const user = await this.userService.getById(owner);
    const data = this.projectRepository.create({
      ...value,
      owner: user,
      members: [user],
    });
    return await this.projectRepository.save(data)
  }
}
