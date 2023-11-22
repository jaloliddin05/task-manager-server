import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class CreateProjectDto {
  @ApiProperty({
    description: `title`,
    example: 'classic',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;
}

export default CreateProjectDto;
