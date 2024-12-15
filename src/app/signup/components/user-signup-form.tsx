"use client";
import { InputPassword } from "@/components/ui/input-password";
import { Button, buttonVariants } from "@/components/shadcn-ui/button";
import { Icons } from "@/components/shadcn-ui/icons";
import { Input } from "@/components/shadcn-ui/input";
import { Label } from "@/components/shadcn-ui/label";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const schema = z.object({
  email: z.string().email({ message: "Email es obligatorio" }),
  password: z.string().min(8, { message: "Contraseña es obligatoria" }),
});

type UserAuth = z.infer<typeof schema>;

type UserSignupFormProps = React.HTMLAttributes<HTMLDivElement>;

export function UserSignupForm({ className, ...props }: UserSignupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAuth>({
    resolver: zodResolver(schema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { replace } = useRouter();

  const onSubmit = async (user: UserAuth) => {
    setIsLoading(true);
    console.log("datos del usuario", user);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
    });

    if (data.user) {
      toast.success("Verifique su bandeja de entrada");
      replace("/login");
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              suffix={<Icons.mail />}
              {...register("email")}
            />
            {errors.email?.message && (
              <span className="text-red-400 text-sm px-2">
                {errors.email?.message}
              </span>
            )}
            <InputPassword
              id="password"
              placeholder="Contraseña"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />
            {errors.password?.message && (
              <span className="text-red-400 text-sm px-2">
                {errors.password?.message}
              </span>
            )}
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Iniciar Sesión con Correo
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            o continua con
          </span>
        </div>
      </div>
      <Link
        href="/login"
        className={cn(buttonVariants({ variant: "outline" }))}
      >
        <span className="px-2 text-muted-foreground tracking-widest">
          INICIAR SESION
        </span>
      </Link>
    </div>
  );
}
