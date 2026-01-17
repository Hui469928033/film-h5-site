import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Router, Route, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Home from "@/pages/Home";
import Detail from "@/pages/Detail";
import Player from "@/pages/Player";
import Order from "@/pages/Order";
import CrowdList from "@/pages/CrowdList";
import CrowdDetail from "@/pages/CrowdDetail";
import CourseList from "@/pages/CourseList";
import CourseDetail from "@/pages/CourseDetail";
import UserPage from "@/pages/User";
import NotFound from "@/pages/NotFound";

// Use hash-based routing (/#/) to support opening index.html directly via file:// protocol
function AppRouter() {
  return (
    <Router hook={useHashLocation}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/movie/:id" component={Detail} />
        <Route path="/play/:id" component={Player} />
        <Route path="/order/:type/:id/:subId?" component={Order} />
        <Route path="/crowd" component={CrowdList} />
        <Route path="/crowd/:id" component={CrowdDetail} />
        <Route path="/learn" component={CourseList} />
        <Route path="/learn/:id" component={CourseDetail} />
        <Route path="/user" component={UserPage} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

// Note on theming:
// - Choose defaultTheme based on your design (light or dark background)
// - Update the color palette in index.css to match
// - If you want switchable themes, add `switchable` prop and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <AppRouter />
        </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

