import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authService } from "../../../app/services/authService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { SigninParams } from "../../../app/services/authService/signin";
import { useAuth } from "../../../app/hooks/useAuth";

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

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SigninParams) => {
      return authService.signin(data);
    },
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);
      signin(accessToken);
    } catch (error) {
      toast.error("Error trying to login user", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "rgb(201 42 42)",
          color: "#fff",
        },
      });
    }
  });

  return { handleSubmit, register, errors, isLoading };
}
