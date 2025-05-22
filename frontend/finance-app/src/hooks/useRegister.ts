import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/authClient";
import type { RegisterCredentials, User } from "@/services/auth/schemas";

export function useRegister() {
  return useMutation<User, Error, RegisterCredentials>({
    mutationFn: authService.register,
  });
}
