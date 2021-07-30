import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Laboratory, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLaboratoryDto } from './dto/create-laboratory.dto';
import { UpdateLaboratoryDto } from './dto/update-laboratory.dto';

@Injectable()
export class LaboratoryService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateLaboratoryDto): Promise<Laboratory> {
    try {
      const data: Prisma.LaboratoryCreateInput = {
        ...dto,
      };
      return this.prisma.laboratory.create({
        data,
      });
    } catch (err: unknown) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createMany(list: CreateLaboratoryDto[]): Promise<Prisma.BatchPayload> {
    try {
      return await this.prisma.laboratory.createMany({
        data: list,
        skipDuplicates: true,
      });
    } catch (err: unknown) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findAll(): Promise<Laboratory[]> {
    try {
      return this.prisma.laboratory.findMany({
        where: { isActive: true },
        include: { exams: true },
      });
    } catch (err: unknown) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<Laboratory | null> {
    try {
      return this.prisma.laboratory.findUnique({
        where: { id },
      });
    } catch (err: unknown) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addExam(id: string, idExam: string): Promise<Laboratory | null> {
    try {
      const exam = await this.prisma.exam.findUnique({
        where: { id: idExam },
      });

      if (!exam.isActive) {
        throw new HttpException('Exame inativo', HttpStatus.BAD_REQUEST);
      }

      const data = {
        exams: { connect: { id: idExam } },
      };

      return this.prisma.laboratory.update({
        where: { id },
        data,
        include: {
          exams: true,
        },
      });
    } catch (err: unknown) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeExam(id: string, idExam: string): Promise<Laboratory | null> {
    try {
      const data = {
        exams: { disconnect: { id: idExam } },
      };

      return this.prisma.laboratory.update({
        where: { id },
        data,
        include: {
          exams: true,
        },
      });
    } catch (err: unknown) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async update(id: string, dto: UpdateLaboratoryDto): Promise<Laboratory> {
    try {
      const data: Prisma.ExamUpdateInput = {
        ...dto,
      };
      return this.prisma.laboratory.update({ where: { id }, data });
    } catch (err: unknown) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async disable(id: string): Promise<Laboratory> {
    try {
      return this.prisma.laboratory.update({
        where: { id },
        data: { isActive: false },
      });
    } catch (err: unknown) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async disableAll(): Promise<Prisma.BatchPayload> {
    try {
      return this.prisma.laboratory.updateMany({
        where: { isActive: true },
        data: { isActive: false },
      });
    } catch (err: unknown) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
