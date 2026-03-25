"use client";

import { Card } from "@/components/card";
import { FetchCardsQuery } from "@/lib/query";
import { useQuery } from "@tanstack/react-query";
import * as GameStore from "@/lib/game-store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ShowCardOnScroll } from "@/components/show-card-on-scroll";

export default function RecapPage() {
  const cards = useQuery(FetchCardsQuery());
  const currentId = GameStore.useCurrentCardId();
  const history = GameStore.useCurrentHistory();
  const router = useRouter();

  if (cards.isLoading) {
    return <></>;
  }

  if (!cards || !currentId) {
    return null;
  }

  const completedCards = cards.data?.filter((card) => history.includes(card.id));

  const handleNext = () => {
    GameStore.setNextCard(currentId, cards.data ?? []);
    GameStore.setNextTurn();
    router.push("/play");
  };

  return (
    <main className="my-20 mx-auto max-w-[600px] text-base px-5 md:px-10 ">
      <div className="flex justify-between gap-x-3 flex-wrap items-center">
        <h1 className="text-3xl font-pt font-extrabold mb-3">Round Recap</h1>
        <p className="text-lg font-pt font-extrabold mb-2">
          Cards: {completedCards && completedCards.length > 0 ? completedCards.length : 0}
        </p>
      </div>
      <div className="space-y-6">
        {completedCards && completedCards.length ? (
          completedCards.map((card, i) => (
            <ShowCardOnScroll key={i}>
              <Card card={card} />
            </ShowCardOnScroll>
          ))
        ) : (
          <p>No cards, harsh round I guess</p>
        )}
        <div className="text-right">
          <Button
            variant={"game"}
            className="rounded-full p-4 bg-green-500 text-white border-black/20 transition-all duration-100 active:scale-[1.1] active:bg-green-400"
            onClick={handleNext}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </main>
  );
}
