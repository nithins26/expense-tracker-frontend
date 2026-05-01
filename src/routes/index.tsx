import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { authService } from "@/services/authService";

export const Route = createFileRoute("/")({
  component: IndexRedirect,
});

function IndexRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const session = authService.getSession();
    navigate({ to: session ? "/dashboard" : "/login", replace: true });
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}
