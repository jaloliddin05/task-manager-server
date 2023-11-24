import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class CreateTaskDto {
  @ApiProperty({
    description: `title`,
    example: 'classic',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: `description`,
    example: '.....',
  })
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: `dueDate`,
    example: 'time',
  })
  @IsOptional()
  @IsString()
  readonly dueDate: string;

  @ApiProperty({
    description: `section`,
    example: 'uuid',
  })
  @IsOptional()
  @IsString()
  readonly section: string;

  @ApiProperty({
    description: `assignee`,
    example: 'uuid',
  })
  @IsOptional()
  @IsString()
  readonly assignee: string;
}

export default CreateTaskDto;
