import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.create(userId, createCategoryDto);
  }

  @Get()
  findAllByUser(@ActiveUserId() userId: string) {
    return this.categoriesService.findAllByUser(userId);
  }

  @Get(':categoryId')
  findOne(
    @ActiveUserId() userId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.categoriesService.findOne(categoryId);
  }

  @Put(':categoryId')
  update(
    @ActiveUserId() userId: string,
    @Param('categoryId') categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(categoryId, updateCategoryDto);
  }

  @Delete(':categoryId')
  remove(
    @ActiveUserId() userId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.categoriesService.remove(categoryId);
  }
}
