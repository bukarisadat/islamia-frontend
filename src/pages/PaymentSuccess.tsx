import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const PaymentSuccess = () => {
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Give webhook time to process
    const timer = setTimeout(() => setChecking(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full bg-card rounded-2xl border border-border shadow-2xl p-10 flex flex-col items-center gap-6 text-center">
        <img src={logo} alt="Logo" className="h-14" />

        {checking ? (
          <>
            <Loader2 size={44} className="text-primary animate-spin" />
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground">Confirming Payment...</h2>
              <p className="text-sm text-muted-foreground mt-1">Please wait while we verify your payment.</p>
            </div>
          </>
        ) : (
          <>
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle2 size={44} className="text-green-600" />
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground">Payment Successful!</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Your index number has been generated and sent to your email and phone number. Use it to log in to the Student Portal.
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <Link to="/student/login">
                <Button className="w-full">Go to Student Portal</Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="w-full">Back to Home</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
