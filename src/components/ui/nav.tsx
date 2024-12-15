import { cn } from "@/lib/utils";
import { Button } from "../shadcn-ui/button";

const NAV_HEIGHT = "3rem";

const Nav = ({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      style={
        {
          "--nav-height": NAV_HEIGHT,
        } as React.CSSProperties
      }
      className={cn(
        "sticky top-0 h-[--nav-height] min-h-[--nav-height] max-h-[--nav-height] border-b bg-sidebar text-sidebar-foreground z-10",
        className
      )}
    >
      <div className="flex flex-row">{children}</div>
    </div>
  );
};

Nav.displayName = "Nav";

const NavItemGroup = ({ className, ...props }: React.ComponentProps<"div">) => {
  return <div className={cn("flex-1 flex flex-row", className)} {...props} />;
};

Nav.displayName = "NavItemGroup";

const NavItem = (
  props: React.ComponentProps<"div"> & { asButton?: boolean }
) => {
  const { asButton, children, ...rest } = props;
  const Comp = asButton ? (
    <Button variant="outline" className="w-8 h-8">
      {children}
    </Button>
  ) : (
    children
  );

  return (
    <div
      className="w-[--nav-height] h-[--nav-height] flex justify-center items-center"
      {...rest}
    >
      {Comp}
    </div>
  );
};

Nav.displayName = "NavItem";

export { Nav, NavItemGroup, NavItem };
