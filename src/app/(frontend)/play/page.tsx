"use client";

import { CardRow } from "@/components/card-row";
import { Button } from "@/components/ui/button";
import { FetchCardsQuery } from "@/lib/query";
import { useQuery } from "@tanstack/react-query";
import * as GameStore from "@/lib/game-store";
import { ChevronRight, Hourglass, RedoDot, UndoDot } from "lucide-react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Card } from "@/payload-types";

export default function PlayPage() {
  const cards = useQuery(FetchCardsQuery());
  const id = GameStore.useCurrentCardId();
  const skippedId = GameStore.useCurrentSkippedCards();
  const previousId = GameStore.usePreviousId();
  const { randomAllPlay } = GameStore.useCurrentSettings();
  const randomInt = Math.ceil(Math.random() * 6);

  const formatCards = useMemo(() => {
    const result: { [key: number]: Card } = {};
    cards.data?.forEach((c) => (result[c.id] = c));
    return result;
  }, [cards.data]);

  useEffect(() => {
    if (!id && cards.data) {
      const randomIndx = Math.floor(Math.random() * cards.data.length);
      const newId = cards.data[randomIndx].id;
      GameStore.setCurrentId(newId);
    }
  }, [cards.data, id]);

  if (cards.isLoading || !id) {
    return <></>;
  }

  const card = formatCards[Number(id)];

  if (card == null) {
    return <>Not Found</>;
  }

  return (
    <main className="mx-auto max-w-[600px] text-base px-5 md:px-10 min-h-screen flex flex-col justify-between gap-y-4">
      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={card.id}
            className="bg-white p-5 rounded-xl space-y-2 shadow-xl"
            initial={{
              translateY: 30,
              translateX: -30,
              rotateX: 90,
              rotate: 15,
              scale: 1.1,
            }}
            animate={{
              translateY: 0,
              translateX: 0,
              rotateX: 0,
              scale: 1,
              opacity: 1,
              rotate: 0,
            }}
            exit={{
              translateY: -10,
              translateX: -10,
              scale: 0.8,
              rotateX: 90,
              opacity: 0,
            }}
          >
            <CardRow
              color="bg-person"
              allPlay={randomAllPlay ? randomInt === 1 : card.allplay === "person"}
              keyText="P"
            >
              {card.person}
            </CardRow>
            <CardRow
              color="bg-world"
              allPlay={randomAllPlay ? randomInt === 2 : card.allplay === "world"}
              keyText="W"
            >
              {card.world}
            </CardRow>
            <CardRow
              color="bg-object"
              allPlay={randomAllPlay ? randomInt === 3 : card.allplay === "object"}
              keyText="O"
            >
              {card.object}
            </CardRow>
            <CardRow
              color="bg-action"
              allPlay={randomAllPlay ? randomInt === 4 : card.allplay === "action"}
              keyText="A"
            >
              {card.action}
            </CardRow>
            <CardRow
              color="bg-nature"
              allPlay={randomAllPlay ? randomInt === 5 : card.allplay === "nature"}
              keyText="N"
            >
              {card.nature}
            </CardRow>
            <CardRow
              color="bg-random"
              allPlay={randomAllPlay ? randomInt === 6 : card.allplay === "random"}
              keyText="R"
            >
              {card.random}
            </CardRow>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={"flex w-full justify-between items-center py-4 px-6 sticky bottom-0"}>
        <Button
          variant={"game"}
          className={cn(
            "rounded-full p-4 bg-person text-white border-black/20 transition-all duration-100 active:scale-[1.1] active:bg-yellow-500 ",
            {
              "pointer-events-none opacity-0": skippedId === "Done",
            },
          )}
          onClick={() => {
            if (!skippedId) {
              GameStore.setSkippedCard(card.id);
              GameStore.setNextCard(card.id, cards.data ?? [], true);
            } else if (typeof skippedId === "number" && skippedId !== card.id) {
              GameStore.setPreviousId(card.id);
              GameStore.setCurrentId(skippedId);
            } else if (typeof skippedId === "number" && previousId && skippedId === card.id) {
              GameStore.setCurrentId(previousId);
            }
          }}
        >
          {skippedId ? skippedId === card.id ? <RedoDot /> : <UndoDot /> : <RedoDot />}
        </Button>
        <Button
          variant={"game"}
          className="rounded-full p-4 bg-red-500 text-white border-black/20 transition-all duration-100 active:scale-[1.1] active:bg-red-400"
          asChild
        >
          <Link href="/recap">
            <Hourglass />
          </Link>
        </Button>
        <Button
          variant={"game"}
          className="rounded-full p-4 bg-green-500 text-white border-black/20 transition-all duration-100 active:scale-[1.1] active:bg-green-400"
          onClick={() => {
            if (skippedId === card.id && previousId) {
              GameStore.setCurrentId(previousId);
              GameStore.addTurnHistory(card.id);
              GameStore.setSkippedCard("Done");
            } else {
              GameStore.setNextCard(card.id, cards.data ?? []);
            }
          }}
        >
          <ChevronRight />
        </Button>
      </div>
    </main>
  );
}
