"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z, ZodType } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { createClient } from "@/utils/supabase/client";
import { buttonVariants } from "@/components/ui/button";

const formSchema: ZodType<{ password: string; confirmPassword: string }> = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

type FormSchemaType = z.infer<typeof formSchema>;

export function ResetPassword() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({
      password: values.password,
    });

    if (error) {
      return toast({
        variant: "destructive",
        title: error.message,
      });
    }

    toast({
      title: "Password reset successful.",
    });

    router.back();
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/protected"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Set New Password
          </h1>
        </div>
        <div className="grid gap-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-4"
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Enter New Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="******"
                        autoCapitalize="none"
                        autoComplete="none"
                        autoCorrect="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="confirm-password">Confirm New Password</FormLabel>
                    <FormControl>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="******"
                        autoCapitalize="none"
                        autoComplete="none"
                        autoCorrect="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                className={buttonVariants()}
                type="submit"
              >
                Confirm Change
              </button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
