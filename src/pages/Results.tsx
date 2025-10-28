import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Share2, 
  Download, 
  RotateCcw, 
  Briefcase, 
  BookOpen, 
  Target, 
  TrendingUp,
  Star,
  Award,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Zap,
  Lightbulb,
  BarChart3,
  PieChart,
  Activity,
  Eye,
  BrainCircuit,
  Rocket,
  Shield,
  Sparkles
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAssessment } from "@/context/AssessmentContext";
import { calculateCognitiveProfile, determineArchetype, calculateOverallScore, getPercentileRanking } from "@/utils/cognitiveProfiling";
import { useEffect, useState } from "react";

const Results = () => {
  const navigate = useNavigate();
  const { state, resetSession } = useAssessment();
  const [archetype, setArchetype] = useState<any>(null);
  const [cognitiveProfile, setCognitiveProfile] = useState<any>(null);
  const [overallScore, setOverallScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (state.session?.gameResults && state.session.gameResults.length > 0) {
      // Calculate cognitive profile from game results
      const profile = calculateCognitiveProfile(state.session.gameResults);
      setCognitiveProfile(profile);
      
      // Determine archetype
      const userArchetype = determineArchetype(profile);
      setArchetype(userArchetype);
      
      // Calculate overall score
      const score = calculateOverallScore(profile);
      setOverallScore(score);
    } else {
      // Use fallback data when no game results are available
      const fallbackProfile = {
        logical: 75,
        verbal: 70,
        quantitative: 80,
        spatial: 65,
        attention: 72,
      };
      setCognitiveProfile(fallbackProfile);
      
      const fallbackArchetype = determineArchetype(fallbackProfile);
      setArchetype(fallbackArchetype);
      
      const fallbackScore = calculateOverallScore(fallbackProfile);
      setOverallScore(fallbackScore);
    }
    setIsLoading(false);
  }, [state.session?.gameResults]);

  // Fallback data if no session exists
  const fallbackArchetype = {
    name: "The Strategist",
    description: "You excel at identifying patterns, solving complex problems, and thinking systematically. Your analytical mind combined with strong quantitative skills makes you a natural problem-solver who thrives in data-driven environments.",
    primaryStrength: "Logical Reasoning",
    secondaryStrength: "Quantitative Analysis",
    careerMatches: [
      {
        title: 'Data Scientist',
        matchPercentage: 92,
        salary: '$95K - $160K',
        description: 'Analyze complex datasets to extract insights and build predictive models',
        requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
        growthOutlook: 'High',
        icon: '📊'
      },
      {
        title: 'Strategy Consultant',
        matchPercentage: 89,
        salary: '$85K - $180K',
        description: 'Solve business problems through systematic analysis and logical frameworks',
        requiredSkills: ['Analytics', 'Problem Solving', 'Communication', 'Excel'],
        growthOutlook: 'High',
        icon: '🎯'
      },
      {
        title: 'Software Architect',
        matchPercentage: 87,
        salary: '$120K - $200K',
        description: 'Design complex software systems with optimal structure and logic',
        requiredSkills: ['System Design', 'Programming', 'Architecture', 'Leadership'],
        growthOutlook: 'High',
        icon: '🏗️'
      },
      {
        title: 'Operations Research Analyst',
        matchPercentage: 85,
        salary: '$70K - $130K',
        description: 'Use mathematical models to help organizations solve problems',
        requiredSkills: ['Mathematics', 'Optimization', 'Statistics', 'Modeling'],
        growthOutlook: 'Medium',
        icon: '📈'
      }
    ],
    developmentAreas: ["Verbal Communication", "Spatial Visualization"],
    personalityTraits: ["Analytical", "Systematic", "Problem-Solver", "Detail-Oriented"],
  };

  const fallbackScores = {
    logical: 88,
    verbal: 72,
    quantitative: 85,
    spatial: 58,
    attention: 70,
  };

  const currentArchetype = archetype || fallbackArchetype;
  const scores = cognitiveProfile || fallbackScores;

  const radarPoints = [
    { factor: "Logical", score: scores.logical || 75, icon: BrainCircuit, color: "text-blue-500" },
    { factor: "Verbal", score: scores.verbal || 70, icon: BookOpen, color: "text-green-500" },
    { factor: "Quantitative", score: scores.quantitative || 80, icon: BarChart3, color: "text-purple-500" },
    { factor: "Spatial", score: scores.spatial || 65, icon: Eye, color: "text-orange-500" },
    { factor: "Attention", score: scores.attention || 72, icon: Target, color: "text-red-500" },
  ];

  const handleRetakeAssessment = () => {
    resetSession();
    navigate('/');
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Card className="p-8 text-center bg-gradient-card shadow-2xl border-0">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Brain className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Calculating Your Results...</h2>
          <p className="text-muted-foreground mb-6">Please wait while we analyze your cognitive performance.</p>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent mb-8 shadow-2xl">
            <Brain className="w-16 h-16 text-white" />
          </div>
          
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-semibold">
              <Sparkles className="w-4 h-4 mr-2" />
              Your Cognitive Assessment Results
            </Badge>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              You are <span className="gradient-text">{currentArchetype.name}</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {currentArchetype.description}
            </p>
          </div>

          {/* Quick Performance Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50">
              <div className="text-2xl font-bold text-primary">{overallScore || 75}</div>
              <div className="text-sm text-muted-foreground">Overall Score</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50">
              <div className="text-2xl font-bold text-accent">
                {(() => {
                  const sortedPoints = [...radarPoints].sort((a, b) => (b.score || 0) - (a.score || 0));
                  return sortedPoints[0]?.score || 75;
                })()}
              </div>
              <div className="text-sm text-muted-foreground">Best Area</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50">
              <div className="text-2xl font-bold text-success">
                {state.session?.gameResults?.length || 5}
              </div>
              <div className="text-sm text-muted-foreground">Games Done</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50">
              <div className="text-2xl font-bold text-warning">
                {getPercentileRanking(overallScore || 75)}
              </div>
              <div className="text-sm text-muted-foreground">Percentile</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="default" size="lg" className="bg-gradient-primary hover:opacity-90 px-8 py-4 text-lg">
              <Share2 className="w-5 h-5 mr-2" />
              Share Results
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="sticky top-4 z-50 mb-8">
          <Card className="p-4 bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg">
            <div className="flex flex-wrap gap-2 justify-center items-center">
              <Button variant="ghost" size="sm" className="text-xs" onClick={() => document.getElementById('cognitive-profile')?.scrollIntoView({ behavior: 'smooth' })}>
                <Brain className="w-4 h-4 mr-1" />
                Profile
              </Button>
              <Button variant="ghost" size="sm" className="text-xs" onClick={() => document.getElementById('archetype-profile')?.scrollIntoView({ behavior: 'smooth' })}>
                <Award className="w-4 h-4 mr-1" />
                Archetype
              </Button>
              <Button variant="ghost" size="sm" className="text-xs" onClick={() => document.getElementById('insights')?.scrollIntoView({ behavior: 'smooth' })}>
                <PieChart className="w-4 h-4 mr-1" />
                Insights
              </Button>
              <Button variant="ghost" size="sm" className="text-xs" onClick={() => document.getElementById('careers')?.scrollIntoView({ behavior: 'smooth' })}>
                <Briefcase className="w-4 h-4 mr-1" />
                Careers
              </Button>
              <Button variant="ghost" size="sm" className="text-xs" onClick={() => document.getElementById('development')?.scrollIntoView({ behavior: 'smooth' })}>
                <Target className="w-4 h-4 mr-1" />
                Growth
              </Button>
              <Button variant="ghost" size="sm" className="text-xs" onClick={() => document.getElementById('action-plan')?.scrollIntoView({ behavior: 'smooth' })}>
                <Rocket className="w-4 h-4 mr-1" />
                Action Plan
              </Button>
            </div>
          </Card>
        </div>

        {/* Cognitive Profile Radar */}
        <Card id="cognitive-profile" className="p-8 mb-12 bg-gradient-card shadow-2xl border-0 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Your Cognitive Profile</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A comprehensive visualization of your cognitive strengths across five key reasoning domains.
            </p>
          </div>
          
          <div className="grid xl:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Radar Chart */}
            <div className="order-2 xl:order-1">
              <div className="relative w-full max-w-lg mx-auto aspect-square">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  {/* Background circles */}
                  <circle cx="200" cy="200" r="160" fill="none" stroke="hsl(var(--border))" strokeWidth="2" opacity="0.2"/>
                  <circle cx="200" cy="200" r="120" fill="none" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3"/>
                  <circle cx="200" cy="200" r="80" fill="none" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3"/>
                  <circle cx="200" cy="200" r="40" fill="none" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3"/>
                  
                  {/* Grid lines */}
                  <line x1="200" y1="40" x2="200" y2="360" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3"/>
                  <line x1="40" y1="200" x2="360" y2="200" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3"/>
                  <line x1="80" y1="80" x2="320" y2="320" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3"/>
                  <line x1="320" y1="80" x2="80" y2="320" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3"/>
                  
                  {/* Data polygon with safe calculations */}
                <polygon
                    points={(() => {
                      const logicalScore = scores.logical || 75;
                      const verbalScore = scores.verbal || 70;
                      const quantitativeScore = scores.quantitative || 80;
                      const spatialScore = scores.spatial || 65;
                      const attentionScore = scores.attention || 72;
                      
                      return `
                        200,${200 - (logicalScore * 1.6)}
                        ${200 + (verbalScore * 1.27)},${200 - (verbalScore * 0.46)}
                        ${200 + (quantitativeScore * 0.8)},${200 + (quantitativeScore * 1.2)}
                        ${200 - (spatialScore * 0.8)},${200 + (spatialScore * 1.2)}
                        ${200 - (attentionScore * 1.27)},${200 - (attentionScore * 0.46)}
                      `;
                    })()}
                    fill="url(#gradient)"
                  fillOpacity="0.2"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                  />
                  
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--accent))" />
                    </linearGradient>
                  </defs>
                  
                  {/* Labels with better positioning */}
                  <text x="200" y="30" textAnchor="middle" className="fill-foreground text-base font-bold">Logical</text>
                  <text x="370" y="205" textAnchor="start" className="fill-foreground text-base font-bold">Verbal</text>
                  <text x="370" y="330" textAnchor="start" className="fill-foreground text-base font-bold">Quantitative</text>
                  <text x="30" y="330" textAnchor="end" className="fill-foreground text-base font-bold">Spatial</text>
                  <text x="30" y="205" textAnchor="end" className="fill-foreground text-base font-bold">Attention</text>
                  
                  {/* Score indicators on axes */}
                  <circle cx="200" cy="40" r="4" fill="hsl(var(--primary))" />
                  <circle cx="360" cy="200" r="4" fill="hsl(var(--primary))" />
                  <circle cx="200" cy="360" r="4" fill="hsl(var(--primary))" />
                  <circle cx="40" cy="200" r="4" fill="hsl(var(--primary))" />
                  
                  {/* Score value labels */}
                  <text x="200" y="25" textAnchor="middle" className="fill-foreground text-xs font-semibold">100</text>
                  <text x="375" y="200" textAnchor="start" className="fill-foreground text-xs font-semibold">100</text>
                  <text x="375" y="340" textAnchor="start" className="fill-foreground text-xs font-semibold">100</text>
                  <text x="25" y="340" textAnchor="end" className="fill-foreground text-xs font-semibold">100</text>
                  <text x="25" y="200" textAnchor="end" className="fill-foreground text-xs font-semibold">100</text>
              </svg>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="order-1 xl:order-2 space-y-6">
              <div className="text-center xl:text-left mb-6">
                <h3 className="text-xl font-bold mb-2">Performance Breakdown</h3>
                <p className="text-muted-foreground">Your scores across different cognitive domains</p>
              </div>
              
              {radarPoints.map((point, index) => {
                const Icon = point.icon;
                const score = point.score || 0;
                return (
                  <div key={point.factor} className="space-y-3 p-4 bg-card/50 rounded-lg border border-border/50 hover:bg-card/70 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className={`w-5 h-5 ${point.color}`} />
                        </div>
                        <span className="font-semibold text-lg">{point.factor} Reasoning</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
                          {score}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {getPercentileRanking(score)}
                        </Badge>
                      </div>
                  </div>
                    <Progress 
                      value={score} 
                      className="h-3"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>0</span>
                      <span>100</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {score >= 80 
                        ? `Exceptional performance in ${point.factor.toLowerCase()} reasoning`
                        : score >= 60 
                        ? `Strong performance in ${point.factor.toLowerCase()} reasoning`
                        : `Developing skills in ${point.factor.toLowerCase()} reasoning`
                      }
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Archetype Profile */}
        <Card id="archetype-profile" className="p-8 mb-12 bg-gradient-card shadow-2xl border-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Your {currentArchetype.name} Profile</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {currentArchetype.description || "You demonstrate a unique cognitive profile with distinct strengths and characteristics that shape your approach to problem-solving and decision-making."}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Primary Strengths */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Award className="w-6 h-6 text-primary" />
                  Primary Strength
                </h3>
                <div className="p-6 bg-primary/10 rounded-lg border border-primary/20 hover:bg-primary/15 transition-colors">
                  <h4 className="font-bold text-xl text-primary mb-3">{currentArchetype.primaryStrength || 'Analytical Thinking'}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {(() => {
                      const primaryStrength = currentArchetype.primaryStrength || 'Analytical Thinking';
                      const strengthKey = primaryStrength.toLowerCase().replace(' reasoning', '').replace(' analysis', '').replace(' & focus', '');
                      const strengthScore = scores[strengthKey as keyof typeof scores] || 75;
                      const percentile = getPercentileRanking(strengthScore);
                      
                      return `Your exceptional ability in ${primaryStrength.toLowerCase()} puts you in the ${percentile.toLowerCase()}. This is your superpower and key competitive advantage.`;
                    })()}
                  </p>
                  <div className="mt-4 w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500" 
                      style={{ 
                        width: `${(() => {
                          const primaryStrength = currentArchetype.primaryStrength || 'Analytical Thinking';
                          const strengthKey = primaryStrength.toLowerCase().replace(' reasoning', '').replace(' analysis', '').replace(' & focus', '');
                          return scores[strengthKey as keyof typeof scores] || 75;
                        })()}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-accent" />
                  Secondary Strength
                </h3>
                <div className="p-6 bg-accent/10 rounded-lg border border-accent/20 hover:bg-accent/15 transition-colors">
                  <h4 className="font-bold text-xl text-accent mb-3">{currentArchetype.secondaryStrength || 'Problem-Solving'}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {(() => {
                      const secondaryStrength = currentArchetype.secondaryStrength || 'Problem-Solving';
                      const strengthKey = secondaryStrength.toLowerCase().replace(' reasoning', '').replace(' analysis', '').replace(' & focus', '');
                      const strengthScore = scores[strengthKey as keyof typeof scores] || 70;
                      
                      return `Your strong ${secondaryStrength.toLowerCase()} complements your primary strength, making you uniquely valuable in roles that require both analytical thinking and practical application.`;
                    })()}
                  </p>
                  <div className="mt-4 w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-accent h-2 rounded-full transition-all duration-500" 
                      style={{ 
                        width: `${(() => {
                          const secondaryStrength = currentArchetype.secondaryStrength || 'Problem-Solving';
                          const strengthKey = secondaryStrength.toLowerCase().replace(' reasoning', '').replace(' analysis', '').replace(' & focus', '');
                          return scores[strengthKey as keyof typeof scores] || 70;
                        })()}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Personality Traits & Characteristics */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Users className="w-6 h-6 text-success" />
                  Your Personality Traits
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(currentArchetype.personalityTraits || ['Analytical', 'Systematic', 'Detail-Oriented', 'Problem-Solver']).map((trait: string, index: number) => (
                    <Badge key={index} variant="outline" className="p-3 text-center justify-center hover:bg-success/10 transition-colors">
                      <CheckCircle className="w-4 h-4 mr-2 text-success" />
                      <span className="font-medium">{trait}</span>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6 text-warning" />
                  Key Characteristics
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                    <h4 className="font-bold text-lg mb-2">Work Style</h4>
                    <p className="text-sm text-muted-foreground">
                      {(() => {
                        const archetypeName = currentArchetype.name || 'The Analyst';
                        if (archetypeName.includes('Strategist')) {
                          return "You prefer systematic approaches, enjoy complex problem-solving, and excel at identifying patterns and trends.";
                        } else if (archetypeName.includes('Communicator')) {
                          return "You thrive in collaborative environments, excel at explaining complex concepts, and enjoy interpersonal interactions.";
                        } else if (archetypeName.includes('Analyst')) {
                          return "You prefer data-driven decisions, enjoy detailed analysis, and excel at finding insights in complex information.";
                        } else if (archetypeName.includes('Architect')) {
                          return "You enjoy visual problem-solving, excel at spatial reasoning, and prefer creative, design-oriented approaches.";
                        } else if (archetypeName.includes('Focused')) {
                          return "You excel at sustained attention, prefer detailed work, and thrive in environments requiring precision and accuracy.";
                        } else {
                          return "You have a balanced approach to work, adapting well to different challenges and environments.";
                        }
                      })()}
                    </p>
                  </div>

                  <div className="p-4 bg-info/10 rounded-lg border border-info/20">
                    <h4 className="font-bold text-lg mb-2">Learning Preference</h4>
                    <p className="text-sm text-muted-foreground">
                      {(() => {
                        const topScore = Math.max(...Object.values(scores).filter(s => typeof s === 'number'));
                        const topArea = radarPoints.find(p => p.score === topScore)?.factor || 'Logical';
                        
                        if (topArea === 'Logical') {
                          return "You learn best through structured, step-by-step processes and logical frameworks.";
                        } else if (topArea === 'Verbal') {
                          return "You learn best through reading, discussion, and verbal explanations.";
                        } else if (topArea === 'Quantitative') {
                          return "You learn best through numerical examples, data analysis, and mathematical models.";
                        } else if (topArea === 'Spatial') {
                          return "You learn best through visual diagrams, charts, and spatial representations.";
                        } else if (topArea === 'Attention') {
                          return "You learn best through focused, detailed study and careful observation.";
                        } else {
                          return "You have a flexible learning style, adapting to different methods as needed.";
                        }
                      })()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Detailed Insights */}
        <Card id="insights" className="p-8 mb-12 bg-gradient-card shadow-2xl border-0 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Deep Insights & Analysis</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive analysis of your cognitive performance patterns, strengths, and strategic recommendations for career development.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cognitive Strengths */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-success" />
                Your Cognitive Strengths
              </h3>
              <div className="space-y-3">
                {radarPoints
                  .filter(point => point.score > 0)
                  .sort((a, b) => b.score - a.score)
                  .slice(0, 3)
                  .map((point, index) => {
                    const Icon = point.icon;
                    const score = point.score || 0;
                    return (
                      <div key={point.factor} className="p-4 bg-success/10 rounded-lg border border-success/20 hover:bg-success/15 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-lg bg-success/20">
                            <Icon className={`w-5 h-5 ${point.color}`} />
                          </div>
                          <span className="font-bold text-lg">{point.factor}</span>
                          <Badge variant="secondary" className="ml-auto px-3 py-1">
                            {score}/100
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {score >= 85 
                            ? `Exceptional ability in ${point.factor.toLowerCase()} reasoning. This is a key competitive advantage that sets you apart.`
                            : score >= 70 
                            ? `Strong performance in ${point.factor.toLowerCase()} reasoning with excellent potential for growth.`
                            : score >= 55
                            ? `Good foundation in ${point.factor.toLowerCase()} reasoning with room for development.`
                            : `Developing skills in ${point.factor.toLowerCase()} reasoning. This is a focus area for improvement.`
                          }
                        </p>
                        <div className="mt-2 w-full bg-muted rounded-full h-1.5">
                          <div 
                            className="bg-success h-1.5 rounded-full transition-all duration-500" 
                            style={{ width: `${score}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                {radarPoints.filter(point => point.score > 0).length === 0 && (
                  <div className="p-4 bg-muted/50 rounded-lg border border-muted text-center">
                    <p className="text-muted-foreground">Complete the assessment to see your cognitive strengths</p>
                  </div>
                )}
              </div>
            </div>

            {/* Performance Patterns */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-primary" />
                Performance Patterns
              </h3>
              <div className="space-y-3">
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <h4 className="font-bold text-lg mb-2">Consistency Level</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {(() => {
                      const scoreValues = Object.values(scores).filter(score => typeof score === 'number');
                      if (scoreValues.length === 0) return "Assessment in progress";
                      const range = Math.max(...scoreValues) - Math.min(...scoreValues);
                      if (range < 20) return "Highly consistent across all domains";
                      if (range < 40) return "Moderately consistent with some variation";
                      return "Variable performance across different domains";
                    })()}
                  </p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500" 
                      style={{ 
                        width: `${(() => {
                          const scoreValues = Object.values(scores).filter(score => typeof score === 'number');
                          if (scoreValues.length === 0) return 50;
                          const range = Math.max(...scoreValues) - Math.min(...scoreValues);
                          return Math.max(10, 100 - range);
                        })()}%` 
                      }}
                    ></div>
                  </div>
                </div>

                <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <h4 className="font-bold text-lg mb-2">Learning Style</h4>
                  <p className="text-sm text-muted-foreground">
                    {(() => {
                      const logicalScore = scores.logical || 0;
                      const verbalScore = scores.verbal || 0;
                      const quantitativeScore = scores.quantitative || 0;
                      
                      if (logicalScore > verbalScore && logicalScore > quantitativeScore) {
                        return "You prefer structured, logical approaches to problem-solving and systematic analysis";
                      } else if (verbalScore > logicalScore && verbalScore > quantitativeScore) {
                        return "You excel at verbal communication, language-based tasks, and interpersonal interactions";
                      } else if (quantitativeScore > logicalScore && quantitativeScore > verbalScore) {
                        return "You thrive on numerical analysis, data interpretation, and mathematical problem-solving";
                      } else {
                        return "You have a balanced learning style, adapting well to different types of challenges";
                      }
                    })()}
                  </p>
                </div>

                <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                  <h4 className="font-bold text-lg mb-2">Cognitive Flexibility</h4>
                  <p className="text-sm text-muted-foreground">
                    {(() => {
                      const scoreValues = Object.values(scores).filter(score => typeof score === 'number');
                      if (scoreValues.length === 0) return "Assessment in progress";
                      const range = Math.max(...scoreValues) - Math.min(...scoreValues);
                      if (range < 30) {
                        return "High cognitive flexibility - adaptable across domains and comfortable with diverse challenges";
                      } else {
                        return "Specialized cognitive profile - deep expertise in specific areas with focused strengths";
                      }
                    })()}
                  </p>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-warning" />
                Strategic Recommendations
              </h3>
              <div className="space-y-3">
                <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                  <h4 className="font-bold text-lg mb-2">Leverage Your Strengths</h4>
                  <p className="text-sm text-muted-foreground">
                    Focus on roles that emphasize {currentArchetype.primaryStrength?.toLowerCase() || 'analytical thinking'} and {currentArchetype.secondaryStrength?.toLowerCase() || 'problem-solving skills'}.
                  </p>
                </div>

                <div className="p-4 bg-info/10 rounded-lg border border-info/20">
                  <h4 className="font-bold text-lg mb-2">Development Priority</h4>
                  <p className="text-sm text-muted-foreground">
                    Invest in developing {currentArchetype.developmentAreas?.[0] || 'key skills'} to become more well-rounded and unlock new opportunities.
                  </p>
                </div>

                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <h4 className="font-bold text-lg mb-2">Career Strategy</h4>
                  <p className="text-sm text-muted-foreground">
                    {(() => {
                      const score = overallScore || 75;
                      if (score >= 85) {
                        return "Consider senior leadership roles that require exceptional cognitive abilities and strategic thinking";
                      } else if (score >= 75) {
                        return "Focus on management positions that leverage your strong analytical and problem-solving skills";
                      } else if (score >= 65) {
                        return "Build expertise in your strongest areas while developing complementary skills";
                      } else {
                        return "Focus on building foundational expertise in your strongest cognitive domains first";
                      }
                    })()}
                  </p>
                </div>

                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <h4 className="font-bold text-lg mb-2">Next Steps</h4>
                  <p className="text-sm text-muted-foreground">
                    {(() => {
                      const topScore = Math.max(...Object.values(scores).filter(s => typeof s === 'number'));
                      const topArea = radarPoints.find(p => p.score === topScore)?.factor || 'Logical';
                      return `Start by exploring opportunities that align with your ${topArea.toLowerCase()} strengths, then gradually expand into related areas.`;
                    })()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="mt-12 p-6 bg-gradient-to-r from-primary/10 via-accent/10 to-success/10 rounded-lg border border-primary/20">
            <h3 className="text-2xl font-bold mb-4 text-center">Key Takeaways</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-bold text-lg text-primary">Your Competitive Edge</h4>
                <p className="text-muted-foreground text-sm">
                  {(() => {
                    const topScore = Math.max(...Object.values(scores).filter(s => typeof s === 'number'));
                    const topArea = radarPoints.find(p => p.score === topScore)?.factor || 'Logical';
                    return `Your strongest area is ${topArea.toLowerCase()} reasoning (${topScore}/100), which gives you a significant advantage in analytical and problem-solving roles.`;
                  })()}
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-lg text-accent">Growth Opportunity</h4>
                <p className="text-muted-foreground text-sm">
                  {(() => {
                    const lowestScore = Math.min(...Object.values(scores).filter(s => typeof s === 'number'));
                    const lowestArea = radarPoints.find(p => p.score === lowestScore)?.factor || 'Attention';
                    return `Focus on developing your ${lowestArea.toLowerCase()} skills to become a more well-rounded professional and unlock new career opportunities.`;
                  })()}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Career Pathways */}
        <Card id="careers" className="p-8 mb-12 bg-gradient-card shadow-2xl border-0 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
              <Briefcase className="w-8 h-8 text-primary" />
              Career Pathways for {currentArchetype.name}
          </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Based on your cognitive profile, here are the career paths where you'll excel and find fulfillment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {(() => {
              const careerMatches = currentArchetype.careerMatches || [];
              
              if (careerMatches.length === 0) {
                return (
                  <div className="col-span-2 text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-4">
                      <Briefcase className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Career Matches Loading</h3>
                    <p className="text-muted-foreground">
                      We're analyzing your profile to find the best career matches for you.
                    </p>
                  </div>
                );
              }

              return careerMatches.map((career: any, index: number) => {
                const getCareerIcon = (title: string) => {
                  const iconMap: Record<string, string> = {
                    'Data Scientist': '📊',
                    'Strategy Consultant': '💼',
                    'Software Architect': '🏗️',
                    'Operations Research Analyst': '📈',
                    'Management Consultant': '🎯',
                    'Product Manager': '📱',
                    'Marketing Director': '📢',
                    'Quantitative Analyst': '🔢',
                    'Actuary': '📋',
                    'Research Scientist': '🔬',
                    'UX/UI Designer': '🎨',
                    'Architect': '🏛️',
                    'Game Designer': '🎮',
                    'Quality Assurance Engineer': '✅',
                    'Research Assistant': '📚',
                    'Technical Writer': '✍️',
                    'General Manager': '👔',
                    'Project Manager': '📅',
                    'Business Analyst': '📊'
                  };
                  return iconMap[title] || '💼';
                };

                return (
                  <Card key={career.title || `career-${index}`} className="p-6 border-2 hover:border-primary transition-all hover:shadow-xl group cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">
                          {getCareerIcon(career.title || 'Career')}
                        </div>
                        <div>
                          <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
                            {career.title || 'Career Position'}
                          </h3>
                          <Badge variant="secondary" className="mt-1">
                            {career.matchPercentage || 85}% Match
                          </Badge>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {career.description || 'A career opportunity that aligns with your cognitive strengths and professional goals.'}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-success text-lg">
                          {career.salary || '$70K - $120K'}
                        </span>
                        <Badge 
                          variant={(career.growthOutlook || 'High') === 'High' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {career.growthOutlook || 'High'} Growth
                        </Badge>
                      </div>
                      
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-2">Key Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {(career.requiredSkills || ['Analytical Thinking', 'Problem Solving', 'Communication', 'Leadership']).map((skill: string, skillIndex: number) => (
                            <Badge key={skillIndex} variant="outline" className="text-xs hover:bg-primary/10 transition-colors">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-border/50">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Match Score</span>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all duration-500" 
                                style={{ width: `${career.matchPercentage || 85}%` }}
                              ></div>
                            </div>
                            <span className="font-semibold text-primary">
                              {career.matchPercentage || 85}%
                            </span>
                          </div>
                        </div>
                      </div>
                </div>
              </Card>
                );
              });
            })()}
          </div>

          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 hover:bg-primary/10 transition-colors"
              onClick={() => {
                // Scroll to career pathways section or show more careers
                const careersSection = document.getElementById('careers');
                if (careersSection) {
                  careersSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <Briefcase className="w-5 h-5 mr-2" />
              Explore All Career Matches
            </Button>
          </div>
        </Card>

        {/* Development Areas */}
        <Card id="development" className="p-8 mb-12 bg-gradient-card shadow-2xl border-0 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Growth Opportunities</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Focused development areas and actionable strategies to maximize your cognitive potential and career growth.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-warning" />
                Areas to Develop
              </h3>
              <div className="space-y-3">
                {(() => {
                  const developmentAreas = currentArchetype.developmentAreas || [];
                  
                  if (developmentAreas.length === 0) {
                    // Generate development areas based on lowest scores
                    const scoreValues = Object.values(scores).filter(s => typeof s === 'number');
                    const lowestScore = Math.min(...scoreValues);
                    const lowestArea = radarPoints.find(p => p.score === lowestScore)?.factor || 'Attention';
                    
                    return (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-4 bg-warning/10 rounded-lg border border-warning/20 hover:bg-warning/15 transition-colors">
                          <Lightbulb className="w-5 h-5 text-warning" />
                          <div>
                            <span className="font-semibold">{lowestArea} Reasoning</span>
                            <p className="text-xs text-muted-foreground mt-1">
                              Your lowest scoring area - focus here for maximum impact
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-info/10 rounded-lg border border-info/20 hover:bg-info/15 transition-colors">
                          <BookOpen className="w-5 h-5 text-info" />
                          <div>
                            <span className="font-semibold">Communication Skills</span>
                            <p className="text-xs text-muted-foreground mt-1">
                              Essential for career advancement and leadership
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return developmentAreas.map((area: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-warning/10 rounded-lg border border-warning/20 hover:bg-warning/15 transition-colors">
                      <Lightbulb className="w-5 h-5 text-warning" />
                      <div>
                        <span className="font-semibold">{area}</span>
                        <p className="text-xs text-muted-foreground mt-1">
                          {index === 0 ? 'Primary focus area for development' : 'Secondary development priority'}
                        </p>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Rocket className="w-6 h-6 text-success" />
                Recommended Actions
              </h3>
              <div className="space-y-3">
                {(() => {
                  const lowestScore = Math.min(...Object.values(scores).filter(s => typeof s === 'number'));
                  const lowestArea = radarPoints.find(p => p.score === lowestScore)?.factor || 'Attention';
                  
                  const actions = [
                    {
                      title: "Targeted Skill Development",
                      description: `Focus on ${lowestArea.toLowerCase()} reasoning through specific exercises and practice`,
                      icon: "🎯",
                      priority: "high"
                    },
                    {
                      title: "Online Learning Path",
                      description: "Enroll in courses that match your development areas and career goals",
                      icon: "📚",
                      priority: "medium"
                    },
                    {
                      title: "Daily Practice Routine",
                      description: "15-30 minutes of focused practice can significantly improve your skills",
                      icon: "⏰",
                      priority: "high"
                    },
                    {
                      title: "Find a Mentor",
                      description: "Connect with professionals who excel in your target development areas",
                      icon: "👥",
                      priority: "medium"
                    },
                    {
                      title: "Join Professional Groups",
                      description: "Engage with communities focused on your development areas",
                      icon: "🌐",
                      priority: "low"
                    },
                    {
                      title: "Track Your Progress",
                      description: "Set measurable goals and regularly assess your improvement",
                      icon: "📊",
                      priority: "high"
                    }
                  ];

                  return actions.map((action, index) => (
                    <div key={index} className={`p-4 rounded-lg border transition-colors hover:scale-[1.02] ${
                      action.priority === 'high' 
                        ? 'bg-success/10 border-success/20 hover:bg-success/15' 
                        : action.priority === 'medium'
                        ? 'bg-primary/10 border-primary/20 hover:bg-primary/15'
                        : 'bg-muted/10 border-muted/20 hover:bg-muted/15'
                    }`}>
                      <div className="flex items-start gap-3">
                        <span className="text-lg">{action.icon}</span>
                        <div className="flex-1">
                          <p className="text-sm font-semibold mb-1">{action.title}</p>
                          <p className="text-xs text-muted-foreground">{action.description}</p>
                          <div className="mt-2">
                            <Badge 
                              variant={action.priority === 'high' ? 'default' : 'secondary'} 
                              className="text-xs"
                            >
                              {action.priority === 'high' ? 'High Priority' : action.priority === 'medium' ? 'Medium Priority' : 'Optional'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>

          {/* Development Progress Tracker */}
          <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 via-accent/10 to-success/10 rounded-lg border border-primary/20">
            <h3 className="text-xl font-bold mb-4 text-center">Your Development Journey</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-bold text-lg mb-2">Set Goals</h4>
                <p className="text-sm text-muted-foreground">
                  Define specific, measurable objectives for your development areas
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Rocket className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-bold text-lg mb-2">Take Action</h4>
                <p className="text-sm text-muted-foreground">
                  Implement the recommended strategies consistently over time
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-8 h-8 text-success" />
                </div>
                <h4 className="font-bold text-lg mb-2">Measure Progress</h4>
              <p className="text-sm text-muted-foreground">
                  Track your improvement and celebrate milestones along the way
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Plan */}
        <Card id="action-plan" className="p-8 mb-12 bg-gradient-card shadow-2xl border-0 animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Your Personal Action Plan</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A comprehensive roadmap tailored to your cognitive profile, designed to maximize your potential and accelerate your career growth.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Immediate Actions */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-primary" />
                Immediate Actions (This Week)
              </h3>
              
              <div className="space-y-4">
                {(() => {
                  const topCareer = currentArchetype.careerMatches?.[0]?.title || 'Data Scientist';
                  const primaryStrength = currentArchetype.primaryStrength || 'Analytical Thinking';
                  const lowestArea = radarPoints.find(p => p.score === Math.min(...Object.values(scores).filter(s => typeof s === 'number')))?.factor || 'Attention';
                  
                  return [
                    {
                      title: "Create Your Career Map",
                      description: `Research 3-5 companies in your top career matches like ${topCareer}. Look at their job postings, company culture, and growth opportunities.`,
                      action: "Spend 2 hours this weekend researching",
                      icon: "📋",
                      color: "primary"
                    },
                    {
                      title: "Set Skill Development Goals",
                      description: `Based on your development areas, focus on ${lowestArea.toLowerCase()} reasoning. Choose 1-2 specific skills to develop over the next 3 months.`,
                      action: "Write down specific learning objectives with timelines",
                      icon: "🎯",
                      color: "accent"
                    },
                    {
                      title: "Document Your Insights",
                      description: `Save this report and create a personal reflection document about your ${primaryStrength.toLowerCase()} strengths and how to leverage them.`,
                      action: "Download and save your results for future reference",
                      icon: "📝",
                      color: "success"
                    }
                  ].map((item, index) => (
                    <div key={index} className={`p-4 rounded-lg border hover:scale-[1.02] transition-all ${
                      item.color === 'primary' ? 'bg-primary/10 border-primary/20 hover:bg-primary/15' :
                      item.color === 'accent' ? 'bg-accent/10 border-accent/20 hover:bg-accent/15' :
                      'bg-success/10 border-success/20 hover:bg-success/15'
                    }`}>
                      <h4 className="font-bold text-lg mb-2">{item.icon} {item.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      <div className={`text-xs font-semibold ${
                        item.color === 'primary' ? 'text-primary' :
                        item.color === 'accent' ? 'text-accent' :
                        'text-success'
                      }`}>
                        Action: {item.action}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>

            {/* Long-term Strategy */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Rocket className="w-6 h-6 text-success" />
                Long-term Strategy (Next 3-6 Months)
              </h3>
              
              <div className="space-y-4">
                {(() => {
                  const developmentAreas = currentArchetype.developmentAreas || [];
                  const developmentText = developmentAreas.length > 0 
                    ? developmentAreas.join(', ')
                    : radarPoints.find(p => p.score === Math.min(...Object.values(scores).filter(s => typeof s === 'number')))?.factor + ' reasoning' || 'communication skills';
                  
                  return [
                    {
                      title: "Skill Development",
                      description: `Focus on your development areas: ${developmentText}. Consider online courses, workshops, or hands-on projects that align with your career goals.`,
                      timeline: "3-6 months of consistent practice",
                      icon: "🎓",
                      color: "warning"
                    },
                    {
                      title: "Network Building",
                      description: `Connect with professionals in your target fields through LinkedIn, industry events, or professional associations. Focus on ${currentArchetype.careerMatches?.[0]?.title || 'your target career'} professionals.`,
                      goal: "5-10 meaningful professional connections",
                      icon: "🤝",
                      color: "info"
                    },
                    {
                      title: "Career Exploration",
                      description: `Apply your ${currentArchetype.primaryStrength?.toLowerCase() || 'analytical'} strengths in real-world scenarios through side projects, volunteering, or freelance work.`,
                      focus: "Practical application of your strengths",
                      icon: "💼",
                      color: "purple"
                    }
                  ].map((item, index) => (
                    <div key={index} className={`p-4 rounded-lg border hover:scale-[1.02] transition-all ${
                      item.color === 'warning' ? 'bg-warning/10 border-warning/20 hover:bg-warning/15' :
                      item.color === 'info' ? 'bg-info/10 border-info/20 hover:bg-info/15' :
                      'bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/15'
                    }`}>
                      <h4 className="font-bold text-lg mb-2">{item.icon} {item.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      <div className={`text-xs font-semibold ${
                        item.color === 'warning' ? 'text-warning' :
                        item.color === 'info' ? 'text-info' :
                        'text-purple-500'
                      }`}>
                        {item.timeline ? `Timeline: ${item.timeline}` : item.goal ? `Goal: ${item.goal}` : `Focus: ${item.focus}`}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
            <h3 className="text-xl font-bold mb-4 text-center">Key Insights for Your Journey</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-lg mb-2 text-primary">Your Superpower</h4>
                <p className="text-muted-foreground">
                  {(() => {
                    const primaryStrength = currentArchetype.primaryStrength || 'Analytical Thinking';
                    const strengthKey = primaryStrength.toLowerCase().replace(' reasoning', '').replace(' analysis', '').replace(' & focus', '');
                    const strengthScore = scores[strengthKey as keyof typeof scores] || 75;
                    const percentile = getPercentileRanking(strengthScore);
                    return `Your ${primaryStrength.toLowerCase()} puts you in the ${percentile.toLowerCase()}. This is your competitive advantage—leverage it in every opportunity.`;
                  })()}
              </p>
            </div>
            <div>
                <h4 className="font-bold text-lg mb-2 text-accent">Growth Opportunity</h4>
                <p className="text-muted-foreground">
                  {(() => {
                    const developmentAreas = currentArchetype.developmentAreas || [];
                    const focusArea = developmentAreas.length > 0 
                      ? developmentAreas[0]
                      : radarPoints.find(p => p.score === Math.min(...Object.values(scores).filter(s => typeof s === 'number')))?.factor + ' reasoning' || 'communication skills';
                    return `Focus on developing ${focusArea.toLowerCase()} to become a more well-rounded professional and unlock new career possibilities.`;
                  })()}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center pt-6 border-t mt-8">
            <Button variant="outline" onClick={handleRetakeAssessment} size="lg" className="px-8 py-4 hover:bg-primary/10">
              <RotateCcw className="w-5 h-5 mr-2" />
              Retake Assessment
            </Button>
            <Button variant="default" className="bg-gradient-primary hover:opacity-90 px-8 py-4" size="lg">
              <Download className="w-5 h-5 mr-2" />
              Download Full Report
            </Button>
          </div>
        </Card>


        {/* Footer */}
        <div className="text-center py-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Thank You for Completing Your Assessment</h3>
            <p className="text-lg text-muted-foreground mb-8">
              Your results are based on your performance across all 5 cognitive games. 
              These insights can help guide your career development and personal growth.
            </p>
            
            <div className="flex flex-wrap gap-6 justify-center text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                Scientifically Validated
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                Industry-Standard Assessment
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                Personalized Insights
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                Actionable Recommendations
              </span>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="outline" onClick={handleRetakeAssessment} size="lg" className="px-8 py-4 hover:bg-primary/10">
                <RotateCcw className="w-5 h-5 mr-2" />
                Retake Assessment
              </Button>
              <Button variant="default" className="bg-gradient-primary hover:opacity-90 px-8 py-4" size="lg">
                <Download className="w-5 h-5 mr-2" />
                Download Full Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;