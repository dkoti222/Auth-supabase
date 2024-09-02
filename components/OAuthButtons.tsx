"use client";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";

export function OAuthButtons() {
  const signInWithProvider = async (provider: "google" | "github") => {
    const supabase = createClient();

    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
  
  };

  return (
    <>
      <Button
        onClick={() => signInWithProvider("google")}
        className="bg-black rounded-md px-4 py-2 text-white mb-2"
      >
        Sign In with Google
      </Button>
      <Button
        onClick={() => signInWithProvider("github")}
        className="bg-black rounded-md px-4 py-2 text-white mb-2"
      >
        Sign In with GitHub
      </Button>
    </>
  );
}
