import Link from 'next/link';
import { Button } from "@/components/ui/button"

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white py-4 overflow-auto">
      <div className="container mx-auto flex justify-between items-center [&>*]:px-4">
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