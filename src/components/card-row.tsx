import { ReactNode } from "react";
import { SpadeIcon } from "@/components/icon";
import { cn } from "@/lib/utils";

export const CardRow = ({
  allPlay,
  color,
  children,
  keyText,
}: {
  allPlay: boolean;
  color: string;
  children: ReactNode;
  keyText: string;
}) => {
  return (
    <div className="flex gap-2">
      <div
        className={cn(
          "aspect-square  min-w-6 min-h-6 max-w-6 max-h-6 flex items-center justify-center text-center border border-black font-pt",
          color,
        )}
      >
        {keyText}
      </div>
      <p className="w-full">{children}</p>
      <div
        className={cn(
          "aspect-square  min-w-6 min-h-6 max-w-6 max-h-6 flex items-center justify-center text-center border border-black",
          color,
        )}
      >
        {allPlay && <SpadeIcon />}
      </div>
    </div>
  );
};
