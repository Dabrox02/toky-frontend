import * as React from "react";

import { Input, InputProps } from "../ui/input";
import { useToggle } from "@/hooks/useToggle";
import { Icons } from "../ui/icons";

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
