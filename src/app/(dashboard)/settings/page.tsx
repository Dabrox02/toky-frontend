import { Badge } from "@/components/shadcn-ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardIcon,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { MailPlus } from "lucide-react";
import { GenerateMailPopover } from "./components/generate-mail-popover";

export default function SettingsPage() {
  return (
    <div className="p-4 w-full mx-auto max-w-5xl">
      <h1 className="font-semibold text-xl mb-4">Configuración</h1>
      {/* Configuraciones */}
      <div className="flex flex-col gap-3">
        <Card className="rounded-sm dark:bg-sidebar flex flex-col sm:flex-row">
          <CardIcon className="hidden sm:flex">
            <MailPlus />
          </CardIcon>
          <CardHeader className="sm:px-0">
            <CardTitle>
              Generar Nuevo Tokymail
              <Badge className="hidden min-[400px]:inline-flex mx-3">
                Max. 10
              </Badge>
            </CardTitle>
            <CardDescription className="text-sm text-primary-foreground">
              Generar Nuevo Tokymail
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 w-full h-full flex-1 flex justify-end">
            <GenerateMailPopover />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
