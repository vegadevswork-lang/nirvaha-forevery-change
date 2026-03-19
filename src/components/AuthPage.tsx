import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import nirvahaLogo from "@/assets/nirvaha-logo.png";
import SignInForm from "./auth/SignInForm";
import CreateAccountForm from "./auth/CreateAccountForm";
import GuestAccess from "./auth/GuestAccess";
import TrustBar from "./auth/TrustBar";
import Particles from "./Particles";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<"signin" | "create">("signin");

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-8 overflow-hidden bg-background">
      {/* Particles background */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      {/* Ambient orbs */}
      <div
        className="ambient-orb animate-pulse-soft"
        style={{
          width: 340, height: 340,
          top: "10%", left: "5%",
          background: "hsl(var(--healing-green))",
        }}
      />
      <div
        className="ambient-orb animate-pulse-soft"
        style={{
          width: 280, height: 280,
          bottom: "5%", right: "8%",
          background: "hsl(var(--gold))",
          animationDelay: "2s",
        }}
      />
      <div
        className="ambient-orb animate-float"
        style={{
          width: 180, height: 180,
          top: "50%", right: "25%",
          background: "hsl(var(--sage))",
          opacity: 0.2,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo & Welcome */}
        <div className="text-center mb-8">
          <img
            src={nirvahaLogo}
            alt="Nirvaha"
            className="h-16 mx-auto mb-4"
          />
          <motion.p
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-display text-lg text-muted-foreground italic"
          >
            {activeTab === "signin"
              ? "Welcome back to your inner balance"
              : "Begin your journey with clarity and calm"}
          </motion.p>
        </div>

        {/* Glass Card */}
        <div className="glass-card p-6 sm:p-8">
          {/* Tab Switcher */}
          <div className="tab-switcher mb-6">
            <button
              onClick={() => setActiveTab("signin")}
              className={`tab-item ${activeTab === "signin" ? "active" : ""}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab("create")}
              className={`tab-item ${activeTab === "create" ? "active" : ""}`}
            >
              Create Account
            </button>
          </div>

          {/* Form Area */}
          <AnimatePresence mode="wait">
            {activeTab === "signin" ? (
              <motion.div
                key="signin"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.3 }}
              >
                <SignInForm />
              </motion.div>
            ) : (
              <motion.div
                key="create"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3 }}
              >
                <CreateAccountForm />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Guest Access */}
        <GuestAccess />

        {/* Trust Bar */}
        <TrustBar />
      </motion.div>
    </div>
  );
};

export default AuthPage;
