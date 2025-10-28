import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Headphones, Laptop, Clock, Coffee, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAssessment } from "@/context/AssessmentContext";

const Instructions = () => {
  const navigate = useNavigate();
  const { startSession } = useAssessment();

  const handleStartAssessment = () => {
    startSession();
    navigate("/game/decoder");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to the <span className="gradient-text">Cognitive Circuit</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Let's set you up for success
          </p>
        </div>

        {/* What to Expect */}
        <Card className="p-8 mb-8 bg-gradient-card shadow-medium animate-slide-up">
          <h2 className="text-2xl font-bold mb-4">What to Expect</h2>
          <p className="text-lg text-muted-foreground mb-6">
            You'll complete 5 mini-games, each measuring a different aspect of how you think. Each game takes 3-5 minutes.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-1" />
              <p className="text-muted-foreground">
                Read each game's instructions carefully (there's a practice round!)
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-1" />
              <p className="text-muted-foreground">
                Answer as accurately as you can—but don't overthink it
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-1" />
              <p className="text-muted-foreground">
                Use the full time available if you need it
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-1" />
              <p className="text-muted-foreground">
                Take a break between games if you need to
              </p>
            </div>
          </div>
        </Card>

        {/* Tips for Best Results */}
        <Card className="p-8 mb-8 bg-gradient-card shadow-medium animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-bold mb-6">Tips for Best Results</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Headphones className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Quiet Space</h3>
                <p className="text-sm text-muted-foreground">
                  Find a distraction-free environment
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Laptop className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Desktop Preferred</h3>
                <p className="text-sm text-muted-foreground">
                  Mobile works, but laptop is recommended
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-success" />
              </div>
            <div>
              <h3 className="font-semibold mb-1">25-30 Minutes</h3>
              <p className="text-sm text-muted-foreground">
                Set aside uninterrupted time
              </p>
            </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
                <Coffee className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Stay Relaxed</h3>
                <p className="text-sm text-muted-foreground">
                  This reveals your style, not your worth
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-gradient-primary hover:opacity-90 transition-opacity shadow-medium"
            onClick={handleStartAssessment}
          >
            I'm Ready — Start Game 1: The Decoder
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
