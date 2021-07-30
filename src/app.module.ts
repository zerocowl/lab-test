import { Module } from '@nestjs/common';
import { LaboratoryModule } from './laboratory/laboratory.module';
import { ExamModule } from './exam/exam.module';

@Module({
  imports: [LaboratoryModule, ExamModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
