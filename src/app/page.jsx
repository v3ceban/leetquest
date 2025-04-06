import { AuthButton } from "@/components/auth-button";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { auth } from "@/lib/auth";
import Link from "next/link";

const HomePage = async () => {
  const session = await auth();
  return (
    <main className="grid grid-cols-2 gap-x-4 mt-36">
      <section className="space-y-10 text-xl">
        <p>
          Ever found yourself struggling with finding a place to start on
          LeetCode? Or maybe you&apos;re just looking for a way to track your
          progress.
        </p>
        <p>
          <strong>LeetQuest</strong> is a way for you to improve and streamline
          your learning experience. Just give it a try. Also, Daryl, pls change
          this text to something better when you have a chance.
        </p>
        {session ? (
          <Button className="text-base" asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        ) : (
          <AuthButton className="text-base">Get Started</AuthButton>
        )}
      </section>
      <Image
        className="place-self-end rounded shadow-solid"
        src="/worlds.webp"
        alt="Worlds"
        width={500}
        height={400}
      />
    </main>
  );
};

export default HomePage;
