import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/users.repository';
import { CategoryRepository } from './repositories/categories.repository';

@Global()
@Module({
  providers: [PrismaService, UserRepository, CategoryRepository],
  exports: [UserRepository, CategoryRepository],
})
export class DatabaseModule {}
