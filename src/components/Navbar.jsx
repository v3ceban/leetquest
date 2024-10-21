import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthButton } from "@/components/AuthButton";
import { auth } from "@/lib/auth";
import {
  faHouseChimney,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@/components/Icon";

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
      <nav className="grid grid-cols-3 gap-x-4">
        {session && (
          <>
            <Button variant="outline" asChild>
              <Link href="/dashboard">
                <Icon icon={faHouseChimney} className="text-base" fixedWidth />
                Dashboard
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/quest">
                <Icon icon={faLocationArrow} fixedWidth />
                Quest
              </Link>
            </Button>
          </>
        )}
        <AuthButton
          className="col-start-3 col-end-4"
          session={session}
          variant="outline"
          auto="/login"
        />
      </nav>
    </header>
  );
};

export default Navbar;
