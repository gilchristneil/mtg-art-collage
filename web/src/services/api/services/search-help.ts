
import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { SearchHelp } from "../types/search-help";
import { SortEnum } from "../types/sort-type";
import { RequestConfigType } from "./types/request-config";

export type SearchhelpsRequest = {
  page: number;
  limit: number;
  sort?: Array<{
    orderBy: keyof SearchHelp;
    order: SortEnum;
  }>;
};

export type SearchHelpResponse = SearchHelp;

export function useGetSearchHelpService() {
  const fetch = useFetch();

  return useCallback(
    (data: SearchhelpsRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/search_help`);
      return fetch(requestUrl, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<SearchHelpResponse>);
    },
    [fetch]
  );
}