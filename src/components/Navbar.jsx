import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="overflow-auto sticky top-0 py-4 text-white bg-gray-800">
      <div className="container flex gap-x-4 justify-between items-center px-4 mx-auto">
        <div className="text-lg font-bold">
          <Link href="/">LeetQuest</Link>
        </div>
        <div className="flex gap-x-3 [&>*]:bg-gray-700">
          <Button variant="outline" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/quest">Quest</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
