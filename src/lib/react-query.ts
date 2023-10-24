import { queryClientConfig } from "@/configs/react-query";
import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

// https://tanstack.com/query/latest/docs/react/guides/advanced-ssr#alternative-use-a-single-queryclient-for-prefetching
export const getQueryClient = cache(() => new QueryClient(queryClientConfig));
