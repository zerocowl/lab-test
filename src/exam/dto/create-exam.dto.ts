import { ApiProperty } from '@nestjs/swagger';
import { EnumExamType } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Exam } from '../entities/exam.entity';
import { TypeEnum } from '../enum/type-enum';

export class CreateExamDto extends Exam {
  @ApiProperty({ example: 'exame 01' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'IMAGE', enum: TypeEnum })
  @IsNotEmpty()
  @IsString()
  @IsEnum(TypeEnum)
  type: EnumExamType;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
