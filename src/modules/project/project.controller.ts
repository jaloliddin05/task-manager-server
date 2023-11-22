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

import { CreateProjectDto, UpdateProjectDto } from './dto';
import { Project } from './project.entity';
import { ProjectService } from './project.service';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('')
  @ApiOperation({ summary: 'Method: returns all projects' })
  @ApiOkResponse({
    description: 'The projects was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<Project[]> {
    return this.projectService.getAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns single project by id' })
  @ApiOkResponse({
    description: 'The project was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMe(@Param('id') id: string): Promise<Project> {
    return this.projectService.getOne(id);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new project' })
  @ApiCreatedResponse({
    description: 'The project was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreateProjectDto): Promise<Project> {
    return await this.projectService.create(data);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Method: updating project' })
  @ApiOkResponse({
    description: 'Project was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() data: UpdateProjectDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    return await this.projectService.change(data, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting project' })
  @ApiOkResponse({
    description: 'Project was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.projectService.deleteOne(id);
  }
}
