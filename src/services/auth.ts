import { AxiosError } from "axios";
import Api from "../shared/utils/Api";

type ApiError = {
  message: string;
};

export async function loginService(email: string, password: string) {
  try {
    const response = await Api.post<{ token: string }>("/api/auth", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const { response } = error as AxiosError<ApiError>;
    throw new Error(response?.data.message ?? "Erro desconhecido");
  }
}

type data = {
  name: string;
  password: string;
  email: string;
};

export async function createAccountService(data: data) {
  try {
    const response = await Api.post<unknown>("/api/user", data);
    return response.data;
  } catch (error) {
    const { response } = error as AxiosError<ApiError>;
    throw new Error(response?.data.message ?? "Erro desconhecido");
  }
}
