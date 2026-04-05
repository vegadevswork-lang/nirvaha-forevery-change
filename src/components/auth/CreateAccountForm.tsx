import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateAccountForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirm: "", phone: "",
  });

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Signup logic placeholder
  };

  const fieldClass = "glass-input pl-10";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="block text-xs font-body font-medium text-foreground mb-1.5 ml-1">Full Name</label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" className={fieldClass} placeholder="Your full name" value={form.name} onChange={(e) => update("name", e.target.value)} required />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-body font-medium text-foreground mb-1.5 ml-1">Email</label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="email" className={fieldClass} placeholder="your@email.com" value={form.email} onChange={(e) => update("email", e.target.value)} required />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-xs font-body font-medium text-foreground mb-1.5 ml-1">Password</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type={showPassword ? "text" : "password"} className={`${fieldClass} pr-10`} placeholder="Create a password" value={form.password} onChange={(e) => update("password", e.target.value)} required />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" aria-label={showPassword ? "Hide password" : "Show password"}>
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-xs font-body font-medium text-foreground mb-1.5 ml-1">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type={showConfirm ? "text" : "password"} className={`${fieldClass} pr-10`} placeholder="Confirm your password" value={form.confirm} onChange={(e) => update("confirm", e.target.value)} required />
          <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" aria-label={showConfirm ? "Hide password" : "Show password"}>
            {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Phone (optional) */}
      <div>
        <label className="block text-xs font-body font-medium text-foreground mb-1.5 ml-1">
          Phone <span className="text-muted-foreground">(optional)</span>
        </label>
        <div className="relative">
          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="tel" className={fieldClass} placeholder="+91 00000 00000" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
        </div>
      </div>

      {/* Terms */}
      <label className="flex items-start gap-2.5 cursor-pointer">
        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="h-4 w-4 rounded border-border accent-primary mt-0.5" required />
        <span className="text-xs font-body text-muted-foreground leading-relaxed">
          I agree to the{" "}
          <button type="button" onClick={() => navigate("/terms-of-service")} className="text-primary underline">Terms of Service</button>{" "}
          and{" "}
          <button type="button" onClick={() => navigate("/privacy-policy")} className="text-primary underline">Privacy Policy</button>
        </span>
      </label>

      {/* CTA */}
      <button type="submit" className="btn-primary mt-2">
        Create Account
      </button>

      <p className="trust-text text-center">
        Start your personalized wellness journey
      </p>
    </form>
  );
};

export default CreateAccountForm;
