import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/authClient";
import type { RegisterCredentials, User } from "@/schemas/auth";

export function useRegister() {
  return useMutation<User, Error, RegisterCredentials>({
    mutationFn: authService.register,
  });
}
