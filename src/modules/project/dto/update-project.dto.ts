import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateProjectDto {
  @ApiProperty({
    description: `title`,
    example: 'bright-server',
  })
  @IsOptional()
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: `descripton`,
    example: '...',
  })
  @IsOptional()
  @IsString()
  readonly descriotion: string;

  @ApiProperty({
    description: `color`,
    example: 'red',
  })
  @IsOptional()
  @IsString()
  readonly color: string;
}
export default UpdateProjectDto;
