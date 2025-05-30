import { AuthLayout } from "@/components/auth/layout";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { AuthToggle } from "@/components/auth/toggle";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/sign-up")({
  component: SignUp,
});

function SignUp() {
  return (
    <AuthLayout
      title="Create account"
      subtitle="Get started with your free workspace"
    >
      <SignUpForm />
      <AuthToggle
        message="Already have an account?"
        linkText="Sign in"
        linkTo="/auth/sign-in"
      />
    </AuthLayout>
  );
}
