import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authService } from "../../../app/services/authService";

const validation = z.object({
  email: z.string().nonempty("Email is required.").email("Email not valid."),
  password: z
    .string()
    .nonempty("Password is required.")
    .min(8, "Passowrd must have at least 8 digits."),
});

type FormData = z.infer<typeof validation>;

export function useLoginController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validation),
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    const responseData = await authService.login(data);
  });

  return { handleSubmit, register, errors };
}
