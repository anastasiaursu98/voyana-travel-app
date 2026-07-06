import { Box } from "@mui/material";
import { designTokens } from "../../shared/constants/designTokens";
import { AuthContentPanel } from "./AuthContentPanel";
import { AuthHeroPanel } from "./AuthHeroPanel";
import { useAuthBackTarget } from "./hooks/useAuthBackTarget";

export function AuthLayout() {
  const authBackTarget = useAuthBackTarget();

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        height: "100vh",
        minHeight: "100dvh",
        overflow: "hidden",
        bgcolor: designTokens.colors.backgroundDark,
      }}
    >
      <AuthHeroPanel />
      <AuthContentPanel authBackTarget={authBackTarget} />
    </Box>
  );
}
