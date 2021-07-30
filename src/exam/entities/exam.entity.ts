import { EnumExamType, Prisma } from '@prisma/client';

export class Exam implements Prisma.ExamUncheckedCreateInput {
  id?: string;
  name: string;
  type: EnumExamType;
  isActive?: boolean;
  created_at?: string | Date;
  updated_at?: string | Date;
}
