import type { MBTIType } from "../types";

export const mbtiTypes: Record<string, MBTIType> = {
  // Analysts (NT)
  ENTJ: {
    code: "ENTJ",
    name: "The Commander",
    description:
      "Strategic and goal-oriented travelers who love luxury experiences and efficient planning.",
    characteristics: [
      "Strategic planning",
      "Confident leadership",
      "Efficient execution",
      "Goal achievement",
      "Resource optimization",
    ],
    travelStyle: {
      preferences: ["Luxury", "Business travel", "Achievement-oriented"],
      destinations: ["Major cities", "Business hubs", "Prestigious locations"],
      activities: [
        "Networking events",
        "Executive tours",
        "Cultural landmarks",
        "Fine dining",
      ],
      planningStyle: "Highly structured with detailed itineraries",
      budgetApproach: "Premium budget for quality experiences",
      accommodationStyle: "Luxury hotels and executive suites",
      travelCompanions: ["Business associates", "Fellow leaders"],
    },
    imageUrl: "/images/entj-character.svg",
  },

  ENTP: {
    code: "ENTP",
    name: "The Debater",
    description:
      "Innovative and spontaneous travelers who thrive on new ideas and unexpected discoveries.",
    characteristics: [
      "Creative exploration",
      "Spontaneous adventures",
      "Intellectual curiosity",
      "Social networking",
      "Innovation seeking",
    ],
    travelStyle: {
      preferences: ["Innovation", "Spontaneity", "Intellectual stimulation"],
      destinations: ["Tech hubs", "Creative cities", "Emerging destinations"],
      activities: [
        "Startup tours",
        "Innovation labs",
        "Debates",
        "Brainstorming sessions",
      ],
      planningStyle: "Flexible framework with room for spontaneity",
      budgetApproach: "Strategic spending on unique experiences",
      accommodationStyle: "Boutique hotels and creative spaces",
      travelCompanions: ["Fellow innovators", "Diverse groups"],
    },
    imageUrl: "/images/entp-character.svg",
  },

  INTJ: {
    code: "INTJ",
    name: "The Architect",
    description:
      "Independent and strategic travelers who prefer well-researched, meaningful journeys.",
    characteristics: [
      "Strategic research",
      "Independent exploration",
      "Meaningful experiences",
      "Efficient planning",
      "Knowledge seeking",
    ],
    travelStyle: {
      preferences: [
        "Independence",
        "Deep exploration",
        "Knowledge acquisition",
      ],
      destinations: ["Historical sites", "Museums", "Architectural wonders"],
      activities: ["Research", "Self-guided tours", "Photography", "Learning"],
      planningStyle: "Meticulously researched and well-structured",
      budgetApproach: "Value-focused with strategic investments",
      accommodationStyle: "Quality over luxury, privacy important",
      travelCompanions: [
        "Solo travel",
        "Close friends",
        "Like-minded individuals",
      ],
    },
    imageUrl: "/images/intj-character.svg",
  },

  INTP: {
    code: "INTP",
    name: "The Thinker",
    description:
      "Curious and analytical travelers who enjoy exploring ideas and unconventional paths.",
    characteristics: [
      "Analytical exploration",
      "Curiosity-driven",
      "Unconventional paths",
      "Deep thinking",
      "Flexible approach",
    ],
    travelStyle: {
      preferences: ["Curiosity", "Analysis", "Unconventional experiences"],
      destinations: [
        "Off-beat locations",
        "Research facilities",
        "Natural phenomena",
      ],
      activities: ["Research", "Analysis", "Exploration", "Learning"],
      planningStyle: "Loose structure with flexibility for discoveries",
      budgetApproach: "Economical with splurges on interesting finds",
      accommodationStyle: "Simple but comfortable, location matters",
      travelCompanions: ["Solo travel", "Fellow thinkers", "Small groups"],
    },
    imageUrl: "/images/intp-character.svg",
  },

  // Diplomats (NF)
  ENFJ: {
    code: "ENFJ",
    name: "The Protagonist",
    description:
      "Inspiring and people-focused travelers who create meaningful connections and experiences.",
    characteristics: [
      "People connection",
      "Cultural immersion",
      "Inspiring others",
      "Meaningful experiences",
      "Group harmony",
    ],
    travelStyle: {
      preferences: [
        "Cultural immersion",
        "People connection",
        "Meaningful impact",
      ],
      destinations: [
        "Cultural centers",
        "Community projects",
        "Diverse societies",
      ],
      activities: [
        "Cultural exchange",
        "Volunteer work",
        "Local interactions",
        "Group activities",
      ],
      planningStyle: "Collaborative planning with group input",
      budgetApproach: "Balanced with emphasis on experiences",
      accommodationStyle: "Local homestays and cultural accommodation",
      travelCompanions: [
        "Large groups",
        "Cultural exchange partners",
        "Community groups",
      ],
    },
    imageUrl: "/images/enfj-character.svg",
  },

  ENFP: {
    code: "ENFP",
    name: "The Campaigner",
    description:
      "Enthusiastic and creative travelers who seek authentic experiences and human connections.",
    characteristics: [
      "Enthusiastic exploration",
      "Authentic experiences",
      "Creative adventures",
      "Human connections",
      "Spontaneous fun",
    ],
    travelStyle: {
      preferences: ["Authenticity", "Creativity", "Human connection"],
      destinations: [
        "Vibrant cities",
        "Artistic communities",
        "Festival locations",
      ],
      activities: [
        "Festivals",
        "Art scenes",
        "Local culture",
        "Adventure sports",
      ],
      planningStyle: "Spontaneous with some loose planning",
      budgetApproach: "Experience-focused spending",
      accommodationStyle: "Unique and authentic places",
      travelCompanions: ["Friends", "Fellow adventurers", "Local communities"],
    },
    imageUrl: "/images/enfp-character.svg",
  },

  INFJ: {
    code: "INFJ",
    name: "The Advocate",
    description:
      "Thoughtful and purposeful travelers who seek deep, transformative experiences.",
    characteristics: [
      "Purposeful journeys",
      "Deep reflection",
      "Transformative experiences",
      "Meaningful connections",
      "Personal growth",
    ],
    travelStyle: {
      preferences: ["Purpose", "Transformation", "Deep meaning"],
      destinations: [
        "Spiritual sites",
        "Natural retreats",
        "Historical significance",
      ],
      activities: [
        "Meditation",
        "Reflection",
        "Spiritual practices",
        "Nature connection",
      ],
      planningStyle: "Thoughtful and purposeful planning",
      budgetApproach: "Mindful spending on meaningful experiences",
      accommodationStyle: "Peaceful and contemplative spaces",
      travelCompanions: [
        "Solo travel",
        "Kindred spirits",
        "Small meaningful groups",
      ],
    },
    imageUrl: "/images/infj-character.svg",
  },

  INFP: {
    code: "INFP",
    name: "The Mediator",
    description:
      "Values-driven and authentic travelers who seek personal meaning and creative inspiration.",
    characteristics: [
      "Values alignment",
      "Creative inspiration",
      "Authentic experiences",
      "Personal meaning",
      "Gentle exploration",
    ],
    travelStyle: {
      preferences: ["Authenticity", "Values alignment", "Creative inspiration"],
      destinations: ["Artistic locations", "Natural beauty", "Peaceful places"],
      activities: [
        "Creative pursuits",
        "Nature photography",
        "Local crafts",
        "Quiet exploration",
      ],
      planningStyle: "Flexible with personal meaning focus",
      budgetApproach: "Thoughtful spending aligned with values",
      accommodationStyle: "Authentic and value-aligned places",
      travelCompanions: [
        "Solo travel",
        "Close friends",
        "Like-minded travelers",
      ],
    },
    imageUrl: "/images/infp-character.svg",
  },

  // Sentinels (SJ)
  ESTJ: {
    code: "ESTJ",
    name: "The Executive",
    description:
      "Organized and efficient travelers who prefer structured trips with clear objectives.",
    characteristics: [
      "Organized efficiency",
      "Clear objectives",
      "Group leadership",
      "Practical planning",
      "Time management",
    ],
    travelStyle: {
      preferences: ["Organization", "Efficiency", "Clear planning"],
      destinations: [
        "Well-established destinations",
        "Historical sites",
        "Business centers",
      ],
      activities: [
        "Guided tours",
        "Organized activities",
        "Historical exploration",
        "Cultural sites",
      ],
      planningStyle: "Highly organized with detailed schedules",
      budgetApproach: "Practical and well-budgeted",
      accommodationStyle: "Reliable hotels with good service",
      travelCompanions: ["Family", "Organized groups", "Business associates"],
    },
    imageUrl: "/images/estj-character.svg",
  },

  ESFJ: {
    code: "ESFJ",
    name: "The Consul",
    description:
      "Caring and social travelers who focus on group harmony and shared experiences.",
    characteristics: [
      "Group harmony",
      "Social connection",
      "Caring support",
      "Shared experiences",
      "Cultural appreciation",
    ],
    travelStyle: {
      preferences: [
        "Group harmony",
        "Social experiences",
        "Cultural appreciation",
      ],
      destinations: [
        "Popular destinations",
        "Cultural sites",
        "Family-friendly locations",
      ],
      activities: [
        "Group dining",
        "Cultural shows",
        "Shopping",
        "Social activities",
      ],
      planningStyle: "Considerate planning for group needs",
      budgetApproach: "Fair and inclusive for all group members",
      accommodationStyle: "Comfortable accommodations for everyone",
      travelCompanions: ["Family", "Friends", "Social groups"],
    },
    imageUrl: "/images/esfj-character.svg",
  },

  ISTJ: {
    code: "ISTJ",
    name: "The Logistician",
    description:
      "Reliable and methodical travelers who prefer tried-and-true destinations with historical significance.",
    characteristics: [
      "Methodical planning",
      "Historical appreciation",
      "Reliable execution",
      "Traditional values",
      "Detailed preparation",
    ],
    travelStyle: {
      preferences: ["Reliability", "Tradition", "Historical significance"],
      destinations: [
        "Historical landmarks",
        "Well-established destinations",
        "Cultural heritage sites",
      ],
      activities: [
        "Historical tours",
        "Museums",
        "Traditional experiences",
        "Educational activities",
      ],
      planningStyle: "Detailed and traditional planning approach",
      budgetApproach: "Conservative and well-planned budget",
      accommodationStyle: "Traditional hotels with proven quality",
      travelCompanions: ["Family", "Long-term friends", "Traditional groups"],
    },
    imageUrl: "/images/istj-character.svg",
  },

  ISFJ: {
    code: "ISFJ",
    name: "The Protector",
    description:
      "Caring and considerate travelers who prioritize comfort and meaningful connections.",
    characteristics: [
      "Caring consideration",
      "Comfort prioritization",
      "Meaningful connections",
      "Safety focus",
      "Service orientation",
    ],
    travelStyle: {
      preferences: ["Comfort", "Safety", "Meaningful connections"],
      destinations: [
        "Safe destinations",
        "Comfortable locations",
        "Family-friendly places",
      ],
      activities: [
        "Relaxation",
        "Local culture",
        "Family activities",
        "Gentle exploration",
      ],
      planningStyle: "Careful planning with safety and comfort focus",
      budgetApproach: "Practical with emphasis on comfort and safety",
      accommodationStyle: "Comfortable and safe accommodations",
      travelCompanions: ["Family", "Close friends", "Loved ones"],
    },
    imageUrl: "/images/isfj-character.svg",
  },

  // Explorers (SP)
  ESTP: {
    code: "ESTP",
    name: "The Entrepreneur",
    description:
      "Bold and adaptable travelers who seek excitement and hands-on adventures.",
    characteristics: [
      "Bold adventures",
      "Adaptability",
      "Hands-on experiences",
      "Excitement seeking",
      "Social energy",
    ],
    travelStyle: {
      preferences: ["Adventure", "Excitement", "Hands-on experiences"],
      destinations: [
        "Adventure hotspots",
        "Active destinations",
        "Vibrant cities",
      ],
      activities: [
        "Extreme sports",
        "Adventure activities",
        "Nightlife",
        "Active exploration",
      ],
      planningStyle: "Minimal planning with maximum flexibility",
      budgetApproach: "Spontaneous spending on adventures",
      accommodationStyle: "Active and social accommodations",
      travelCompanions: [
        "Adventure buddies",
        "Active groups",
        "Fellow thrill-seekers",
      ],
    },
    imageUrl: "/images/estp-character.svg",
  },

  ESFP: {
    code: "ESFP",
    name: "The Entertainer",
    description:
      "Spontaneous and fun-loving travelers who enjoy people, experiences, and living in the moment.",
    characteristics: [
      "Spontaneous fun",
      "People enjoyment",
      "Living in the moment",
      "Experience focus",
      "Social connection",
    ],
    travelStyle: {
      preferences: ["Fun", "Spontaneity", "Social experiences"],
      destinations: [
        "Fun destinations",
        "Social hotspots",
        "Entertainment centers",
      ],
      activities: ["Parties", "Shows", "Social events", "Entertainment"],
      planningStyle: "Spontaneous with focus on fun",
      budgetApproach: "Experience-focused with social activities",
      accommodationStyle: "Fun and social accommodations",
      travelCompanions: ["Friends", "Party groups", "Social circles"],
    },
    imageUrl: "/images/esfp-character.svg",
  },

  ISTP: {
    code: "ISTP",
    name: "The Virtuoso",
    description:
      "Independent and practical travelers who enjoy hands-on exploration and mechanical challenges.",
    characteristics: [
      "Independent exploration",
      "Practical skills",
      "Hands-on learning",
      "Mechanical interest",
      "Quiet observation",
    ],
    travelStyle: {
      preferences: [
        "Independence",
        "Hands-on experiences",
        "Practical exploration",
      ],
      destinations: [
        "Technical sites",
        "Natural environments",
        "Workshop locations",
      ],
      activities: [
        "Hands-on workshops",
        "Technical tours",
        "Outdoor skills",
        "Independent exploration",
      ],
      planningStyle: "Minimal structure with practical focus",
      budgetApproach: "Practical spending on useful experiences",
      accommodationStyle: "Simple but functional accommodations",
      travelCompanions: ["Solo travel", "Small groups", "Fellow practitioners"],
    },
    imageUrl: "/images/istp-character.svg",
  },

  ISFP: {
    code: "ISFP",
    name: "The Adventurer",
    description:
      "Gentle and artistic travelers who seek beauty, harmony, and personal expression.",
    characteristics: [
      "Gentle exploration",
      "Artistic appreciation",
      "Beauty seeking",
      "Harmony focus",
      "Personal expression",
    ],
    travelStyle: {
      preferences: ["Beauty", "Harmony", "Artistic expression"],
      destinations: [
        "Beautiful landscapes",
        "Artistic locations",
        "Peaceful places",
      ],
      activities: [
        "Art appreciation",
        "Photography",
        "Creative pursuits",
        "Nature connection",
      ],
      planningStyle: "Gentle planning with aesthetic focus",
      budgetApproach: "Value-conscious with beauty appreciation",
      accommodationStyle: "Beautiful and harmonious accommodations",
      travelCompanions: ["Solo travel", "Close friends", "Artistic companions"],
    },
    imageUrl: "/images/isfp-character.svg",
  },
};

export default mbtiTypes;
