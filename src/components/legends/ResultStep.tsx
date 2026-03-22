import { motion } from "framer-motion";
import { Download, Share2, RefreshCw, Home } from "lucide-react";

interface Props {
  resultImage: string | null;
  onCreateAnother: () => void;
  onGoHome: () => void;
}

const ResultStep = ({ resultImage, onCreateAnother, onGoHome }: Props) => {
  const handleDownload = () => {
    if (!resultImage) return;
    const a = document.createElement("a");
    a.href = resultImage;
    a.download = "nirvaha-legends-selfie.jpg";
    a.click();
  };

  const handleShare = async () => {
    if (!resultImage) return;
    try {
      if (navigator.share) {
        const blob = await fetch(resultImage).then((r) => r.blob());
        const file = new File([blob], "nirvaha-selfie.jpg", { type: "image/jpeg" });
        await navigator.share({ files: [file], title: "My Nirvaha Legends Selfie" });
      }
    } catch {
      // Sharing cancelled or not supported
    }
  };

  return (
    <div className="px-5 pb-8 pt-12 flex flex-col items-center">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-2xl text-foreground font-semibold mb-1 text-center"
      >
        Your Nirvaha Moment
      </motion.h2>
      <p className="font-body text-sm text-muted-foreground mb-6 text-center">
        A reflection of your inner wisdom
      </p>

      {/* Result image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full aspect-[3/4] rounded-3xl overflow-hidden mb-8 relative"
        style={{
          boxShadow: "0 20px 60px hsla(var(--healing-green) / 0.15), 0 8px 24px hsla(var(--gold) / 0.1)",
        }}
      >
        {resultImage && (
          <img src={resultImage} alt="Nirvaha Legends Selfie" className="w-full h-full object-cover" />
        )}
        {/* Overlay branding */}
        <div
          className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between"
          style={{ background: "linear-gradient(to top, hsla(0 0% 0% / 0.4), transparent)" }}
        >
          <span className="font-display text-sm text-white/80 tracking-wide">Nirvaha</span>
          <span className="font-body text-[10px] text-white/60">Legends Selfie</span>
        </div>
      </motion.div>

      {/* Action buttons */}
      <div className="w-full flex gap-3 mb-4">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleDownload}
          className="btn-primary flex-1 flex items-center justify-center gap-2"
        >
          <Download size={16} />
          Download
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleShare}
          className="btn-guest flex-1 flex items-center justify-center gap-2"
        >
          <Share2 size={16} />
          Share
        </motion.button>
      </div>

      <div className="w-full flex gap-3">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onCreateAnother}
          className="btn-guest flex-1 flex items-center justify-center gap-2"
        >
          <RefreshCw size={16} />
          Create Another
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onGoHome}
          className="btn-guest flex-1 flex items-center justify-center gap-2"
        >
          <Home size={16} />
          Home
        </motion.button>
      </div>
    </div>
  );
};

export default ResultStep;
