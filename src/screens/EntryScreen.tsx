import { Mascot } from "@/components/Mascot";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

export function EntryScreen() {
  const { setScreen, setIsGuest } = useApp();

  const handleContinueAsGuest = () => {
    setIsGuest(true);
    setScreen("resolution-input");
  };

  const handleSignIn = () => {
    // For now, also go to resolution input (auth will be added later)
    setIsGuest(false);
    setScreen("resolution-input");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 animate-fade-in">
      <div className="flex flex-col items-center gap-6 max-w-sm w-full">
        <Mascot state="normal" size="lg" />
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Reality Check</h1>
          <p className="text-muted-foreground text-lg">
            Let's see if your New Year's resolution is... realistic.
          </p>
        </div>

        <div className="w-full space-y-3 mt-6">
          <Button 
            variant="hero" 
            className="w-full" 
            onClick={handleContinueAsGuest}
          >
            Continue as Guest
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </div>

        <p className="text-sm text-muted-foreground text-center mt-4">
          Don't worry — checking doesn't mean committing.
        </p>
      </div>
    </div>
  );
}
