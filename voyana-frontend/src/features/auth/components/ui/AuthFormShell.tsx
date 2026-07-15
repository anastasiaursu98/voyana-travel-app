import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";
import {
  designTokens,
  tokenAlpha,
} from "../../../../shared/constants/designTokens";

type AuthFormShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function AuthFormShell({
  title,
  subtitle,
  children,
}: AuthFormShellProps) {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Typography
        component="h1"
        sx={{
          mb: subtitle ? 1.5 : 3.5,
          color: designTokens.colors.textInverse,
          fontSize: { xs: 31, sm: 38 },
          fontWeight: 900,
          lineHeight: 0.98,
          letterSpacing: 0,
          textAlign: "center",
          textTransform: "uppercase",
          textWrap: "balance",
        }}
      >
        {title}
      </Typography>

      {subtitle ? (
        <Typography
          sx={{
            mb: { xs: 3, sm: 4 },
            fontSize: { xs: 15, sm: 16 },
            lineHeight: 1.5,
            color: tokenAlpha(designTokens.rgb.textInverseMuted, 0.84),
            textAlign: "center",
            textWrap: "balance",
          }}
        >
          {subtitle}
        </Typography>
      ) : null}

      {children}
    </Box>
  );
}
