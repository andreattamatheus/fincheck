import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from 'src/shared/database/repositories/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  create(userId: string, createCategoryDto: CreateCategoryDto) {
    const { name, icon, type } = createCategoryDto;
    return this.categoryRepository.create({
      data: { userId, name, icon, type },
    });
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: string) {
    return `This action returns a #${id} category`;
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: string) {
    return `This action removes a #${id} category`;
  }
}
