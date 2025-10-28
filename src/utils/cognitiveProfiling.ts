import { GameResult, CognitiveProfile, UserArchetype, CareerMatch } from '@/types/assessment';

// Calculate cognitive profile from game results
export function calculateCognitiveProfile(gameResults: GameResult[]): CognitiveProfile {
  const profile: CognitiveProfile = {
    logical: 0,
    verbal: 0,
    quantitative: 0,
    spatial: 0,
    attention: 0,
  };

  // Map game results to cognitive dimensions
  gameResults.forEach(result => {
    const accuracy = result.accuracy;
    const speedBonus = calculateSpeedBonus(result.responseTimes, result.timeSpent);
    const finalScore = Math.min(100, accuracy + speedBonus);

    switch (result.gameId) {
      case 'decoder':
        profile.logical = finalScore;
        break;
      case 'verbal':
        profile.verbal = finalScore;
        break;
      case 'quantitative':
        profile.quantitative = finalScore;
        break;
      case 'spatial':
        profile.spatial = finalScore;
        break;
      case 'attention':
        profile.attention = finalScore;
        break;
    }
  });

  return profile;
}

// Calculate speed bonus based on response times
function calculateSpeedBonus(responseTimes: number[], totalTime: number): number {
  if (responseTimes.length === 0) return 0;
  
  const avgResponseTime = responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length;
  const speedScore = Math.max(0, 20 - (avgResponseTime / 2)); // Max 20 point bonus
  return Math.min(20, speedScore);
}

// Determine user archetype based on cognitive profile
export function determineArchetype(profile: CognitiveProfile): UserArchetype {
  const { logical, verbal, quantitative, spatial, attention } = profile;
  
  // Find the two highest scores
  const scores = [
    { name: 'logical', value: logical },
    { name: 'verbal', value: verbal },
    { name: 'quantitative', value: quantitative },
    { name: 'spatial', value: spatial },
    { name: 'attention', value: attention },
  ].sort((a, b) => b.value - a.value);

  const primary = scores[0];
  const secondary = scores[1];

  // Archetype determination logic
  if (primary.name === 'logical' && secondary.name === 'quantitative') {
    return {
      name: 'The Strategist',
      description: 'You excel at identifying patterns, solving complex problems, and thinking systematically.',
      primaryStrength: 'Logical Reasoning',
      secondaryStrength: 'Quantitative Analysis',
      careerMatches: getCareerMatches('strategist'),
      developmentAreas: ['Verbal Communication', 'Spatial Visualization'],
      personalityTraits: ['Analytical', 'Systematic', 'Problem-Solver', 'Detail-Oriented'],
    };
  } else if (primary.name === 'verbal' && secondary.name === 'logical') {
    return {
      name: 'The Communicator',
      description: 'You have exceptional verbal skills combined with strong logical thinking.',
      primaryStrength: 'Verbal Reasoning',
      secondaryStrength: 'Logical Analysis',
      careerMatches: getCareerMatches('communicator'),
      developmentAreas: ['Quantitative Skills', 'Spatial Reasoning'],
      personalityTraits: ['Persuasive', 'Articulate', 'Analytical', 'Social'],
    };
  } else if (primary.name === 'quantitative' && secondary.name === 'logical') {
    return {
      name: 'The Analyst',
      description: 'You thrive on numbers, data, and mathematical problem-solving.',
      primaryStrength: 'Quantitative Reasoning',
      secondaryStrength: 'Logical Analysis',
      careerMatches: getCareerMatches('analyst'),
      developmentAreas: ['Verbal Communication', 'Spatial Skills'],
      personalityTraits: ['Precise', 'Mathematical', 'Data-Driven', 'Focused'],
    };
  } else if (primary.name === 'spatial' && secondary.name === 'logical') {
    return {
      name: 'The Architect',
      description: 'You excel at visualizing and manipulating spatial relationships.',
      primaryStrength: 'Spatial Reasoning',
      secondaryStrength: 'Logical Thinking',
      careerMatches: getCareerMatches('architect'),
      developmentAreas: ['Verbal Skills', 'Quantitative Analysis'],
      personalityTraits: ['Visual', 'Creative', 'Systematic', 'Innovative'],
    };
  } else if (primary.name === 'attention' && secondary.name === 'logical') {
    return {
      name: 'The Focused',
      description: 'You have exceptional attention to detail and sustained focus.',
      primaryStrength: 'Attention & Focus',
      secondaryStrength: 'Logical Reasoning',
      careerMatches: getCareerMatches('focused'),
      developmentAreas: ['Verbal Communication', 'Spatial Skills'],
      personalityTraits: ['Detail-Oriented', 'Persistent', 'Thorough', 'Reliable'],
    };
  } else {
    // Balanced profile
    return {
      name: 'The Balanced',
      description: 'You have well-rounded cognitive abilities across multiple domains.',
      primaryStrength: 'Balanced Thinking',
      secondaryStrength: 'Adaptability',
      careerMatches: getCareerMatches('balanced'),
      developmentAreas: ['Specialization', 'Deep Expertise'],
      personalityTraits: ['Adaptable', 'Versatile', 'Well-Rounded', 'Flexible'],
    };
  }
}

