import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

const redirect = new URLSearchParams(window.location.search).get("redirect");

if (redirect) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const target = redirect.startsWith("/") ? redirect : `/${redirect}`;
  window.history.replaceState(null, "", `${base}${target}`);
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
