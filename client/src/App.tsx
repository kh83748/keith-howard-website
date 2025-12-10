import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router, useLocation } from "wouter";
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

// --- CUSTOM HOOK FOR RIGHTMESSAGE FIX ---
// This hook checks if we are in the "Rover" editor. If so, it finds the REAL path
// hidden inside the encoded URL (e.g. /rover/.../https%3A%2F%2Fsite.com%2Freal-page)
const useRightMessageAwareLocation = () => {
  // Helper to parse the current URL
  const getLocation = () => {
    const path = window.location.pathname;
    
    // Check for RightMessage proxy prefix
    if (path.startsWith("/rover/")) {
      try {
        // Split the path and look for the segment that contains the encoded target URL
        const parts = path.split("/");
        for (const part of parts) {
          const decoded = decodeURIComponent(part);
          // If we find a segment that looks like a URL, extract its pathname
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

  // Standard wouter navigation function
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
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  // Use our custom hook instead of the default browser location
  const rightMessageHook = useRightMessageAwareLocation;

  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          {/* We wrap the Switch in a Router with our custom hook */}
          <Router hook={rightMessageHook}>
            <AppRoutes />
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
