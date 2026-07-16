import { Box } from "@mui/material";
import type { ReactNode } from "react";
import {
  designTokens,
  tokenAlpha,
} from "../../../../shared/constants/designTokens";
import { AppTypography } from "../../../../shared/ui";

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
      <AppTypography
        variant="pageTitle"
        sx={{
          mb: subtitle ? 1.5 : 3.5,
          color: designTokens.colors.textInverse,
          fontSize: { xs: 31, sm: 38 },
          textAlign: "center",
          textTransform: "uppercase",
          textWrap: "balance",
        }}
      >
        {title}
      </AppTypography>

      {subtitle ? (
        <AppTypography
          variant="body"
          sx={{
            mb: { xs: 3, sm: 4 },
            color: tokenAlpha(designTokens.rgb.textInverseMuted, 0.84),
            textAlign: "center",
            textWrap: "balance",
          }}
        >
          {subtitle}
        </AppTypography>
      ) : null}

      {children}
    </Box>
  );
}
