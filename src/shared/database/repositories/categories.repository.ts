import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createCategoryDto: Prisma.CategoryCreateArgs) {
    return this.prismaService.category.create(createCategoryDto);
  }

  findUnique(findCategory: Prisma.CategoryFindUniqueArgs) {
    return this.prismaService.category.findUnique(findCategory);
  }
}
