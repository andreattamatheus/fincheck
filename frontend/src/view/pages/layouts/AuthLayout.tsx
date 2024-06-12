import { Outlet } from 'react-router-dom';
import illustration from '../../../assets/illustration.png';
import { Logo } from '../../components/Logo';

export function AuthLayout() {
  return (
    <div className="flex w-full h-full">
      <section className="w-full h-full flex flex-col gap-10 items-center justify-center lg:w-1/2">
        <Logo className="h-6 text-gray-500 dark:text-teal-800" />
        <div className="w-full max-w-[504px] px-8">
          <Outlet />
        </div>
      </section>

      <section className="w-1/2 h-full hidden justify-center items-center p-8 relative lg:flex">
        <img
          src={illustration}
          alt="Ilustração de despesas e receitas"
          className=" object-cover w-full h-full max-w-[656px] max-h-[960px] select-none rounded-[32px]"
        />

        <div className="max-w-[656px] bottom-8 mx-8 bg-white p-10 absolute rounded-b-[32px]">
          <Logo className="text-teal-900 h-8" />
          <p className="text-gray-700 font-medium text-xl mt-6">
            Manage your personal finances easily with fincheck, and best of all,
            it's completely free!
          </p>
        </div>
      </section>
    </div>
  );
}
