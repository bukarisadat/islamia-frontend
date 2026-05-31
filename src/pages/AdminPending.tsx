import { useLocation, Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Clock } from "lucide-react";

const AdminPending = () => {
  const location = useLocation();
  const email = location.state?.email || "your email";

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <img src={logo} alt="Logo" className="mx-auto h-14 mb-2" />
          <h1 className="text-2xl font-bold">Request Submitted</h1>
          <p className="text-sm text-muted-foreground">Allāhul Musta'ān Institute Management</p>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock size={32} className="text-primary" />
            </div>
          </div>
          <div className="text-center space-y-3">
            <h2 className="font-heading font-bold text-foreground text-lg">Awaiting Approval</h2>
            <p className="text-sm text-muted-foreground">Your sub-admin request has been submitted successfully. The Super Admin will review your request.</p>
            <p className="text-sm text-muted-foreground">An email will be sent to <span className="font-semibold text-foreground">{email}</span> once your account is approved.</p>
            <p className="text-sm text-muted-foreground">You can close this page and wait for the approval email.</p>
          </div>
        </div>
        <div className="text-center mt-4">
          <Link to="/admin/login" className="text-sm text-muted-foreground">← Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPending;
