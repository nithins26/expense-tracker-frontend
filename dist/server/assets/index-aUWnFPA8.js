import { r as reactExports, W as jsxRuntimeExports } from "./worker-entry-DnpScg6Z.js";
import { u as useNavigate, a as authService } from "./router-CVpIV_2u.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function IndexRedirect() {
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    const session = authService.getSession();
    navigate({
      to: session ? "/dashboard" : "/login",
      replace: true
    });
  }, [navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" }) });
}
export {
  IndexRedirect as component
};
