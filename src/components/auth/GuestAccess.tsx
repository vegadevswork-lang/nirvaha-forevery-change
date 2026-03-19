import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GuestAccess = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-5 text-center">
      <button onClick={() => navigate("/onboarding")} className="btn-guest flex items-center justify-center gap-2 mx-auto">
        <Sparkles className="h-4 w-4 text-gold" />
        Join as a Guest
      </button>
      <p className="trust-text mt-3 max-w-xs mx-auto leading-relaxed">
        Explore Nirvaha instantly with limited access. You can create an account anytime to save your journey.
      </p>
    </div>
  );
};

export default GuestAccess;
