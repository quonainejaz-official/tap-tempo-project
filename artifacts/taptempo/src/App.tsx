import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-provider";
import { Layout } from "@/components/layout";

import Home from "@/pages/home";
import TapTempoPage from "@/pages/tap-tempo";
import MetronomePage from "@/pages/metronome";
import BpmCalculatorPage from "@/pages/bpm-calculator";
import BpmToMsPage from "@/pages/bpm-to-ms";
import DelayTimeCalculatorPage from "@/pages/delay-time-calculator";
import TempoMarkingsPage from "@/pages/tempo-markings";
import BeatsPerBarCalculatorPage from "@/pages/beats-per-bar-calculator";
import BlogPage from "@/pages/blog";
import BlogPostPage from "@/pages/blog-post";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/tap-tempo" component={TapTempoPage} />
        <Route path="/metronome" component={MetronomePage} />
        <Route path="/bpm-calculator" component={BpmCalculatorPage} />
        <Route path="/bpm-to-ms" component={BpmToMsPage} />
        <Route path="/delay-time-calculator" component={DelayTimeCalculatorPage} />
        <Route path="/tempo-markings" component={TempoMarkingsPage} />
        <Route path="/beats-per-bar-calculator" component={BeatsPerBarCalculatorPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/blog/:slug" component={BlogPostPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="taptempo-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
