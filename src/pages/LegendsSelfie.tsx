import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PhotoInputStep from "@/components/legends/PhotoInputStep";
import CharacterSelectStep from "@/components/legends/CharacterSelectStep";
import ProcessingStep from "@/components/legends/ProcessingStep";
import ResultStep from "@/components/legends/ResultStep";

const steps = ["photo", "character", "processing", "result"] as const;
type Step = (typeof steps)[number];

const LegendsSelfie = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("photo");
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const handlePhotoSelected = useCallback((photoUrl: string) => {
    setUserPhoto(photoUrl);
    setStep("character");
  }, []);

  const handleCharacterSelected = useCallback((characterId: string) => {
    setSelectedCharacter(characterId);
  }, []);

  const handleGenerate = useCallback(() => {
    setStep("processing");
    // Simulate AI generation
    setTimeout(() => {
      setResultImage(userPhoto);
      setStep("result");
    }, 4000);
  }, [userPhoto]);

  const handleCreateAnother = useCallback(() => {
    setUserPhoto(null);
    setSelectedCharacter(null);
    setResultImage(null);
    setStep("photo");
  }, []);

  const handleBack = () => {
    if (step === "character") setStep("photo");
    else if (step === "photo") navigate("/home");
    else navigate("/home");
  };

  const stepIndex = steps.indexOf(step);

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Ambient orbs */}
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 240, height: 240, top: "5%", right: "-10%", background: "hsl(var(--healing-green))" }}
      />
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 180, height: 180, bottom: "20%", left: "-10%", background: "hsl(var(--gold))", animationDelay: "2s" }}
      />

      {/* Header */}
      {step !== "processing" && step !== "result" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 px-5 pt-12 pb-4"
        >
          <button onClick={handleBack} className="flex items-center gap-2 text-muted-foreground mb-4">
            <ArrowLeft size={20} />
            <span className="font-body text-sm">Back</span>
          </button>

          {/* Step indicator */}
          <div className="flex gap-2 mb-5">
            {["Photo", "Legend"].map((label, i) => (
              <div key={label} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="h-1 w-full rounded-full transition-all duration-500"
                  style={{
                    background: i <= stepIndex
                      ? "hsl(var(--primary))"
                      : "hsl(var(--border))",
                  }}
                />
                <span
                  className="font-body text-[10px] transition-colors duration-300"
                  style={{
                    color: i <= stepIndex
                      ? "hsl(var(--foreground))"
                      : "hsl(var(--muted-foreground))",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step content */}
      <div className="flex-1 relative z-10 overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === "photo" && (
            <motion.div key="photo" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
              <PhotoInputStep onPhotoSelected={handlePhotoSelected} />
            </motion.div>
          )}
          {step === "character" && (
            <motion.div key="character" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
              <CharacterSelectStep
                selected={selectedCharacter}
                onSelect={handleCharacterSelected}
                onGenerate={handleGenerate}
                userPhoto={userPhoto}
              />
            </motion.div>
          )}
          {step === "processing" && (
            <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <ProcessingStep />
            </motion.div>
          )}
          {step === "result" && (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <ResultStep
                resultImage={resultImage}
                onCreateAnother={handleCreateAnother}
                onGoHome={() => navigate("/home")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LegendsSelfie;
