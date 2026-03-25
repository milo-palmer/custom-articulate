import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
    return (
        <main className="h-[100svh] flex flex-col gap-6 items-center justify-center mx-auto max-w-[600px] text-base px-5 md:px-10 ">
            <h1 className="text-4xl font-pt font-bold">Articulate!</h1>
            <Button asChild>
                <Link href={`/play`}>Play</Link>
            </Button>
            <Button asChild>
                <Link href={"/create"}>Create</Link>
            </Button>
            <Button asChild>
                <Link href={"/settings"}>Settings</Link>
            </Button>
        </main>
    );
}
