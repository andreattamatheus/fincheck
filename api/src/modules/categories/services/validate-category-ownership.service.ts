import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from 'src/shared/database/repositories/categories.repository';

@Injectable()
export class ValidateCategoryOwnershipService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async validate(userId: string, categoryId: string) {
    const isOwner = await this.categoryRepo.findFirst({
      where: { id: categoryId, userId },
    });

    if (!isOwner) {
      throw new NotFoundException('Category not found');
    }
  }
}
