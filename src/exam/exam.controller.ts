import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller({
  path: 'exams',
  version: '1',
})
@ApiTags('Exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  create(@Body() createExamDto: CreateExamDto) {
    return this.examService.create(createExamDto);
  }

  @Post('/batch')
  createMany(@Body() createExamDto: CreateExamDto[]) {
    return this.examService.createMany(createExamDto);
  }

  @Get()
  findAll() {
    return this.examService.findAll();
  }

  @Get('/search')
  findByName(@Query('name') name: string) {
    return this.examService.findByName(name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto) {
    return this.examService.update(id, updateExamDto);
  }

  @Delete(':id')
  disable(@Param('id') id: string) {
    return this.examService.disable(id);
  }

  @Delete('/batch')
  disableAll() {
    return this.examService.disableAll();
  }
}
