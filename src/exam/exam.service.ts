import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Exam, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Injectable()
export class ExamService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateExamDto): Promise<Exam> {
    try {
      const data: Prisma.ExamCreateInput = {
        ...dto,
      };
      return this.prisma.exam.create({
        data,
      });
    } catch (err: unknown) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createMany(list: CreateExamDto[]): Promise<Prisma.BatchPayload> {
    try {
      return await this.prisma.exam.createMany({
        data: list,
        skipDuplicates: true,
      });
    } catch (err: unknown) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Exam[]> {
    try {
      return this.prisma.exam.findMany({
        where: { isActive: true },
        include: { laboratories: true },
      });
    } catch (err: unknown) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<Exam | null> {
    try {
      return this.prisma.exam.findUnique({
        where: { id },
        include: { laboratories: false },
      });
    } catch (err: unknown) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByName(name: string): Promise<Exam | null> {
    try {
      return this.prisma.exam.findFirst({
        where: { name },
        include: { laboratories: true },
      });
    } catch (err: unknown) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, dto: UpdateExamDto): Promise<Exam> {
    try {
      const data: Prisma.ExamUpdateInput = {
        ...dto,
      };
      return this.prisma.exam.update({ where: { id }, data });
    } catch (err: unknown) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async disable(id: string): Promise<Exam> {
    try {
      return this.prisma.exam.update({
        where: { id },
        data: { isActive: false },
      });
    } catch (err: unknown) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async disableAll(): Promise<Prisma.BatchPayload> {
    try {
      return this.prisma.exam.updateMany({
        where: { isActive: true },
        data: { isActive: false },
      });
    } catch (err: unknown) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
