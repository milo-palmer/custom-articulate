"use client";

import { useState } from "react";
import { CloseIcon, HamburgerIcon } from "./icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import * as GameStore from "@/lib/game-store";

export const NavContent = () => {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const handleNav = () => {
    setOpen(false);
    GameStore.resetGameState();
  };

  return (
    <>
      <div className="fixed top-0 right-0 p-5 z-1001">
        {open ? (
          <button onClick={() => setOpen(false)}>
            <CloseIcon />
          </button>
        ) : (
          <button onClick={() => setOpen(true)}>
            <HamburgerIcon />
          </button>
        )}
      </div>
      <div
        className={cn(
          "bg-person flex flex-col gap-6 fixed top-0 bottom-0 right-0 pt-16 pb-5 px-5 z-1000 min-w-62.5 translate-x-full transition-transform ease-in-out duration-200",
          { "translate-x-0": open },
        )}
      >
        <Button onClick={handleNav} asChild>
          <Link href={"/"}>Home</Link>
        </Button>
        <Button onClick={handleNav} asChild>
          <Link href={`/play`}>{pathname.includes("play") ? "Play again" : "Play"}</Link>
        </Button>
        <Button onClick={handleNav} asChild>
          <Link href={"/create"}>Create</Link>
        </Button>
        <Button onClick={handleNav} asChild>
          <Link href={"/settings"}>Settings</Link>
        </Button>
      </div>
    </>
  );
};
