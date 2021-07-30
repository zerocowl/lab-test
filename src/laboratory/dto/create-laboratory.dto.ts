import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';
import { Laboratory } from '../entities/laboratory.entity';

export class CreateLaboratoryDto extends Laboratory {
  @ApiProperty({ example: 'lab 01' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ example: 'rua central' })
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty({ example: '190' })
  @IsNotEmpty()
  @IsString()
  number: string;

  @ApiProperty({ example: 'santos' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ example: 'sao paulo' })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({ example: '0101-010' })
  @IsNotEmpty()
  @IsString()
  cep: string;

  @ApiProperty({ example: 'ap 100' })
  @IsNotEmpty()
  @IsString()
  complement?: string;
}