// Get career matches based on archetype
function getCareerMatches(archetype: string): CareerMatch[] {
  const careerDatabase: Record<string, CareerMatch[]> = {
    strategist: [
      {
        title: 'Data Scientist',
        matchPercentage: 92,
        salary: '$95K - $160K',
        description: 'Analyze complex datasets to extract insights and build predictive models',
        requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
        growthOutlook: 'High',
      },
      {
        title: 'Strategy Consultant',
        matchPercentage: 89,
        salary: '$85K - $180K',
        description: 'Solve business problems through systematic analysis and logical frameworks',
        requiredSkills: ['Analytics', 'Problem Solving', 'Communication', 'Excel'],
        growthOutlook: 'High',
      },
      {
        title: 'Software Architect',
        matchPercentage: 87,
        salary: '$120K - $200K',
        description: 'Design complex software systems with optimal structure and logic',
        requiredSkills: ['System Design', 'Programming', 'Architecture', 'Leadership'],
        growthOutlook: 'High',
      },
      {
        title: 'Operations Research Analyst',
        matchPercentage: 85,
        salary: '$70K - $130K',
        description: 'Use mathematical models to help organizations solve problems',
        requiredSkills: ['Mathematics', 'Optimization', 'Statistics', 'Modeling'],
        growthOutlook: 'Medium',
      },
    ],
    communicator: [
      {
        title: 'Management Consultant',
        matchPercentage: 94,
        salary: '$90K - $200K',
        description: 'Advise organizations on strategy, operations, and business transformation',
        requiredSkills: ['Communication', 'Analysis', 'Presentation', 'Leadership'],
        growthOutlook: 'High',
      },
      {
        title: 'Product Manager',
        matchPercentage: 91,
        salary: '$100K - $180K',
        description: 'Lead product development from conception to launch',
        requiredSkills: ['Strategy', 'Communication', 'Analytics', 'Leadership'],
        growthOutlook: 'High',
      },
      {
        title: 'Marketing Director',
        matchPercentage: 88,
        salary: '$80K - $150K',
        description: 'Develop and execute marketing strategies to drive business growth',
        requiredSkills: ['Strategy', 'Communication', 'Analytics', 'Creativity'],
        growthOutlook: 'Medium',
      },
    ],
    analyst: [
      {
        title: 'Quantitative Analyst',
        matchPercentage: 96,
        salary: '$100K - $200K',
        description: 'Develop mathematical models for financial markets and risk management',
        requiredSkills: ['Mathematics', 'Statistics', 'Programming', 'Finance'],
        growthOutlook: 'High',
      },
      {
        title: 'Actuary',
        matchPercentage: 93,
        salary: '$80K - $150K',
        description: 'Analyze financial risks using mathematics, statistics, and financial theory',
        requiredSkills: ['Mathematics', 'Statistics', 'Risk Assessment', 'Excel'],
        growthOutlook: 'Medium',
      },
      {
        title: 'Research Scientist',
        matchPercentage: 90,
        salary: '$70K - $140K',
        description: 'Conduct research and analysis in scientific or technical fields',
        requiredSkills: ['Research', 'Statistics', 'Programming', 'Domain Knowledge'],
        growthOutlook: 'Medium',
      },
    ],
    architect: [
      {
        title: 'UX/UI Designer',
        matchPercentage: 94,
        salary: '$70K - $130K',
        description: 'Design user interfaces and experiences for digital products',
        requiredSkills: ['Design', 'User Research', 'Prototyping', 'Visual Design'],
        growthOutlook: 'High',
      },
      {
        title: 'Architect',
        matchPercentage: 92,
        salary: '$60K - $120K',
        description: 'Design buildings and structures with focus on functionality and aesthetics',
        requiredSkills: ['Design', 'CAD', 'Building Codes', 'Project Management'],
        growthOutlook: 'Medium',
      },
      {
        title: 'Game Designer',
        matchPercentage: 89,
        salary: '$50K - $100K',
        description: 'Create game mechanics, levels, and user experiences',
        requiredSkills: ['Design', 'Creativity', 'Programming', 'User Psychology'],
        growthOutlook: 'High',
      },
    ],
    focused: [
      {
        title: 'Quality Assurance Engineer',
        matchPercentage: 95,
        salary: '$60K - $110K',
        description: 'Test software and systems to ensure quality and reliability',
        requiredSkills: ['Testing', 'Attention to Detail', 'Programming', 'Documentation'],
        growthOutlook: 'Medium',
      },
      {
        title: 'Research Assistant',
        matchPercentage: 92,
        salary: '$40K - $70K',
        description: 'Support research projects with data collection and analysis',
        requiredSkills: ['Research', 'Data Analysis', 'Attention to Detail', 'Organization'],
        growthOutlook: 'Medium',
      },
      {
        title: 'Technical Writer',
        matchPercentage: 88,
        salary: '$50K - $90K',
        description: 'Create technical documentation and user guides',
        requiredSkills: ['Writing', 'Technical Knowledge', 'Attention to Detail', 'Communication'],
        growthOutlook: 'Medium',
      },
    ],
    balanced: [
      {
        title: 'General Manager',
        matchPercentage: 90,
        salary: '$80K - $150K',
        description: 'Oversee operations and strategy across multiple business functions',
        requiredSkills: ['Leadership', 'Strategy', 'Communication', 'Analytics'],
        growthOutlook: 'High',
      },
      {
        title: 'Project Manager',
        matchPercentage: 87,
        salary: '$70K - $120K',
        description: 'Plan and execute projects across various industries',
        requiredSkills: ['Organization', 'Communication', 'Leadership', 'Problem Solving'],
        growthOutlook: 'High',
      },
      {
        title: 'Business Analyst',
        matchPercentage: 84,
        salary: '$60K - $100K',
        description: 'Analyze business processes and recommend improvements',
        requiredSkills: ['Analysis', 'Communication', 'Problem Solving', 'Technical Skills'],
        growthOutlook: 'Medium',
      },
    ],
  };

  return careerDatabase[archetype] || [];
}

// Calculate overall assessment score
export function calculateOverallScore(profile: CognitiveProfile): number {
  const scores = Object.values(profile);
  return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
}

// Get percentile ranking
export function getPercentileRanking(score: number): string {
  if (score >= 95) return 'Elite (Top 5%)';
  if (score >= 90) return 'Advanced (Top 10%)';
  if (score >= 75) return 'Proficient (Top 25%)';
  if (score >= 50) return 'Above Average';
  return 'Developing';
}
