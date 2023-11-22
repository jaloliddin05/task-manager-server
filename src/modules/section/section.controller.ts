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

import { CreateSectionDto, UpdateSectionDto } from './dto';
import { Section } from './section.entity';
import { SectionService } from './section.service';

@ApiTags('Section')
@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Get('')
  @ApiOperation({ summary: 'Method: returns all sections' })
  @ApiOkResponse({
    description: 'The sections was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<Section[]> {
    return this.sectionService.getAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns single section by id' })
  @ApiOkResponse({
    description: 'The section was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMe(@Param('id') id: string): Promise<Section> {
    return this.sectionService.getOne(id);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new section' })
  @ApiCreatedResponse({
    description: 'The section was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreateSectionDto): Promise<Section> {
    return await this.sectionService.create(data);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Method: updating section' })
  @ApiOkResponse({
    description: 'Section was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() data: UpdateSectionDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    return await this.sectionService.change(data, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting section' })
  @ApiOkResponse({
    description: 'Section was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.sectionService.deleteOne(id);
  }
}
