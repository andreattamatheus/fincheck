import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useLoginController } from "./useLoginController";

export function Login() {
  const { register, handleSubmit, errors, isLoading } = useLoginController();

  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          Access your account
        </h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px] dark:text-gray-500">
            New here?
          </span>
          <Link
            to="/register"
            className="tracking-[-1px] text-teal-900 font-medium"
          >
            Create account
          </Link>
        </p>
      </header>

      <form className="mt-[60px] flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          type="password"
          placeholder="Password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Button type="submit" className="mt-2" isLoading={isLoading}>
          Enter
        </Button>
      </form>
    </>
  );
}
