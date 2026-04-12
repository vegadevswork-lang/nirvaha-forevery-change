import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const GuestAccess = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-5 text-center">
      <InteractiveHoverButton
        variant="gold"
        onClick={() => navigate("/onboarding")}
        hoverContent="✨ Explore now"
        className="h-11 px-6 rounded-2xl mx-auto"
      >
        <Sparkles className="h-4 w-4 text-accent" />
        Join as a Guest
      </InteractiveHoverButton>
      <p className="trust-text mt-3 max-w-xs mx-auto leading-relaxed">
        Explore Nirvaha instantly with limited access. You can create an account anytime to save your journey.
      </p>
    </div>
  );
};

export default GuestAccess;
