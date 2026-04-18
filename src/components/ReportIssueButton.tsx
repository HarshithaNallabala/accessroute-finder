import { useState } from "react";
import { AlertTriangle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";

export function ReportIssueButton() {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!location || !description) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    toast({ title: "Issue Reported!", description: "Thank you for helping improve accessibility." });
    setLocation("");
    setDescription("");
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="gap-2 border-warning text-warning hover:bg-warning hover:text-warning-foreground font-medium h-12 px-6 text-base"
      >
        <AlertTriangle className="w-5 h-5" />
        Report Accessibility Issue
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl border border-border shadow-elevated p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-bold text-foreground text-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  Report Issue
                </h3>
                <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-muted" aria-label="Close">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              <div className="space-y-4">
                <Input
                  placeholder="Location (e.g., Main Street crossing)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="h-12 text-base"
                />
                <Textarea
                  placeholder="Describe the accessibility issue..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px] text-base"
                />
                <Button onClick={handleSubmit} className="w-full h-12 gradient-hero text-primary-foreground border-0 text-base font-medium gap-2">
                  <Send className="w-5 h-5" />
                  Submit Report
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
