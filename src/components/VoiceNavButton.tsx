import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export function VoiceNavButton() {
  const [active, setActive] = useState(false);

  const toggle = () => {
    setActive(!active);
    toast({
      title: active ? "Voice Navigation Off" : "Voice Navigation On",
      description: active
        ? "Audio guidance has been disabled."
        : "Turn-by-turn audio guidance is now active.",
    });
  };

  return (
    <Button
      onClick={toggle}
      variant={active ? "default" : "outline"}
      className={`gap-2 h-12 px-6 text-base font-medium ${
        active
          ? "gradient-hero text-primary-foreground border-0 shadow-soft"
          : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
      }`}
    >
      {active ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      Voice Navigation
    </Button>
  );
}
