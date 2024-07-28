import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { cn } from "../../../../../app/utils/cn";

export function Transactions() {
  return (
    <div className="bg-teal-100 rounded-2xl w-full h-full px-4 py-8 md:p-10">
      <header className="">
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
        <div className="mt-6">
          <Swiper
            slidesPerView={3}
            centeredSlides
            onSlideChange={() => console.log("slide change")}
          >
            {MONTHS.map((month) => (
              <SwiperSlide key={month}>
                {({ isActive }) => (
                  <button
                    className={cn(
                      "w-full rounded-full h-12 text-sm text-gray-800 tracking-[-0.5px] font-medium",
                      isActive && "bg-white"
                    )}
                  >
                    {month}
                  </button>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </header>
      <div className="mt-4">Content</div>
    </div>
  );
}
