"use client";

import { QueryClient, QueryClientProvider, UseQueryOptions } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { CardType } from "@/lib/types";
import { Card } from "@/payload-types";

export const AppQueryProvider = (props: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
};

export const FetchCardsQuery = () =>
  ({
    queryKey: ["cards"],
    queryFn: async () => {
      const res = await fetch("/api/cards?pagination=false");
      const data = await res.json();

      if (!data.docs && data.totalDocs === 0) {
        return [];
      }

      return data.docs as Card[];
    },
  }) satisfies UseQueryOptions;
