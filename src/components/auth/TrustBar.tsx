import { Heart, Lock, ShieldCheck } from "lucide-react";

const TrustBar = () => {
  return (
    <div className="mt-8 flex items-center justify-center gap-6 flex-wrap">
      <div className="flex items-center gap-1.5 trust-text">
        <ShieldCheck className="h-3.5 w-3.5" />
        <span>We respect your privacy</span>
      </div>
      <div className="flex items-center gap-1.5 trust-text">
        <Lock className="h-3.5 w-3.5" />
        <span>Your reflections stay with you</span>
      </div>
      <div className="flex items-center gap-1.5 trust-text">
        <Heart className="h-3.5 w-3.5" />
        <span>No spam. Just your space.</span>
      </div>
    </div>
  );
};

export default TrustBar;
