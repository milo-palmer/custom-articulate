'use client'

import { QueryClient, QueryClientProvider, UseQueryOptions } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'
import { CardType } from '@/lib/types'

export const AppQueryProvider = (props: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient())

  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
}

export const FetchCardsQuery = () =>
  ({
    queryKey: ['cards'],
    queryFn: async () => {
      const res = await fetch('/api/cards')
      const data = await res.json()

      return data.cards as CardType[]
    },
  }) satisfies UseQueryOptions
