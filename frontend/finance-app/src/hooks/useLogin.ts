import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService, type LoginResult } from "@/services/auth/authClient";
import type { LoginCredentials } from "@/services/auth/schemas";

export function useLogin() {
  const qc = useQueryClient();
  return useMutation<LoginResult, Error, LoginCredentials>({
    mutationFn: authService.login,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}
