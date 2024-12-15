import { cookies } from "next/headers";
import { SidebarProvider } from "@/components/shadcn-ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { Main } from "./components/main";
import { AppNav } from "./components/app-nav";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <div className="relative w-full h-full min-h-screen">
        <AppNav />
        <Main>{children}</Main>
      </div>
    </SidebarProvider>
  );
}
