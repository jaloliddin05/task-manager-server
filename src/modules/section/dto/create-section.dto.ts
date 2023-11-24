import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class CreateSectionDto {
  @ApiProperty({
    description: `title`,
    example: 'to do',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: `index`,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly index: number;

  @ApiProperty({
    description: `project`,
    example: 'uuid',
  })
  @IsNotEmpty()
  @IsString()
  readonly project: string;
}

export default CreateSectionDto;
