import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { SLiderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "../../../../../app/utils/formatCurrecy";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { useTransactionController } from "./useTransactionController";
import { cn } from "../../../../../app/utils/cn";
import { Spinner } from "../../../../components/Spinner";
import emptyStateImage from "../../../../../assets/empty.svg";

export function Transactions() {
  const { areValuesVisible, isInitialLoading, isLoading, transactions } =
    useTransactionController();

  const hasTransactions = transactions.length > 0;

  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      {isInitialLoading && (
        <div className="flex items-center justify-center w-full h-full">
          <Spinner className="w-10 h-10" />
        </div>
      )}
      {!isInitialLoading && (
        <>
          <header>
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2">
                <TransactionsIcon />
                <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
                  Transactions
                </span>
                <ChevronDownIcon className="w-4 h-4 text-gray-800" />
              </button>

              <button>
                <FilterIcon />
              </button>
            </div>
            <div className="mt-6 relative">
              <Swiper slidesPerView={3} centeredSlides>
                <SliderNavigation />
                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SLiderOption
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full mt-4">
              <Spinner className="w-10 h-10" />
            </div>
          )}
          {!hasTransactions && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full mt-4">
              <img src={emptyStateImage} alt="Empty transcations" />
              <span className="text-gray-600 font-medium">
                No transactions found
              </span>
            </div>
          )}
          {hasTransactions && !isLoading && (
            <div className="px-2 mt-4 space-y-2 flex-1 overflow-y-auto">
              <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                <div className="flex-1 flex items-center gap-3">
                  <CategoryIcon type="income" />
                  <div className="flex flex-col">
                    <span className="font-bold tracking-[-0.5px]">
                      Total Income
                    </span>
                    <span className="text-sm text-gray-600">04/06/2024</span>
                  </div>
                </div>
                <span
                  className={cn(
                    "font-medium text-green-800 tracking-[-0.5px]",
                    !areValuesVisible && "blur-sm"
                  )}
                >
                  {formatCurrency(123)}
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
