import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Delete,
  Patch,
  Param,
  Get,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { CreateTaskDto, UpdateTaskDto } from './dto';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('')
  @ApiOperation({ summary: 'Method: returns all tasks' })
  @ApiOkResponse({
    description: 'The tasks was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<Task[]> {
    return this.taskService.getAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns single task by id' })
  @ApiOkResponse({
    description: 'The task was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMe(@Param('id') id: string): Promise<Task> {
    return this.taskService.getOne(id);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new task' })
  @ApiCreatedResponse({
    description: 'The task was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreateTaskDto): Promise<Task> {
    return await this.taskService.create(data);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Method: updating task' })
  @ApiOkResponse({
    description: 'Task was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() data: UpdateTaskDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    return await this.taskService.change(data, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting task' })
  @ApiOkResponse({
    description: 'Task was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.taskService.deleteOne(id);
  }
}
