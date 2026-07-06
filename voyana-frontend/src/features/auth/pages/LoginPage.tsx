import { LoginForm } from "../components/forms/LoginForm";
import { AuthFormShell } from "../components/ui/AuthFormShell";
import { useLoginForm } from "../hooks/useLoginForm";

export function LoginPage() {
  const loginForm = useLoginForm();

  return (
    <AuthFormShell
      title="Welcome back"
      subtitle="Discover the World. Start Your Journey."
    >
      <LoginForm {...loginForm} />
    </AuthFormShell>
  );
}
