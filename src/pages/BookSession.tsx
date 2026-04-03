import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Video, Phone, MessageCircle, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { mentors } from "@/data/companionData";
import { toast } from "sonner";

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "2:00 PM", "3:00 PM", "4:00 PM",
  "5:00 PM", "6:00 PM", "7:00 PM",
  "8:00 PM",
];

const BookSession = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mentor = mentors.find(m => m.id === id);
  const sessionIdx = parseInt(searchParams.get("session") || "0");

  const [step, setStep] = useState(1); // 1: format, 2: date/time, 3: confirm
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  if (!mentor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-body text-muted-foreground">Mentor not found</p>
      </div>
    );
  }

  const session = mentor.sessionOptions[sessionIdx] || mentor.sessionOptions[0];
  const formatIcons: Record<string, any> = { Text: MessageCircle, Voice: Phone, Video: Video };

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const handleBook = () => {
    toast.success("Session booked!", {
      description: `Your ${session.duration} ${selectedFormat} session with ${mentor.name} is confirmed.`,
    });
    navigate("/companion");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="ambient-orb animate-pulse-soft"
        style={{ width: 180, height: 180, top: "5%", right: "-10%", background: "hsl(var(--healing-green))" }}
      />

      <div className="overflow-y-auto pb-8 px-5 pt-12 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}
            className="w-10 h-10 rounded-2xl border flex items-center justify-center"
            style={{
              background: "hsla(var(--glass-bg))",
              borderColor: "hsla(var(--glass-border))",
            }}
          >
            <ArrowLeft size={18} className="text-foreground" />
          </motion.button>
          <div>
            <h1 className="font-display text-lg font-semibold text-foreground">Book Session</h1>
            <p className="font-body text-xs text-muted-foreground">Step {step} of 3</p>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className="flex-1 h-1 rounded-full transition-all"
              style={{
                background: s <= step ? "hsl(var(--primary))" : "hsla(var(--muted-foreground) / 0.2)",
              }}
            />
          ))}
        </div>

        {/* Mentor mini card */}
        <div className="glass-card p-3 flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: mentor.avatarGradient }}
          >
            <span className="text-sm font-display font-semibold" style={{ color: "hsl(var(--primary-foreground))" }}>
              {mentor.name.split(" ").map(n => n[0]).join("")}
            </span>
          </div>
          <div>
            <p className="font-body text-sm font-medium text-foreground">{mentor.name}</p>
            <p className="font-body text-xs text-muted-foreground">{session.duration} · ₹{session.price}</p>
          </div>
        </div>

        {/* Step 1: Format */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="font-display text-base font-semibold text-foreground mb-1">Choose your format</h2>
            <p className="font-body text-xs text-muted-foreground mb-4">
              Pick what feels most comfortable for you.
            </p>
            <div className="space-y-3">
              {mentor.formats.map(f => {
                const Icon = formatIcons[f] || MessageCircle;
                const isSelected = selectedFormat === f;
                return (
                  <motion.button
                    key={f}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedFormat(f)}
                    className={`w-full glass-card p-4 flex items-center gap-3 text-left transition-all ${
                      isSelected ? "ring-2" : ""
                    }`}
                    style={isSelected ? { borderColor: "hsl(var(--primary))", ringColor: "hsl(var(--primary))" } : {}}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: isSelected ? "hsl(var(--primary))" : "hsla(var(--healing-green) / 0.1)",
                      }}
                    >
                      <Icon size={18} style={{ color: isSelected ? "hsl(var(--primary-foreground))" : "hsl(var(--healing-green))" }} />
                    </div>
                    <div>
                      <span className="font-body text-sm font-medium text-foreground">{f}</span>
                      <p className="font-body text-[11px] text-muted-foreground">
                        {f === "Text" && "Async chat at your pace"}
                        {f === "Voice" && "Real-time voice conversation"}
                        {f === "Video" && "Face-to-face video session"}
                      </p>
                    </div>
                    {isSelected && (
                      <Check size={16} className="ml-auto" style={{ color: "hsl(var(--primary))" }} />
                    )}
                  </motion.button>
                );
              })}
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => selectedFormat && setStep(2)}
              disabled={!selectedFormat}
              className="btn-primary mt-6 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              Continue
              <ChevronRight size={16} />
            </motion.button>
          </motion.div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="font-display text-base font-semibold text-foreground mb-1">Pick a date & time</h2>
            <p className="font-body text-xs text-muted-foreground mb-4">
              Take your time. Book when it feels right.
            </p>

            {/* Date picker */}
            <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
              {dates.map((d, i) => {
                const isSelected = selectedDate === i;
                const dayName = d.toLocaleDateString("en", { weekday: "short" });
                const dayNum = d.getDate();
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(i)}
                    className={`flex flex-col items-center px-3.5 py-2.5 rounded-2xl text-center transition-all flex-shrink-0 ${
                      isSelected ? "bg-primary text-primary-foreground" : "glass-card"
                    }`}
                  >
                    <span className={`text-[10px] font-body uppercase ${isSelected ? "opacity-80" : "text-muted-foreground"}`}>
                      {dayName}
                    </span>
                    <span className={`text-lg font-display font-semibold ${isSelected ? "" : "text-foreground"}`}>
                      {dayNum}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Time slots */}
            {selectedDate !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="font-display text-xs font-semibold text-foreground mb-2">Available times</h3>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map(t => {
                    const isSelected = selectedTime === t;
                    return (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`py-2.5 rounded-xl text-xs font-body font-medium transition-all ${
                          isSelected ? "bg-primary text-primary-foreground" : "glass-card text-foreground"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => selectedDate !== null && selectedTime && setStep(3)}
              disabled={selectedDate === null || !selectedTime}
              className="btn-primary mt-6 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              Continue
              <ChevronRight size={16} />
            </motion.button>
          </motion.div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="font-display text-base font-semibold text-foreground mb-4">Confirm your session</h2>

            <div className="glass-card p-4 space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="font-body text-xs text-muted-foreground">Mentor</span>
                <span className="font-body text-sm font-medium text-foreground">{mentor.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-xs text-muted-foreground">Duration</span>
                <span className="font-body text-sm font-medium text-foreground">{session.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-xs text-muted-foreground">Format</span>
                <span className="font-body text-sm font-medium text-foreground">{selectedFormat}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-xs text-muted-foreground">Date</span>
                <span className="font-body text-sm font-medium text-foreground">
                  {selectedDate !== null && dates[selectedDate].toLocaleDateString("en", { weekday: "long", month: "short", day: "numeric" })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-xs text-muted-foreground">Time</span>
                <span className="font-body text-sm font-medium text-foreground">{selectedTime}</span>
              </div>
              <div className="border-t pt-3" style={{ borderColor: "hsla(var(--glass-border))" }}>
                <div className="flex justify-between">
                  <span className="font-body text-sm font-medium text-foreground">Total</span>
                  <span className="font-display text-lg font-semibold text-foreground">₹{session.price}</span>
                </div>
              </div>
            </div>

            <p className="font-body text-[11px] text-muted-foreground text-center mb-4">
              You can reschedule or cancel anytime — no pressure.
            </p>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleBook}
              className="btn-primary flex items-center justify-center gap-2"
            >
              <Calendar size={16} />
              Confirm & Book
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BookSession;
