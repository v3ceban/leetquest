import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthButton } from "@/components/auth-button";
import { auth } from "@/lib/auth";
import { FaHouseChimney, FaLocationArrow } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="flex sticky top-0 gap-x-4 justify-between items-center py-4 bg-background bg-base">
      <div className="text-5xl font-bold">
        <Link href="/">
          LeetQuest
          <span className="block text-base font-normal">
            Learning to code can be fun
          </span>
        </Link>
      </div>
      <nav className="grid gap-x-4 grid-cols-[150px_150px_150px]">
        {session ? (
          <>
            <Button variant="wave" size="wave">
              <Link tabIndex={-1} href="/dashboard">
                <FaHouseChimney className="inline-block mr-1 mb-[2px]" />
                Dashboard
              </Link>
            </Button>
            <Button variant="wave" size="wave">
              <Link tabIndex={-1} href="/quest">
                <FaLocationArrow className="inline-block mr-1" />
                Quest
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="wave" size="wave">
                  <Image
                    src={session.user.image}
                    alt={session.user.name}
                    width={24}
                    height={24}
                    className="mr-1 rounded-full"
                  />
                  {session.user.name.split(" ")[0]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-0 border-2 border-foreground min-w-[150px]">
                <DropdownMenuItem className="py-0 hover:bg-accent hover:text-accent-foreground">
                  <AuthButton
                    session={session}
                    variant="link"
                    className="p-0 w-full hover:no-underline"
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <AuthButton
            className="col-start-3 col-end-4"
            session={session}
            variant="wave"
            size="wave"
            auto="/login"
          />
        )}
      </nav>
    </header>
  );
};

export default Navbar;
