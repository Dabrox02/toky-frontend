"use client";
import { useSession } from "@/components/providers/session-provider";
import { Button } from "@/components/shadcn-ui/button";
import { Input } from "@/components/shadcn-ui/input";
import { Label } from "@/components/shadcn-ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn-ui/popover";
import { axiosInstance } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "Nombre es obligatorio" }),
});

type Mail = z.infer<typeof schema>;

export const GenerateMailPopover = () => {
  const session = useSession();

  const mutationPost = useMutation({
    mutationFn: async (data: Mail) => {
      const dataFormatted = {
        userId: session?.user.id,
        name: data.name,
      };
      const response = await axiosInstance.post(
        "/mails/create",
        dataFormatted,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess() {
      toast.success("Creado exitosamente");
    },
    onError() {
      toast.error("Ha ocurrido un error");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Mail>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Mail) => {
    console.log("se ejecuta pero no se envia");
    mutationPost.mutate(data);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Generar</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Nuevo Tokymail</h4>
            <p className="text-sm text-muted-foreground">
              Establece un nombre para que usaras este nuevo Tokymail
            </p>
          </div>
          <form
            id="form-new-tokymail"
            className="flex flex-row gap-3 items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Label>Nombre</Label>
            <Input
              className={cn(
                !!errors.name?.message &&
                  "border-red-600 dark:border-red-600 dark:outline-none dark:ring-0"
              )}
              {...register("name")}
            />
            <Button type="submit">
              <Send />
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};
