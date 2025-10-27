import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Share2, Download, RotateCcw, Briefcase, BookOpen, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const navigate = useNavigate();

  // Sample data - would come from assessment results
  const archetype = "The Strategist";
  const scores = {
    logical: 88,
    verbal: 72,
    quantitative: 65,
    spatial: 58,
    attention: 70,
  };

  const radarPoints = [
    { factor: "Logical", score: scores.logical },
    { factor: "Verbal", score: scores.verbal },
    { factor: "Quantitative", score: scores.quantitative },
    { factor: "Spatial", score: scores.spatial },
    { factor: "Attention", score: scores.attention },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-primary mb-6">
            <Brain className="w-12 h-12 text-white" />
          </div>
          
          <div className="mb-4">
            <p className="text-sm font-semibold text-muted-foreground mb-2 tracking-wide uppercase">
              Your Cognitive Engine
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              You are <span className="gradient-text">{archetype}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              You excel at identifying patterns, solving complex problems, and thinking systematically
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <Button variant="default" size="lg" className="bg-gradient-primary hover:opacity-90">
              <Share2 className="w-5 h-5 mr-2" />
              Share My Results
            </Button>
            <Button variant="outline" size="lg">
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Cognitive Fingerprint */}
        <Card className="p-8 mb-8 bg-gradient-card shadow-medium animate-slide-up">
          <h2 className="text-2xl font-bold mb-6 text-center">Your Cognitive Fingerprint</h2>
          
          {/* Simplified Radar Display */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-square max-w-sm mx-auto w-full">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Background pentagon */}
                <polygon
                  points="100,20 180,70 160,150 40,150 20,70"
                  fill="hsl(var(--muted))"
                  fillOpacity="0.2"
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                />
                
                {/* Data pentagon */}
                <polygon
                  points={`
                    100,${100 - scores.logical * 0.8}
                    ${100 + scores.verbal * 0.69},${100 - scores.verbal * 0.25}
                    ${100 + scores.quantitative * 0.43},${100 + scores.quantitative * 0.65}
                    ${100 - scores.spatial * 0.43},${100 + scores.spatial * 0.65}
                    ${100 - scores.attention * 0.69},${100 - scores.attention * 0.25}
                  `}
                  fill="hsl(var(--primary))"
                  fillOpacity="0.3"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                />
                
                {/* Labels */}
                <text x="100" y="10" textAnchor="middle" className="fill-foreground text-xs font-semibold">
                  Logical
                </text>
                <text x="185" y="75" textAnchor="start" className="fill-foreground text-xs font-semibold">
                  Verbal
                </text>
                <text x="165" y="165" textAnchor="start" className="fill-foreground text-xs font-semibold">
                  Quant
                </text>
                <text x="35" y="165" textAnchor="end" className="fill-foreground text-xs font-semibold">
                  Spatial
                </text>
                <text x="15" y="75" textAnchor="end" className="fill-foreground text-xs font-semibold">
                  Attention
                </text>
              </svg>
            </div>

            <div className="space-y-4">
              {radarPoints.map((point) => (
                <div key={point.factor}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">{point.factor} Reasoning</span>
                    <span className="text-primary font-bold">{point.score}th percentile</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-gradient-primary h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${point.score}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {point.score >= 90 ? "Elite (Top 10%)" :
                     point.score >= 75 ? "Advanced (Top 25%)" :
                     point.score >= 50 ? "Proficient (Above Average)" :
                     "Developing"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Profile Description */}
        <Card className="p-8 mb-8 bg-gradient-card shadow-medium animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-bold mb-4">Your {archetype} Profile</h2>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              You're exceptionally skilled at identifying patterns, drawing inferences, and thinking systematically. When others see chaos, you see structure. You excel at troubleshooting complex problems, designing processes, and spotting logical inconsistencies.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Primary Strength: Logical Reasoning
                </h3>
                <p className="text-muted-foreground">
                  Your ability to analyze patterns and think systematically puts you in the top 12% of thinkers. You naturally break down complex problems into manageable components and identify the underlying logic.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-accent" />
                  Your Unique Edge
                </h3>
                <p className="text-muted-foreground">
                  While many people can follow established procedures, you excel at creating new systems and spotting flaws in existing ones. This makes you invaluable in strategy, analysis, and decision-making roles where novel problem-solving is required.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Career Pathways */}
        <Card className="p-8 mb-8 bg-gradient-card shadow-medium animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-primary" />
            Career Pathways for {archetype}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "Data Scientist",
                match: 92,
                salary: "$95K - $160K",
                description: "Analyze complex datasets to extract insights and build predictive models",
              },
              {
                title: "Strategy Consultant",
                match: 89,
                salary: "$85K - $180K",
                description: "Solve business problems through systematic analysis and logical frameworks",
              },
              {
                title: "Software Architect",
                match: 87,
                salary: "$120K - $200K",
                description: "Design complex software systems with optimal structure and logic",
              },
              {
                title: "Operations Research Analyst",
                match: 85,
                salary: "$70K - $130K",
                description: "Use mathematical models to help organizations solve problems",
              },
            ].map((career) => (
              <Card key={career.title} className="p-6 border-2 hover:border-primary transition-all hover:shadow-medium">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-lg">{career.title}</h3>
                  <span className="text-sm font-semibold text-primary">{career.match}% Match</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{career.description}</p>
                <p className="text-sm font-semibold text-success">{career.salary}</p>
              </Card>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-6">
            View All 15 Career Matches
          </Button>
        </Card>

        {/* Next Steps */}
        <Card className="p-8 bg-gradient-card shadow-medium animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-2xl font-bold mb-6">What's Next?</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="font-bold mb-2">🎯 Explore</h3>
              <p className="text-sm text-muted-foreground">
                Set up 2-3 informational interviews with professionals in your top career matches
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">📚 Develop</h3>
              <p className="text-sm text-muted-foreground">
                Strengthen your quantitative skills with online courses to unlock more opportunities
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">💬 Reflect</h3>
              <p className="text-sm text-muted-foreground">
                Journal: "When do I feel most energized at work? Does my current role leverage my logical strengths?"
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center pt-6 border-t">
            <Button variant="outline" onClick={() => navigate("/")}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Assessment
            </Button>
            <Button variant="default" className="bg-gradient-primary hover:opacity-90">
              <Download className="w-4 h-4 mr-2" />
              Download Full Report
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Results;
