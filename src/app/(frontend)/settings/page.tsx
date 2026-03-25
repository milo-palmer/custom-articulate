"use client";

import { SpadeIcon } from "@/components/icon";
import * as GameStore from "@/lib/game-store";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Settings() {
  const { randomAllPlay } = GameStore.useCurrentSettings();
  const [settings, setSettings] = useState<GameStore.GameState["settings"]>({
    randomAllPlay,
  });

  useEffect(() => {
    setSettings({ randomAllPlay });
  }, [randomAllPlay]);

  const handleApply = () => {
    console.log(settings);
    console.log(randomAllPlay);
    GameStore.setCurrentSettings(settings);
  };

  return (
    <main className="my-20 mx-auto max-w-[600px] text-base px-5 md:px-10 ">
      <h1 className="text-3xl font-pt font-extrabold mb-3">Settings</h1>
      <div>
        <div className="flex gap-2">
          <p className="w-full">Randomise All Play</p>
          <div
            className={
              "aspect-square min-w-6 min-h-6 max-w-6 max-h-6 flex items-center justify-center text-center border border-black"
            }
            onClick={() =>
              setSettings((s) => {
                return {
                  ...s,
                  randomAllPlay: !s.randomAllPlay,
                };
              })
            }
          >
            {settings.randomAllPlay && <SpadeIcon />}
          </div>
        </div>
        <div className="text-center mt-3">
          <Button onClick={handleApply}>Apply</Button>
        </div>
      </div>
    </main>
  );
}
