import { useNavigate } from "react-router-dom";
import { routes } from "../../../app/router/routes";
import { AppButton } from "../../../shared/ui";
import { AuthSuccessState } from "../components/ui/AuthSuccessState";

export function PasswordUpdatedPage() {
  const navigate = useNavigate();

  return (
    <AuthSuccessState
      title="Password Updated Successfully"
      description="Your Voyana account is secure and ready for your next journey."
      action={
        <AppButton fullWidth type="button" onClick={() => navigate(routes.login)}>
          Back to sign in
        </AppButton>
      }
    />
  );
}
