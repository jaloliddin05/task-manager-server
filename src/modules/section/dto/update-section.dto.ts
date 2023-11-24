import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateSectionDto {
  @ApiProperty({
    description: `title`,
    example: 'classic',
  })
  @IsOptional()
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: `index`,
    example:1,
  })
  @IsOptional()
  @IsNumber()
  readonly index: number;
}
export default UpdateSectionDto;
