import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthButton } from "@/components/auth-button";
import { auth } from "@/lib/auth";
import { Home, MapPin, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { cn } from "@/lib/utils";
import propTypes from "prop-types";

const Navbar = async ({ className }) => {
  const session = await auth();

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background bg-base">
      <div
        className={cn(
          className,
          "flex gap-x-4 justify-between items-center py-4",
        )}
      >
        <div className="text-3xl font-bold md:text-5xl">
          <Link href="/">
            LeetQuest
            <span className="block text-sm font-normal md:text-base">
              Learning to code can be fun
            </span>
          </Link>
        </div>

        {session ? (
          <>
            {" "}
            <nav className="hidden gap-x-4 md:grid grid-cols-[150px_150px_150px]">
              <Button variant="wave" size="wave">
                <Link
                  className="flex justify-center items-center w-full h-full"
                  tabIndex={-1}
                  href="/dashboard"
                >
                  <Home className="inline-block mr-1 w-4 h-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="wave" size="wave">
                <Link
                  className="flex justify-center items-center w-full h-full"
                  tabIndex={-1}
                  href="/quest"
                >
                  <MapPin className="inline-block mr-1 w-4 h-4" />
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
                <DropdownMenuContent className="p-0 mt-1 border border-foreground min-w-[150px]">
                  <DropdownMenuItem className="p-0 hover:bg-accent hover:text-accent-foreground">
                    <AuthButton
                      session={session}
                      variant="link"
                      className="p-0 w-full hover:no-underline"
                    />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-full h-full" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="px-0 border-border w-[250px]"
              >
                <nav className="flex flex-col gap-4 p-6">
                  <SheetHeader className="flex flex-row gap-2 justify-center items-center pb-4 mb-4 border-b border-border">
                    <Image
                      src={session.user.image}
                      alt={session.user.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <SheetTitle className="!mt-0 text-base font-medium">
                      {session.user.name}
                    </SheetTitle>
                  </SheetHeader>
                  <Button
                    variant="ghost"
                    className="justify-start w-full"
                    asChild
                  >
                    <Link href="/dashboard">
                      <Home className="mr-2 w-5 h-5" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start w-full"
                    asChild
                  >
                    <Link href="/quest">
                      <MapPin className="mr-2 w-5 h-5" />
                      Quest
                    </Link>
                  </Button>
                  <div className="pt-4 mt-auto border-t border-border">
                    <AuthButton
                      session={session}
                      variant="ghost"
                      className="justify-start w-full"
                    />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </>
        ) : (
          <AuthButton
            session={session}
            variant="wave"
            size="wave"
            className="w-32"
            primary
          />
        )}
      </div>
    </header>
  );
};

Navbar.propTypes = {
  className: propTypes.string,
};

export default Navbar;
