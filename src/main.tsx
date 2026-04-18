import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "./hooks/use-theme.tsx";
import "./index.css";
// Preload the LCP onboarding hero image so the browser discovers it from the
// initial document and fetches it with high priority — improves LCP discovery.
import onboardingSlide1 from "./assets/onboarding-slide1.webp";

const preloadLink = document.createElement("link");
preloadLink.rel = "preload";
preloadLink.as = "image";
preloadLink.href = onboardingSlide1;
preloadLink.fetchPriority = "high";
document.head.appendChild(preloadLink);

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
