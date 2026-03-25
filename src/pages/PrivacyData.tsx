import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Trash2, Shield, Eye, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const PrivacyData = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [analytics, setAnalytics] = useState(true);
  const [personalization, setPersonalization] = useState(true);

  const handleExport = () => {
    toast({ title: "Export started", description: "Your data will be ready for download shortly." });
  };

  const handleDelete = () => {
    toast({ title: "Request submitted", description: "Your data deletion request is being processed." });
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex items-center gap-3 px-4 pt-6 pb-4">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate("/profile")}>
          <ArrowLeft size={20} className="text-foreground" />
        </motion.button>
        <h1 className="font-display text-xl font-semibold text-foreground">Privacy & Data</h1>
      </div>

      <div className="flex-1 px-4 space-y-5 pb-8">
        {/* Nirvaha's commitment */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4"
          style={{ background: "linear-gradient(135deg, hsla(var(--healing-green) / 0.06), hsla(var(--gold) / 0.04))" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Shield size={16} className="text-primary" />
            <p className="font-display text-sm font-semibold text-foreground">Nirvaha's Promise</p>
          </div>
          <p className="font-body text-xs text-muted-foreground leading-relaxed">
            Your inner world is sacred. We never sell your data, and your journal entries and reflections are encrypted end-to-end. Your healing journey stays yours.
          </p>
        </motion.div>

        {/* Privacy controls */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <p className="font-body text-[10px] uppercase tracking-widest text-muted-foreground mb-2 px-1">Privacy Controls</p>
          <div className="glass-card overflow-hidden divide-y divide-border/50">
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3 flex-1 mr-3">
                <Eye size={16} className="text-muted-foreground" />
                <div>
                  <p className="font-body text-sm text-foreground">Usage analytics</p>
                  <p className="font-body text-xs text-muted-foreground">Help improve Nirvaha</p>
                </div>
              </div>
              <Switch checked={analytics} onCheckedChange={setAnalytics} />
            </div>
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3 flex-1 mr-3">
                <Lock size={16} className="text-muted-foreground" />
                <div>
                  <p className="font-body text-sm text-foreground">Personalization</p>
                  <p className="font-body text-xs text-muted-foreground">Tailor wisdom to your journey</p>
                </div>
              </div>
              <Switch checked={personalization} onCheckedChange={setPersonalization} />
            </div>
          </div>
        </motion.div>

        {/* Data management */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <p className="font-body text-[10px] uppercase tracking-widest text-muted-foreground mb-2 px-1">Your Data</p>
          <div className="glass-card overflow-hidden divide-y divide-border/50">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleExport}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
            >
              <Download size={16} className="text-primary" />
              <div>
                <p className="font-body text-sm text-foreground">Export my data</p>
                <p className="font-body text-xs text-muted-foreground">Download all your journal entries & reflections</p>
              </div>
            </motion.button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
                >
                  <Trash2 size={16} className="text-destructive" />
                  <div>
                    <p className="font-body text-sm text-destructive">Delete all my data</p>
                    <p className="font-body text-xs text-muted-foreground">This action cannot be undone</p>
                  </div>
                </motion.button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-2xl mx-4">
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-display">Delete all data?</AlertDialogTitle>
                  <AlertDialogDescription className="font-body">
                    This will permanently delete your journal entries, reflections, wellness data, and account. This cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="font-body">Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground font-body">
                    Delete Everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyData;
