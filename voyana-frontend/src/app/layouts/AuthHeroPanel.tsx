import { Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import authLayoutTravelCoast from "../../assets/images/auth-layout-travel-coast.webp";
import { VoyanaLogoMark } from "../../shared/components/VoyanaLogoMark";
import { designTokens, tokenAlpha } from "../../shared/constants/designTokens";
import { routes } from "../router/routes";
import { AUTH_TRUST_STATS } from "./constants/authLayout.constants";

export function AuthHeroPanel() {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "block" },
        position: "relative",
        flex: "0 0 52%",
        overflow: "hidden",
        bgcolor: designTokens.colors.backgroundDark,
      }}
    >
      <Box
        component="img"
        src={authLayoutTravelCoast}
        alt=""
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
          display: "block",
          userSelect: "none",
        }}
      />

      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          background: designTokens.gradients.authImageVertical,
        }}
      />

      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: designTokens.gradients.authImageHorizontal,
        }}
      />

      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: designTokens.gradients.brandTint,
        }}
      />

      <Box
        component={RouterLink}
        to={routes.home}
        aria-label="Back to home"
        sx={{
          position: "absolute",
          top: 32,
          left: 36,
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          color: designTokens.colors.textInverse,
          textDecoration: "none",
          textShadow: designTokens.shadows.text,
        }}
      >
        <VoyanaLogoMark sx={{ width: 32, height: 32 }} />
        <Typography
          component="span"
          sx={{
            fontSize: 22,
            fontWeight: 850,
            lineHeight: 1,
            letterSpacing: 0,
          }}
        >
          Voyana
        </Typography>
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          maxWidth: 760,
          p: { md: 5, lg: 6 },
        }}
      >
        <Typography
          component="p"
          sx={{
            mb: 1.75,
            fontSize: { md: 14, lg: 15 },
            fontWeight: 900,
            lineHeight: 1.3,
            letterSpacing: 0,
            color: designTokens.colors.buttonPrimary,
          }}
        >
          Discover the World. Start Your Journey.
        </Typography>
        <Typography
          component="h2"
          sx={{
            maxWidth: 620,
            fontSize: { md: 54, lg: 72, xl: 84 },
            fontWeight: 900,
            color: designTokens.colors.textInverse,
            lineHeight: 0.9,
            letterSpacing: 0,
            mb: 2.5,
            textWrap: "balance",
            textTransform: "uppercase",
          }}
        >
          Discover the World
        </Typography>
        <Typography
          sx={{
            maxWidth: 560,
            fontSize: { md: 18, lg: 20 },
            lineHeight: 1.5,
            color: designTokens.colors.textInverseMuted,
            mb: 4,
          }}
        >
          Plan trips from idea to booking, from timeless cities to island
          coastlines.
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 4,
            pt: 3,
            borderTop: `1px solid ${tokenAlpha(designTokens.rgb.textInverseMuted, 0.22)}`,
          }}
        >
          {AUTH_TRUST_STATS.map((stat) => (
            <Box key={stat.label}>
              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: designTokens.colors.textInverse,
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 12,
                  color: tokenAlpha(designTokens.rgb.textInverseMuted, 0.72),
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
