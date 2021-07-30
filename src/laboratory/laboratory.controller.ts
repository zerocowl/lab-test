import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LaboratoryService } from './laboratory.service';
import { CreateLaboratoryDto } from './dto/create-laboratory.dto';
import { UpdateLaboratoryDto } from './dto/update-laboratory.dto';

@Controller({
  path: 'laboratories',
  version: '1',
})
export class LaboratoryController {
  constructor(private readonly laboratoryService: LaboratoryService) {}

  @Post()
  create(@Body() createLaboratoryDto: CreateLaboratoryDto) {
    return this.laboratoryService.create(createLaboratoryDto);
  }

  @Post('/batch')
  createMany(@Body() createLaboratoryDto: CreateLaboratoryDto[]) {
    return this.laboratoryService.createMany(createLaboratoryDto);
  }

  @Get()
  findAll() {
    return this.laboratoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.laboratoryService.findOne(id);
  }

  @Post(':id/addExam/:idExam')
  addExam(@Param('id') id: string, @Param('idExam') idExam: string) {
    return this.laboratoryService.addExam(id, idExam);
  }

  @Post(':id/removeExam/:idExam')
  removeExam(@Param('id') id: string, @Param('idExam') idExam: string) {
    return this.laboratoryService.removeExam(id, idExam);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLaboratoryDto: UpdateLaboratoryDto,
  ) {
    return this.laboratoryService.update(id, updateLaboratoryDto);
  }

  @Delete(':id')
  disable(@Param('id') id: string) {
    return this.laboratoryService.disable(id);
  }
  @Delete('/batch')
  disableAll() {
    return this.laboratoryService.disableAll();
  }
}
