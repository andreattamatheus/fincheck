import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authService } from "../../../app/services/authService";

const validation = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().nonempty("Email is required.").email("Email not valid."),
  password: z
    .string()
    .nonempty("Password is required.")
    .min(8, "Passowrd must have at least 8 digits."),
});

type FormData = z.infer<typeof validation>;

export function useRegisterController() {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validation),
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    const { accessToken } = await authService.signup(data);

    console.log(accessToken);
  });

  return { handleSubmit, register, errors };
}
