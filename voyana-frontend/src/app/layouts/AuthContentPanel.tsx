import { Box, Typography } from "@mui/material";
import { Link as RouterLink, Outlet } from "react-router-dom";
import authLayoutTravelCoast from "../../assets/images/auth-layout-travel-coast.webp";
import { VoyanaLogoMark } from "../../shared/components/VoyanaLogoMark";
import { designTokens, tokenAlpha } from "../../shared/constants/designTokens";
import { routes } from "../router/routes";
import { AuthBackButton } from "./AuthBackButton";

type AuthContentPanelProps = {
  authBackTarget?: string;
};

export function AuthContentPanel({ authBackTarget }: AuthContentPanelProps) {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        bgcolor: designTokens.colors.backgroundDark,
        backgroundImage: {
          xs: `${designTokens.gradients.authMobileScrim}, ${designTokens.gradients.authMobileTint}, url(${authLayoutTravelCoast})`,
          md: designTokens.gradients.authContent,
        },
        backgroundSize: { xs: "cover", md: "auto" },
        backgroundPosition: { xs: "center center", md: "initial" },
        borderLeft: {
          md: `1px solid ${tokenAlpha(designTokens.rgb.textInverseMuted, 0.14)}`,
        },
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "space-between", md: "flex-start" },
          gap: 2,
          px: { xs: 2.5, sm: 4, md: 5, lg: 6 },
          pt: { xs: 2, md: 3.5 },
          pb: 1,
        }}
      >
        {authBackTarget ? <AuthBackButton to={authBackTarget} /> : null}

        <Box
          component={RouterLink}
          to={routes.home}
          aria-label="Back to home"
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            gap: 1.25,
            color: designTokens.colors.textInverse,
            textDecoration: "none",
          }}
        >
          <VoyanaLogoMark sx={{ width: 26, height: 26 }} />
          <Typography
            component="span"
            sx={{
              fontSize: 18,
              fontWeight: 800,
              color: designTokens.colors.textInverse,
              letterSpacing: 0,
              lineHeight: 1,
            }}
          >
            Voyana
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2.25, sm: 5, md: 6, lg: 8 },
          py: { xs: 3, md: 5 },
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 448 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
