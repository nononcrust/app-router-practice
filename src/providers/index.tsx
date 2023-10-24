"use client";

import { queryClientConfig } from "@/configs/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
