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

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="flex overflow-auto sticky top-0 gap-x-4 justify-between items-center py-4 bg-base">
      <div className="text-5xl font-bold">
        <Link href="/">
          LeetQuest
          <span className="block text-base font-normal">
            Learning to code can be fun
          </span>
        </Link>
      </div>
      <nav className="grid grid-cols-[150px_150px_150px] gap-x-4">
        {session && (
          <>
            <Button variant="wave" size="wave" asChild>
              <Link href="/dashboard">
                <Icon icon={faHouseChimney} width={18} height={18} />
                Dashboard
              </Link>
            </Button>
            <Button variant="wave" size="wave" asChild>
              <Link href="/quest">
                <Icon icon={faLocationArrow} />
                Quest
              </Link>
            </Button>
          </>
        )}
        <AuthButton
          className="col-start-3 col-end-4"
          session={session}
          variant="wave"
          size="wave"
          auto="/login"
        />
      </nav>
    </header>
  );
};

export default Navbar;
