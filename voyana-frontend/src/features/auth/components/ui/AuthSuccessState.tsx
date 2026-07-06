import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";
import passwordUpdatedIcon from "../../../../assets/icons/password-updated.svg";
import { designTokens } from "../../../../shared/constants/designTokens";

type AuthSuccessStateProps = {
  title: string;
  description: string;
  action: ReactNode;
};

export function AuthSuccessState({
  title,
  description,
  action,
}: AuthSuccessStateProps) {
  return (
    <Box
      sx={{
        width: "100%",
        textAlign: "center",
      }}
    >
      <Box
        component="img"
        src={passwordUpdatedIcon}
        alt=""
        className="mx-auto mb-8 h-36 w-36"
        aria-hidden="true"
      />
      <Typography
        component="h1"
        sx={{
          mb: 2,
          color: designTokens.colors.textInverse,
          fontSize: { xs: 28, sm: 34 },
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: 0,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          mx: "auto",
          mb: 5,
          maxWidth: 480,
          color: designTokens.colors.textInverseMuted,
          fontSize: { xs: 16, sm: 18 },
        }}
      >
        {description}
      </Typography>
      {action}
    </Box>
  );
}
