import { useSyncExternalStore } from "react";

const API = import.meta.env.VITE_API_URL;

// ---------- SSR SAFETY ----------
const isBrowser = typeof window !== "undefined";

// ---------- TYPES ----------
interface User {
  id: string;
  username: string;
}

interface AuthState {
  user: User | null;
}

// ---------- STORAGE HELPERS ----------
const getStoredUser = (): User | null => {
  if (!isBrowser) return null;
  return JSON.parse(localStorage.getItem("pet:user") || "null");
};

const getStoredToken = (): string | null => {
  if (!isBrowser) return null;
  return localStorage.getItem("pet:token");
};

// ---------- INTERNAL STORE ----------
let state: AuthState = {
  user: getStoredUser(),
};

const listeners = new Set<() => void>();

const emit = () => {
  listeners.forEach((l) => l());
};

const themeListeners = new Set<() => void>();

const emitTheme = () => {
  themeListeners.forEach((l) => l());
};

const getStoredTheme = () => {
  if (!isBrowser) return "light";
  return localStorage.getItem("pet:theme") || "light";
};

const applyTheme = (theme: string) => {
  if (!isBrowser) return;
  document.documentElement.classList.toggle("dark", theme === "dark");
};

if (isBrowser) {
  applyTheme(getStoredTheme());
}

// ---------- STATE MANAGEMENT ----------
const setUser = (user: User | null, token?: string) => {
  state.user = user;

  if (isBrowser) {
    if (user && token) {
      localStorage.setItem("pet:user", JSON.stringify(user));
      localStorage.setItem("pet:token", token);
    } else {
      localStorage.removeItem("pet:user");
      localStorage.removeItem("pet:token");
    }
  }

  emit();
};

// ---------- AUTH SERVICE ----------
export const authService = {
  // 🔐 Signup
  async signup(username: string, password: string) {
    const res = await fetch(`${API}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message || "Signup failed");
    }

    return data;
  },

  // 🔐 Login
  async login(username: string, password: string) {
    const res = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message || "Login failed");
    }

    const user = {
      id: data.data.id,
      username: data.data.username,
    };

    const token = data.data.token;

    setUser(user, token);

    return data;
  },

  // 🚪 Logout
  logout() {
    setUser(null);
  },

  // 👤 Get current session
  getSession() {
    return state.user;
  },

  // 🔑 Get token
  getToken() {
    return getStoredToken();
  },
};

// ---------- HOOKS ----------

// 🔐 Auth hook (reactive)
export const useAuth = () => {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => state, // client snapshot
    () => ({ user: null }), // ✅ server snapshot (important)
  );
};

// 🎨 Theme hook (SSR safe)
export const useTheme = () => {
  const theme = useSyncExternalStore(
    (cb) => {
      themeListeners.add(cb);
      return () => themeListeners.delete(cb);
    },
    getStoredTheme,
    () => "light",
  );

  const setTheme = (theme: string) => {
    if (!isBrowser) return;

    localStorage.setItem("pet:theme", theme);
    applyTheme(theme);
    emitTheme();
  };

  return {
    theme,
    setTheme,
    toggle: () => setTheme(theme === "light" ? "dark" : "light"),
  };
};
