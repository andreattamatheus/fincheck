import { EyeIcon } from "../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { AccountsSliderNavigation } from "./AccountsSliderNavigation";

export function Accounts() {
  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      <div>
        <span className="tracking-[-0.5px] text-white">Saldo total</span>
        <div className="flex items-center gap-2">
          <strong className="text-2xl tracking-[-1px] text-white">
            R$ 100,00
          </strong>
          <button className="flex items-center justify-center w-8 h-8">
            <EyeIcon open />
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-end">
        <div>
          <Swiper spaceBetween={16} slidesPerView={2.2}>
            <div
              slot="container-start"
              className="flex justify-between items-center mb-4"
            >
              <strong className="text-white tracking-[-1px] text-lg">
                Minhas contas
              </strong>
              <AccountsSliderNavigation />
            </div>
            <SwiperSlide>
              <AccountCard
                color="#7950F2"
                name="Nubank"
                balance={1000.02}
                type="CASH"
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                color="#ff9641"
                name="Itaú"
                balance={50.01}
                type="CHECKING"
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                color="#282425"
                name="XP Investimentos"
                balance={753.0}
                type="INVESTMENT"
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                color="#282425"
                name="XP Investimentos"
                balance={753.0}
                type="INVESTMENT"
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                color="#282425"
                name="XP Investimentos"
                balance={753.0}
                type="INVESTMENT"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
