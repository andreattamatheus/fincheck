import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { SliderNavigation } from "./SliderNavigation";
import { useAccountsController } from "./useAccountsController";
import { formatCurrency } from "../../../../../app/utils/formatCurrecy";
import { cn } from "../../../../../app/utils/cn";
import { Spinner } from "../../../../components/Spinner";
import { PlusIcon } from "@radix-ui/react-icons";

export function Accounts() {
  const {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading,
    accounts,
    openNewAccountModal,
  } = useAccountsController();
  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      {isLoading && (
        <div className="flex items-center justify-center w-full h-full">
          <Spinner className="w-10 h-10 text-teal-950/50 fill-white" />
        </div>
      )}
      {!isLoading && (
        <>
          <div>
            <span className="tracking-[-0.5px] text-white">Total balance</span>
            <div className="flex items-center gap-2">
              <strong
                className={cn(
                  "text-2xl tracking-[-1px] text-white",
                  !areValuesVisible && "blur-md"
                )}
              >
                {formatCurrency(1803.03)}
              </strong>
              <button
                className="flex items-center justify-center w-8 h-8"
                onClick={toggleValuesVisibility}
              >
                <EyeIcon open={!areValuesVisible} />
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
            <div>
              {accounts.length === 0 && (
                <>
                  <div slot="container-start" className="mb-4">
                    <strong className="text-white tracking-[-1px] text-lg">
                      My accounts
                    </strong>
                  </div>
                  <button
                    onClick={openNewAccountModal}
                    className="mt-4 h-52 rounded-2xl border-2 w-full border-dashed border-teal-600 text-white flex flex-col items-center justify-center gap-4"
                  >
                    <div className="h-11 w-11 rounded-full border-2 border-dashed border-white flex items-center justify-center">
                      <PlusIcon className="h-6 w-6" />
                    </div>
                    <span className="tracking-[-0.5px] font-medium block w-32 text-center">
                      Register a new account
                    </span>
                  </button>
                </>
              )}
              {accounts.length > 0 && (
                <Swiper
                  spaceBetween={16}
                  slidesPerView={windowWidth >= 500 ? 2.1 : 1.1}
                  onSlideChange={(swiper) => {
                    setSliderState({
                      isBeginning: swiper.isBeginning,
                      isEnd: swiper.isEnd,
                    });
                  }}
                >
                  <div
                    slot="container-start"
                    className="flex justify-between items-center mb-4"
                  >
                    <strong className="text-white tracking-[-1px] text-lg">
                      My accounts
                    </strong>
                    <SliderNavigation
                      isBeginning={sliderState.isBeginning}
                      isEnd={sliderState.isEnd}
                    />
                  </div>
                  {accounts.map((account) => (
                    <SwiperSlide key={account.id}>
                      <AccountCard
                        name={account.name}
                        balance={account.currentBalance}
                        type={account.type}
                        color={account.color}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
