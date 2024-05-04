import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/users.repository';
import { CategoryRepository } from './repositories/categories.repository';
import { BankAccountRepository } from './repositories/bank-account.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    UserRepository,
    CategoryRepository,
    BankAccountRepository,
  ],
  exports: [UserRepository, CategoryRepository, BankAccountRepository],
})
export class DatabaseModule {}
