import { Prisma } from '@prisma/client';

export class Laboratory implements Prisma.LaboratoryUncheckedCreateInput {
  id?: string;
  name: string;
  isActive?: boolean;
  street: string;
  number: string;
  city: string;
  state: string;
  cep: string;
  complement?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
