import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Box, Typography } from "@mui/material";
import { AppButton } from "../../../../shared/ui";
import type { OtpVerificationFormModel } from "../../hooks/useOtpVerificationForm";
import { FormErrorAlert } from "../ui/FormErrorAlert";
import { OtpCodeInput } from "../ui/OtpCodeInput";

export function OtpVerificationForm({
  formError,
  resendMessage,
  codeError,
  digitFields,
  formattedSeconds,
  isResendAvailable,
  isResending,
  isSubmitDisabled,
  isSubmitting,
  submitForm,
  onResendCode,
  onBackClick,
}: OtpVerificationFormModel) {
  return (
    <Box component="form" noValidate onSubmit={submitForm}>
      <FormErrorAlert message={formError} />

      <OtpCodeInput fields={digitFields} />

      <Box className="mt-7 flex min-h-9 items-center justify-between gap-4">
        {isResendAvailable ? (
          <Box className="ml-auto">
            <AppButton
              intent="text"
              type="button"
              onClick={onResendCode}
              disabled={isResending}
            >
              {isResending ? "Sending..." : "Resend code"}
            </AppButton>
          </Box>
        ) : (
          <>
            <Typography
              className="text-(--voyana-color-text-inverse-muted)"
              sx={{ fontSize: 15, fontWeight: 700 }}
            >
              Resend code in
            </Typography>
            <Typography
              className="shrink-0 text-(--voyana-color-white)"
              sx={{ fontSize: 16, fontWeight: 800 }}
            >
              00:{formattedSeconds}
            </Typography>
          </>
        )}
      </Box>

      {resendMessage ? (
        <Typography
          className="mt-3 text-center"
          color="text.secondary"
          sx={{ fontSize: 14 }}
        >
          {resendMessage}
        </Typography>
      ) : null}

      {codeError ? (
        <Typography
          className="mt-3 text-center"
          color="error"
          sx={{ fontSize: 14 }}
        >
          {codeError}
        </Typography>
      ) : null}

      <Box className="mt-8 flex flex-col gap-4">
        <AppButton fullWidth type="submit" disabled={isSubmitDisabled}>
          {isSubmitting ? "Verifying..." : "Verify code"}
        </AppButton>

        <Box className="flex justify-center">
          <AppButton
            intent="text"
            type="button"
            onClick={onBackClick}
            startIcon={<ArrowBackRoundedIcon className="text-[1.05rem]" />}
          >
            Back to sign in
          </AppButton>
        </Box>
      </Box>
    </Box>
  );
}
