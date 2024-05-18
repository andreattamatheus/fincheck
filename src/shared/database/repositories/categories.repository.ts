import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createCategoryDto: Prisma.CategoryCreateArgs) {
    return this.prismaService.category.create(createCategoryDto);
  }

  findFirst(findFirstDto: Prisma.CategoryFindFirstArgs) {
    return this.prismaService.category.findFirst(findFirstDto);
  }

  findMany(findAllByUser: Prisma.CategoryFindManyArgs) {
    return this.prismaService.category.findMany(findAllByUser);
  }

  findUnique(findCategory: Prisma.CategoryFindUniqueArgs) {
    return this.prismaService.category.findUnique(findCategory);
  }
}
