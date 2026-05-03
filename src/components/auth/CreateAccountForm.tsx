import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { createAccountSchema } from "@/lib/auth-validation";

type FieldErrors = Partial<Record<"name" | "email" | "password" | "confirm" | "phone" | "agreed", string>>;

const CreateAccountForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirm: "", phone: "",
  });

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = createAccountSchema.safeParse({ ...form, agreed });
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error(result.error.issues[0]?.message ?? "Please check your details");
      return;
    }
    setErrors({});
    toast.info("Demo mode — account creation is not yet connected to a backend.");
  };

  const fieldClass = "glass-input pl-10";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="block text-xs font-body font-medium text-foreground mb-1.5 ml-1">Full Name</label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" className={fieldClass} placeholder="Your full name" value={form.name} onChange={(e) => update("name", e.target.value)} maxLength={100} autoComplete="name" aria-invalid={!!errors.name} required />
        </div>
        {errors.name && <p className="mt-1 ml-1 text-xs text-destructive font-body">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-body font-medium text-foreground mb-1.5 ml-1">Email</label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="email" className={fieldClass} placeholder="your@email.com" value={form.email} onChange={(e) => update("email", e.target.value)} maxLength={255} autoComplete="email" aria-invalid={!!errors.email} required />
        </div>
        {errors.email && <p className="mt-1 ml-1 text-xs text-destructive font-body">{errors.email}</p>}
      </div>

      {/* Password */}
      <div>
        <label className="block text-xs font-body font-medium text-foreground mb-1.5 ml-1">Password</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type={showPassword ? "text" : "password"} className={`${fieldClass} pr-10`} placeholder="At least 8 characters" value={form.password} onChange={(e) => update("password", e.target.value)} maxLength={72} autoComplete="new-password" aria-invalid={!!errors.password} required />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" aria-label={showPassword ? "Hide password" : "Show password"}>
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && <p className="mt-1 ml-1 text-xs text-destructive font-body">{errors.password}</p>}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-xs font-body font-medium text-foreground mb-1.5 ml-1">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type={showConfirm ? "text" : "password"} className={`${fieldClass} pr-10`} placeholder="Confirm your password" value={form.confirm} onChange={(e) => update("confirm", e.target.value)} maxLength={72} autoComplete="new-password" aria-invalid={!!errors.confirm} required />
          <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" aria-label={showConfirm ? "Hide password" : "Show password"}>
            {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.confirm && <p className="mt-1 ml-1 text-xs text-destructive font-body">{errors.confirm}</p>}
      </div>

      {/* Phone (optional) */}
      <div>
        <label className="block text-xs font-body font-medium text-foreground mb-1.5 ml-1">
          Phone <span className="text-muted-foreground">(optional)</span>
        </label>
        <div className="relative">
          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="tel" className={fieldClass} placeholder="+91 00000 00000" value={form.phone} onChange={(e) => update("phone", e.target.value)} maxLength={20} autoComplete="tel" aria-invalid={!!errors.phone} />
        </div>
        {errors.phone && <p className="mt-1 ml-1 text-xs text-destructive font-body">{errors.phone}</p>}
      </div>

      {/* Terms */}
      <div>
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="h-4 w-4 rounded border-border accent-primary mt-0.5" aria-invalid={!!errors.agreed} />
          <span className="text-xs font-body text-muted-foreground leading-relaxed">
            I agree to the{" "}
            <button type="button" onClick={() => navigate("/terms-of-service")} className="text-primary underline">Terms of Service</button>{" "}
            and{" "}
            <button type="button" onClick={() => navigate("/privacy-policy")} className="text-primary underline">Privacy Policy</button>
          </span>
        </label>
        {errors.agreed && <p className="mt-1 ml-1 text-xs text-destructive font-body">{errors.agreed}</p>}
      </div>

      {/* CTA */}
      <InteractiveHoverButton
        type="submit"
        variant="default"
        hoverContent="Begin your journey →"
        className="w-full h-12 rounded-2xl mt-2"
      >
        Create Account
      </InteractiveHoverButton>

      <p className="trust-text text-center">
        Demo only — your details are validated locally and not stored
      </p>
    </form>
  );
};

export default CreateAccountForm;
