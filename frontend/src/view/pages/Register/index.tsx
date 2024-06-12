import { Link } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useRegisterController } from './useRegisterController';

export function Register() {
  const { register, handleSubmit, errors } = useRegisterController();

  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl text-gray-900 font-bold tracking-[-1px]">
          Register
        </h1>
        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px] dark:text-gray-500">
            Already have an account?
          </span>
          <Link
            to="/login"
            className="text-teal-900 font-medium tracking-[-0.5px]"
          >
            Login
          </Link>
        </p>
      </header>

      <form className="mt-[60px] flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Name"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          type="email"
          placeholder="Email"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          type="password"
          placeholder="Password"
          error={errors.password?.message}
          {...register('password')}
        />

        <Button type="submit" className="mt-2">
          Register
        </Button>
      </form>
    </>
  );
}
