import AuthButton from "@/components/AuthButton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();



  if (!user) {
    return redirect("/login");
  }
  return (
    <div className="w-full flex flex-row gap-20  justify-evenly">
      <nav className="w-full flex items-center h-16 justify-between m-5">
        <div className="flex flex-row">
          <button className="flex row-auto gap-10 ml-20 p-2 hover:bg-black hover:text-white rounded">
            <h1>Home</h1>
          </button>
          <button className="flex row-auto gap-10 ml-20 p-2 hover:bg-black hover:text-white rounded">
            <Link href="/list">
              <h1>List</h1>
            </Link>
          </button>
        </div>

        <div className="flex flex-row items-center ">
          <h1 className="mr-4">{user.user_metadata.username}</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="https://cdn-icons-png.flaticon.com/128/848/848043.png"
                  alt="Profile Image"
                  width={32}
                  height={32}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/reset">Change Password</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <AuthButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
}
