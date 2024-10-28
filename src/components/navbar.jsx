import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthButton } from "@/components/auth-button";
import { auth } from "@/lib/auth";
import {
  faHouseChimney,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@/components/icon";
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
    <header className="flex sticky top-0 gap-x-4 justify-between items-center py-4 bg-base">
      <div className="text-5xl font-bold">
        <Link href="/">
          LeetQuest
          <span className="block text-base font-normal">
            Learning to code can be fun
          </span>
        </Link>
      </div>
      <nav className="grid grid-cols-[150px_150px_150px] gap-x-4">
        {session ? (
          <>
            <Button variant="wave" size="wave">
              <Link tabIndex={-1} href="/dashboard">
                <Icon icon={faHouseChimney} width={18} height={18} />
                Dashboard
              </Link>
            </Button>
            <Button variant="wave" size="wave">
              <Link tabIndex={-1} href="/quest">
                <Icon icon={faLocationArrow} />
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
                    className="rounded-full mr-1"
                  />
                  {session.user.name.split(" ")[0]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-2 border-foreground min-w-[150px]">
                <DropdownMenuItem className="focus:bg-transparent">
                  <AuthButton
                    session={session}
                    variant="link"
                    auto="/profile"
                  />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <AuthButton
                    session={session}
                    variant="link"
                    auto="/profile"
                  />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <AuthButton
                    session={session}
                    variant="link"
                    auto="/profile"
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
