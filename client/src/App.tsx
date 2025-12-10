import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import LemonTest from "./pages/LemonTest";
import LemonTestResults from "./pages/LemonTestResults";
import { useState, useEffect } from "react";

// --- CUSTOM HOOK TO FIX RIGHTMESSAGE 404s ---
const useRightMessageAwareLocation = () => {
  const getLocation = () => {
    const path = window.location.pathname;
    // If we are inside the RightMessage editor (Rover), decode the real URL
    if (path.startsWith("/rover/")) {
      try {
        const parts = path.split("/");
        for (const part of parts) {
          const decoded = decodeURIComponent(part);
          if (decoded.startsWith("http://") || decoded.startsWith("https://")) {
            const realUrl = new URL(decoded);
            return realUrl.pathname; 
          }
        }
      } catch (e) {
        console.error("Failed to parse RightMessage URL", e);
      }
    }
    return path;
  };

  const [location, setLocation] = useState(getLocation());

  useEffect(() => {
    const handler = () => setLocation(getLocation());
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  const navigate = (to: string, options?: { replace?: boolean }) => {
    if (options?.replace) {
      window.history.replaceState(null, "", to);
    } else {
      window.history.pushState(null, "", to);
    }
    setLocation(to);
  };

  return [location, navigate] as [string, typeof navigate];
};
// ----------------------------------------

function AppRoutes() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/services"} component={Services} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/martech-lemon-test"} component={LemonTest} />
      <Route path={"/martech-lemon-test-results"} component={LemonTestResults} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Use the custom hook to handle routing
  const rightMessageHook = useRightMessageAwareLocation;

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          {/* We wrap the AppRoutes in a Router using our custom hook */}
          <Router hook={rightMessageHook}>
            <AppRoutes />
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
