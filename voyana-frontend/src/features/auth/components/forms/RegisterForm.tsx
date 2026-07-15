import { Box, Divider, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { routes } from "../../../../app/router/routes";
import {
  designTokens,
  tokenAlpha,
} from "../../../../shared/constants/designTokens";
import {
  AppButton,
  AppPasswordField,
  AppTextField,
  GoogleButton,
} from "../../../../shared/ui";
import type { RegisterFormModel } from "../../hooks/useRegisterForm";
import { FormErrorAlert } from "../ui/FormErrorAlert";

export function RegisterForm({
  formError,
  isSubmitting,
  submitForm,
  firstNameFieldProps,
  lastNameFieldProps,
  emailFieldProps,
  passwordFieldProps,
  confirmPasswordFieldProps,
}: RegisterFormModel) {
  return (
    <Box component="form" noValidate onSubmit={submitForm}>
      <FormErrorAlert message={formError} />

      <Box className="space-y-4">
        <AppTextField
          label="First name*"
          placeholder="Alex"
          autoComplete="given-name"
          {...firstNameFieldProps}
        />

        <AppTextField
          label="Last name*"
          placeholder="Morgan"
          autoComplete="family-name"
          {...lastNameFieldProps}
        />

        <AppTextField
          label="Email address*"
          placeholder="traveler@example.com"
          autoComplete="email"
          {...emailFieldProps}
        />

        <AppPasswordField
          label="Password*"
          placeholder="Create a password"
          autoComplete="new-password"
          {...passwordFieldProps}
        />

        <AppPasswordField
          label="Confirm password*"
          placeholder="Re-enter your password"
          autoComplete="new-password"
          {...confirmPasswordFieldProps}
        />
      </Box>

      <Box className="mt-7 flex flex-col gap-4">
        <AppButton fullWidth type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Continue →"}
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
        Already planning with Voyana?{" "}
        <Link
          component={RouterLink}
          to={routes.login}
          color="primary"
          underline="none"
          sx={{ fontWeight: 800 }}
        >
          Log in
        </Link>
      </Box>
    </Box>
  );
}
