import { AxiosError } from "axios";
import { TOKEN_KEY } from "../shared/constants";
import Api from "../shared/utils/Api";
import { IProduct } from "../@types/model";

function makeHeaders() {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    authorization: `Bearer ${token}`,
  };
}

export async function createTestProductsService() {
  try {
    const response = await Api.post<IProduct[]>(
      "/api/product/random",
      {},
      { headers: makeHeaders() }
    );
    return response.data;
  } catch (error) {
    const { response } = error as AxiosError<{ messsage: string }>;
    throw new Error(response?.data.messsage);
  }
}

export async function deleteAllProducts() {
  try {
    const response = await Api.delete<IProduct[]>("/api/product/all", {
      headers: makeHeaders(),
    });
    return response.data;
  } catch (error) {
    const { response } = error as AxiosError<{ messsage: string }>;
    throw new Error(response?.data.messsage);
  }
}

export async function createProductService(data: Omit<IProduct, "id">) {
  try {
    const response = await Api.post<IProduct>("/api/product", data, {
      headers: makeHeaders(),
    });
    return response.data;
  } catch (error) {
    const { response } = error as AxiosError<{ message: string }>;
    console.log(response);
    throw new Error(response?.data.message);
  }
}

export async function deleteProductService(id: string) {
  try {
    const response = await Api.delete<{ message: string }>(
      `/api/product/${id}`,
      {
        headers: makeHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    const { response } = error as AxiosError<{ message: string }>;
    console.log(response);
    throw new Error(response?.data.message);
  }
}

export async function editProduct(data: IProduct) {
  try {
    const response = await Api.put<IProduct>(`/api/product/${data.id}`, data, {
      headers: makeHeaders(),
    });
    return response.data;
  } catch (error) {
    const { response } = error as AxiosError<{ message: string }>;
    console.log(response);
    throw new Error(response?.data.message);
  }
}
