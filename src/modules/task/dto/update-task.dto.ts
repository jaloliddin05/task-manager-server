import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateTaskDto {
  @ApiProperty({
    description: `title`,
    example: 'classic',
  })
  @IsOptional()
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
export default UpdateTaskDto;
