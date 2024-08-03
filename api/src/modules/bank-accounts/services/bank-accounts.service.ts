import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { BankAccountRepository } from 'src/shared/database/repositories/bank-account.repository';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountRepo: BankAccountRepository,
    private readonly bankAccountOwnership: ValidateBankAccountOwnershipService,
  ) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { name, initialBalance, type, color } = createBankAccountDto;
    return this.bankAccountRepo.create({
      data: { userId, name, initialBalance, type, color },
    });
  }

  async findAllByUser(userId: string) {
    const bankAccounts = await this.bankAccountRepo.findAllByUser({
      where: { userId },
      include: {
        transactions: {
          select: {
            type: true,
            value: true,
          },
        },
      },
    });

    return bankAccounts.map(({ transactions, ...bankAccount }) => {
      const totalTransactions = transactions.reduce(
        (acc, transaction) =>
          acc +
          (transaction.type === 'INCOME'
            ? transaction.value
            : -transaction.value),
        0,
      );

      const currentBalance = bankAccount.initialBalance + totalTransactions;

      return {
        ...bankAccount,
        currentBalance,
      };
    });
  }

  findFirst(userId: string, bankAccountId: string) {
    return this.bankAccountRepo.findFirst({
      where: { userId, id: bankAccountId },
    });
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.bankAccountOwnership.validate(userId, bankAccountId);

    const { name, initialBalance, type, color } = updateBankAccountDto;
    return this.bankAccountRepo.update({
      where: { id: bankAccountId },
      data: { initialBalance, userId, name, type, color },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.bankAccountOwnership.validate(userId, bankAccountId);

    await this.bankAccountRepo.delete({
      where: { id: bankAccountId },
    });

    return 'Deleted';
  }
}
