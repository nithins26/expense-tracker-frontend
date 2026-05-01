import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-Cxirg5m8.js";
import { u as useNavigate, L as Link, a as authService } from "./router-Q8VAmIuZ.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, L as Label } from "./label-CE-f0aKx.js";
import { I as Input } from "./input-D2niD7v4.js";
import { B as Button } from "./button-_kaszSM2.js";
import { t as toast } from "./index-Cbz3oEH_.js";
import { W as Wallet } from "./wallet-CdXtprhg.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-TyoOKPst.js";
import "./index-BfU5L8LY.js";
import "./createLucideIcon-DuWgMsIr.js";
function SignupPage() {
  const navigate = useNavigate();
  const [username, setUsername] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [confirm, setConfirm] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 4) {
      toast.error("Password must be at least 4 characters");
      return;
    }
    setLoading(true);
    try {
      authService.signup(username.trim(), password);
      toast.success("Account created!");
      navigate({
        to: "/dashboard"
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex flex-col items-center text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-primary-foreground", style: {
        background: "var(--gradient-primary)",
        boxShadow: "var(--shadow-elegant)"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-7 w-7" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Create your account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Track expenses in seconds" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { style: {
      boxShadow: "var(--shadow-card)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Sign up" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "It's free and takes a moment" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "username", children: "Username" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "username", required: true, value: username, onChange: (e) => setUsername(e.target.value), placeholder: "choose_a_username" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "password", type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "confirm", children: "Confirm password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "confirm", type: "password", required: true, value: confirm, onChange: (e) => setConfirm(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: loading, children: loading ? "Creating..." : "Create account" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-center text-sm text-muted-foreground", children: [
          "Already have an account?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "font-medium text-primary hover:underline", children: "Sign in" })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  SignupPage as component
};
