import type { ButtonProps } from "@mui/material";
import googleIcon from "../../assets/icons/google.svg";
import { AppButton } from "./AppButton";

export function GoogleButton({ children, ...props }: ButtonProps) {
  return (
    <AppButton
      fullWidth
      intent="secondary"
      startIcon={
        <img src={googleIcon} alt="" className="h-6 w-6" aria-hidden="true" />
      }
      {...props}
    >
      {children}
    </AppButton>
  );
}
