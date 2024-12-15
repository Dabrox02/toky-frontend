import * as React from "react";

import { Input, InputProps } from "../shadcn-ui/input";
import { useToggle } from "@/hooks/use-toggle";
import { Icons } from "../shadcn-ui/icons";

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, suffix, ...props }, ref) => {
    const [visible, toggleVisible] = useToggle();

    return (
      <Input
        {...props}
        ref={ref}
        type={visible ? "text" : "password"}
        suffix={
          visible ? (
            <Icons.eyeSlashed onClick={toggleVisible} />
          ) : (
            <Icons.eye onClick={toggleVisible} />
          )
        }
      />
    );
  }
);
InputPassword.displayName = "InputPassword";

export { InputPassword };
