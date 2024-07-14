import { useEffect, useState } from "react";
import Api from "../utils/Api";
import { AxiosError } from "axios";
import { useAuthContext } from "./useAuthContext";

type hasId = {
  id: string;
};

type props<T, R> = {
  route: string;
  dependences?: unknown[];
  getResponse: (data: R) => T[];
};

export function useFetchList<T extends hasId, R>({
  route,
  dependences = [],
  getResponse,
}: props<T, R>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { token } = useAuthContext();

  useEffect(() => {
    fethApi();
  }, dependences);

  async function fethApi() {
    setLoading(() => true);
    try {
      const response = await Api.get<R>(route, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setData(getResponse(response.data));
    } catch (error) {
      const { response } = error as AxiosError<string>;
      if (typeof response?.data === "string") setError(response.data);
      else console.log(response?.data); //only for debug;
    }
    setLoading(() => false);
  }

  function addItemToList(...item: T[]) {
    setData((c) => [...item, ...c]);
  }

  function updateListItem(item: T) {
    const clonedData = [...data];
    const itemIndex = clonedData.findIndex((e) => e.id === item.id);
    if (itemIndex != -1) {
      clonedData[itemIndex] = item;
      setData(clonedData);
    }
  }

  function deleteFromList(id: string) {
    const newList = data.filter((e) => e.id !== id);
    setData(newList);
  }

  function clearList() {
    setData(() => []);
  }

  return {
    data,
    loading,
    error,
    addItemToList,
    deleteFromList,
    clearList,
    updateListItem,
  };
}
