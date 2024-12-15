"use client";
import { InputPassword } from "@/components/ui/input-password";
import { Button } from "@/components/shadcn-ui/button";
import { Icons } from "@/components/shadcn-ui/icons";
import { Input } from "@/components/shadcn-ui/input";
import { Label } from "@/components/shadcn-ui/label";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({ message: "Email es obligatorio" }),
  password: z.string().min(8, { message: "Contraseña es obligatoria" }),
});

type UserAuth = z.infer<typeof schema>;
const supabase = createClient();

type UserLoginFormProps = React.HTMLAttributes<HTMLDivElement>;

export function UserLoginForm({ className, ...props }: UserLoginFormProps) {
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
    const { data, error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });

    if (data.user) {
      console.log(data);
      toast.success("Inicio Sesión exitoso");
      replace("/home");
    }

    if (error) {
      toast.error("Inicio sesión invalido");
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
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
            Iniciar Sesión
          </Button>
        </div>
      </form>
    </div>
  );
}
