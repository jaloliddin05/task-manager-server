import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class CreateProjectDto {
  @ApiProperty({
    description: `title`,
    example: 'bright-server',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: `description`,
    example: '...',
  })
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: `color`,
    example: 'red',
  })
  @IsOptional()
  @IsString()
  readonly color: string;
}

export default CreateProjectDto;
