import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import StudentPortal from "./pages/StudentPortal.tsx";
import AdminPanel from "./pages/AdminPanel.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminSignup from "./pages/AdminSignup.tsx";
import AdminForgot from "./pages/AdminForgot.tsx";
import AdminPending from "./pages/AdminPending.tsx";
import StudentLogin from "./pages/StudentLogin.tsx";
import StudentSignup from "./pages/StudentSignup.tsx";
import StudentForgot from "./pages/StudentForgot.tsx";
import NotFound from "./pages/NotFound.tsx";
import PaymentSuccess from "./pages/PaymentSuccess.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/student" element={<StudentPortal />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/signup" element={<StudentSignup />} />
          <Route path="/student/forgot" element={<StudentForgot />} />

          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/forgot" element={<AdminForgot />} />
          <Route path="/admin/pending" element={<AdminPending />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
