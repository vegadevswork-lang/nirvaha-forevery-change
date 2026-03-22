import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera, ImagePlus, RotateCcw } from "lucide-react";

interface Props {
  onPhotoSelected: (url: string) => void;
}

const PhotoInputStep = ({ onPhotoSelected }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleConfirm = () => {
    if (preview) onPhotoSelected(preview);
  };

  return (
    <div className="px-5 pb-8">
      <h1 className="font-display text-2xl text-foreground font-semibold mb-1">
        Capture a Moment with a Legend
      </h1>
      <p className="font-body text-sm text-muted-foreground mb-6">
        Upload a photo or snap a selfie to begin your journey.
      </p>

      {/* Preview area */}
      <motion.div
        layout
        className="glass-card aspect-[3/4] rounded-3xl mb-6 flex items-center justify-center overflow-hidden relative"
      >
        {preview ? (
          <>
            <img src={preview} alt="Your photo" className="w-full h-full object-cover" />
            <button
              onClick={() => { setPreview(null); }}
              className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "hsla(var(--glass-bg))", backdropFilter: "blur(12px)" }}
            >
              <RotateCcw size={16} className="text-foreground" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: "hsla(var(--healing-green) / 0.1)" }}
            >
              <Camera size={32} className="text-primary" />
            </div>
            <p className="font-body text-sm text-muted-foreground">Your photo will appear here</p>
          </div>
        )}
      </motion.div>

      {/* Inputs (hidden) */}
      <input ref={cameraInputRef} type="file" accept="image/*" capture="user" className="hidden" onChange={handleFile} />
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

      {!preview ? (
        <div className="flex flex-col gap-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => cameraInputRef.current?.click()}
            className="btn-primary flex items-center justify-center gap-2.5"
          >
            <Camera size={18} />
            Open Camera
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => fileInputRef.current?.click()}
            className="btn-guest flex items-center justify-center gap-2.5"
          >
            <ImagePlus size={18} />
            Upload from Gallery
          </motion.button>
        </div>
      ) : (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleConfirm}
          className="btn-primary"
        >
          Continue with this photo
        </motion.button>
      )}
    </div>
  );
};

export default PhotoInputStep;
