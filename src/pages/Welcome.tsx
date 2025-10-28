import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Target, Lock, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            Discover Your Cognitive Engine
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A 30-minute interactive challenge to map your thinking strengths
          </p>
        </div>

        {/* Value Propositions */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 animate-slide-up">
          <Card className="p-6 bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">5 Engaging Mini-Games</h3>
                <p className="text-muted-foreground">
                  Not boring bubble sheets—interactive challenges that make thinking fun
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Science-Backed</h3>
                <p className="text-muted-foreground">
                  Informed by cognitive psychology research and validated assessments
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Career-Focused</h3>
                <p className="text-muted-foreground">
                  Personalized career pathways tailored to your unique cognitive profile
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary-light/10 flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-primary-light" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Private & Safe</h3>
                <p className="text-muted-foreground">
                  Your results aren't shared with anyone—this is just for you
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Important Disclaimers */}
        <Card className="p-6 mb-8 border-2 border-muted bg-card/50">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Important:</strong> This is a thinking preferences exploration tool designed for personal career discovery. It is not an IQ test, clinical assessment, or employment screener. Results should not be used for hiring, diagnosis, or academic placement decisions.
          </p>
        </Card>

        {/* CTA */}
        <div className="text-center animate-scale-in">
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-gradient-primary hover:opacity-90 transition-opacity shadow-medium hover:shadow-strong"
            onClick={() => navigate("/instructions")}
          >
            Start the Circuit
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Takes approximately 25-30 minutes • Free assessment
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
