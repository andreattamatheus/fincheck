import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authService } from "../../../app/services/authService";
import { useMutation } from "@tanstack/react-query";
import { SignupParams } from "../../../app/services/authService/signup";
import toast from "react-hot-toast";

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

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      toast.error("Error trying to register user", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "rgb(201 42 42)",
          color: "#fff",
        },
      });
      console.log(error);
    }
  });

  return { handleSubmit, register, errors, isLoading };
}
