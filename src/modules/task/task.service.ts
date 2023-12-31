import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateTaskDto, CreateTaskDto } from './dto';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getAll() {
    return await this.taskRepository.find({
      order: {
        title: 'ASC',
      },
    });
  }

  async getOne(id: string) {
    const data = await this.taskRepository
      .findOne({
        where: { id },
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    return data;
  }

  async deleteOne(id: string) {
    const response = await this.taskRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(value: UpdateTaskDto, id: string) {
    const response = await this.taskRepository
      .createQueryBuilder()
      .update()
      .set(value as unknown as Task)
      .where('id = :id', { id })
      .execute();

    return response;
  }

  async create(value: CreateTaskDto,creator:string) {
    const data = await this.taskRepository
      .createQueryBuilder()
      .insert()
      .into(Task)
      .values({...value,creator} as unknown as Task)
      .returning('id')
      .execute();

    return await this.getOne(data.raw[0].id);
  }
}
