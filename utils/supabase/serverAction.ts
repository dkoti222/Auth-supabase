"use server";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface SignInResult {
  error: boolean;
}

export const signIn = async (email: string, password: string): Promise<SignInResult> => {
  const supabase = createClient();

  // receiving props signIn function  from Login Page

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/login?message=Could not authenticate user");
    return { error: true };
  }

  redirect("/protected");
  return { error: false };
};

export const signUp = async (
  email: string,
  password: string,
  username: string
): Promise<void> => {
  const origin = headers().get("origin");
  const supabase = createClient();

  // receiving props signUp function  from Register Page

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    redirect("/register?message=Could not authenticate user");
    return;
  }

  redirect("/login?message=Check email to continue sign in process");
};
