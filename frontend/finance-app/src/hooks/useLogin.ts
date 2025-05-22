import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService, type LoginResult } from "@/services/authClient";
import type { LoginCredentials } from "@/schemas/auth";
import { useAuth } from "@/context/AuthContext";

const useLogin = () => {
  const { login: loginContext } = useAuth();
  const qc = useQueryClient();

  return useMutation<LoginResult, Error, LoginCredentials>({
    mutationFn: authService.login,
    onSuccess: ({ token, user }) => {
      loginContext(user, token);
      qc.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};

export default useLogin;
