import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { Card } from "../types/card";
import { InfinityPaginationType } from "../types/infinity-pagination";
import { SortEnum } from "../types/sort-type";
import { RequestConfigType } from "./types/request-config";

export type CardsRequest = {
  page: number;
  limit: number;
  sort?: Array<{
    orderBy: keyof Card;
    order: SortEnum;
  }>;
};

export type CardsResponse = InfinityPaginationType<Card>;

export function useGetCardsService() {
  const fetch = useFetch();

  return useCallback(
    (data: CardsRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/cards`);
      requestUrl.searchParams.append("page", data.page.toString());
      requestUrl.searchParams.append("limit", data.limit.toString());
      if (data.sort) {
        requestUrl.searchParams.append("sort_by", JSON.stringify(data.sort));
      }

      return fetch(requestUrl, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<CardsResponse>);
    },
    [fetch]
  );
}

export type CardRequest = {
  id: Card["id"];
};

export type CardResponse = Card;

export function useGetCardService() {
  const fetch = useFetch();

  return useCallback(
    (data: CardRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/card/${data.id}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<CardResponse>);
    },
    [fetch]
  );
}
