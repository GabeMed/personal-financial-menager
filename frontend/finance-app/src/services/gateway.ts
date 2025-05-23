import { apiClient } from "@/services/apiClient";
import type {
  LoginCredentials,
  RegisterCredentials,
  User,
} from "@/schemas/auth";

interface ApiTokenResponse {
  access_token: string;
  token_type: string;
}

export async function loginGateway(
  credentials: LoginCredentials
): Promise<ApiTokenResponse> {
  const form = new URLSearchParams();
  form.append("username", credentials.username);
  form.append("password", credentials.password);

  const { data } = await apiClient.post<ApiTokenResponse>("/auth/token", form, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return data;
}

export async function registerGateway(
  payload: RegisterCredentials
): Promise<User> {
  const { data } = await apiClient.post<User>("/users/register", payload);
  return data;
}

export async function meGateway(): Promise<User> {
  const { data } = await apiClient.get<User>("/users/me");
  return data;
}
