import { RegisterForm } from "../components/forms/RegisterForm";
import { AuthFormShell } from "../components/ui/AuthFormShell";
import { useRegisterForm } from "../hooks/useRegisterForm";

export function RegisterPage() {
  const registerForm = useRegisterForm();

  return (
    <AuthFormShell
      title="Create Your Voyana Account"
      subtitle="Join millions of travelers discovering unforgettable destinations."
    >
      <RegisterForm {...registerForm} />
    </AuthFormShell>
  );
}
