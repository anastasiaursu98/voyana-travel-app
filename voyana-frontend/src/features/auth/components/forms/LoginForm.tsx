import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Link,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { routes } from "../../../../app/router/routes";
import {
  AppButton,
  AppPasswordField,
  AppTextField,
  GoogleButton,
} from "../../../../shared/ui";
import { designTokens, tokenAlpha } from "../../../../shared/constants/designTokens";
import type { LoginFormModel } from "../../hooks/useLoginForm";
import { FormErrorAlert } from "../ui/FormErrorAlert";

export function LoginForm({
  formError,
  isSubmitting,
  submitForm,
  emailFieldProps,
  passwordFieldProps,
  rememberCheckboxProps,
}: LoginFormModel) {
  return (
    <Box component="form" noValidate onSubmit={submitForm}>
      <FormErrorAlert message={formError} />

      <Box className="space-y-5">
        <AppTextField
          label="Email address"
          placeholder="traveler@example.com"
          autoComplete="email"
          {...emailFieldProps}
        />

        <AppPasswordField
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
          {...passwordFieldProps}
        />
      </Box>

      <Box className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <FormControlLabel
          control={<Checkbox {...rememberCheckboxProps} />}
          label="Remember this device"
          sx={{
            m: 0,
            "& .MuiFormControlLabel-label": {
              color: designTokens.colors.textInverseMuted,
              fontSize: 15,
              fontWeight: 650,
            },
          }}
        />

        <Link
          component={RouterLink}
          to={routes.forgotPassword}
          color="primary"
          underline="none"
          sx={{ fontSize: 15, fontWeight: 800, whiteSpace: "nowrap" }}
        >
          Forgot password?
        </Link>
      </Box>

      <Box className="mt-7 flex flex-col gap-4">
        <AppButton fullWidth type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Continue →"}
        </AppButton>

        <Divider
          sx={{
            my: 0.5,
            "&::before, &::after": {
              borderColor: tokenAlpha(designTokens.rgb.textInverseMuted, 0.22),
            },
          }}
        >
          <Typography
            component="span"
            sx={{
              px: 1.5,
              fontSize: 13,
              color: designTokens.colors.textInverseMuted,
              fontWeight: 600,
            }}
          >
            or
          </Typography>
        </Divider>

        <GoogleButton type="button" disabled>
          Continue with Google
        </GoogleButton>
      </Box>

      <Box className="mt-8 text-center text-base text-(--voyana-color-text-inverse-muted)">
        New to Voyana?{" "}
        <Link
          component={RouterLink}
          to={routes.register}
          color="primary"
          underline="none"
          sx={{ fontWeight: 800 }}
        >
          Create an account
        </Link>
      </Box>
    </Box>
  );
}
