import type { Question } from "../types";

export const questions: Question[] = [
  // Extraversion vs Introversion (E/I) - 4 questions
  {
    id: "q1",
    text: "When planning a trip, you prefer to:",
    dimension: "EI",
    answers: [
      {
        id: "q1a1",
        text: "Research and book group tours with lots of social activities",
        value: 2,
        dimension: "E",
      },
      {
        id: "q1a2",
        text: "Plan some group activities but also ensure quiet time alone",
        value: 0,
        dimension: "E",
      },
      {
        id: "q1a3",
        text: "Focus on solo experiences or very small, intimate groups",
        value: -2,
        dimension: "I",
      },
    ],
  },
  {
    id: "q2",
    text: "At your ideal travel destination, you would:",
    dimension: "EI",
    answers: [
      {
        id: "q2a1",
        text: "Seek out bustling markets, festivals, and social hotspots",
        value: 2,
        dimension: "E",
      },
      {
        id: "q2a2",
        text: "Balance popular attractions with quieter, less crowded spots",
        value: 0,
        dimension: "E",
      },
      {
        id: "q2a3",
        text: "Prefer secluded beaches, quiet museums, or peaceful nature walks",
        value: -2,
        dimension: "I",
      },
    ],
  },
  {
    id: "q3",
    text: "When meeting other travelers, you typically:",
    dimension: "EI",
    answers: [
      {
        id: "q3a1",
        text: "Easily strike up conversations and make new friends",
        value: 2,
        dimension: "E",
      },
      {
        id: "q3a2",
        text: "Are friendly but selective about who you spend time with",
        value: 0,
        dimension: "E",
      },
      {
        id: "q3a3",
        text: "Prefer to observe and connect with just a few people deeply",
        value: -2,
        dimension: "I",
      },
    ],
  },
  {
    id: "q4",
    text: "After a full day of traveling and sightseeing, you:",
    dimension: "EI",
    answers: [
      {
        id: "q4a1",
        text: "Feel energized and want to explore nightlife or social venues",
        value: 2,
        dimension: "E",
      },
      {
        id: "q4a2",
        text: "Enjoy a good meal and some social time before resting",
        value: 0,
        dimension: "E",
      },
      {
        id: "q4a3",
        text: "Need quiet time alone to recharge and process the day",
        value: -2,
        dimension: "I",
      },
    ],
  },

  // Sensing vs iNtuition (S/N) - 5 questions
  {
    id: "q5",
    text: "When choosing a destination, what appeals to you most?",
    dimension: "SN",
    answers: [
      {
        id: "q5a1",
        text: "Concrete experiences: great food, comfortable hotels, proven attractions",
        value: 2,
        dimension: "S",
      },
      {
        id: "q5a2",
        text: "A mix of must-see sights and opportunities for discovery",
        value: 0,
        dimension: "S",
      },
      {
        id: "q5a3",
        text: "The potential for unique experiences and hidden meanings",
        value: -2,
        dimension: "N",
      },
    ],
  },
  {
    id: "q6",
    text: "Your ideal travel guide would:",
    dimension: "SN",
    answers: [
      {
        id: "q6a1",
        text: "Provide detailed facts, practical tips, and tried-and-true recommendations",
        value: 2,
        dimension: "S",
      },
      {
        id: "q6a2",
        text: "Offer both essential information and some creative suggestions",
        value: 0,
        dimension: "S",
      },
      {
        id: "q6a3",
        text: "Inspire with stories, possibilities, and unconventional perspectives",
        value: -2,
        dimension: "N",
      },
    ],
  },
  {
    id: "q7",
    text: "When exploring a new city, you prefer to:",
    dimension: "SN",
    answers: [
      {
        id: "q7a1",
        text: "Follow recommended routes and visit all the main landmarks",
        value: 2,
        dimension: "S",
      },
      {
        id: "q7a2",
        text: "See key sights but also allow time for spontaneous discoveries",
        value: 0,
        dimension: "S",
      },
      {
        id: "q7a3",
        text: "Wander freely and see where your curiosity leads you",
        value: -2,
        dimension: "N",
      },
    ],
  },
  {
    id: "q8",
    text: "What type of cultural experience excites you most?",
    dimension: "SN",
    answers: [
      {
        id: "q8a1",
        text: "Hands-on workshops, cooking classes, or traditional crafts",
        value: 2,
        dimension: "S",
      },
      {
        id: "q8a2",
        text: "A combination of interactive experiences and learning opportunities",
        value: 0,
        dimension: "S",
      },
      {
        id: "q8a3",
        text: "Abstract art galleries, philosophical discussions, or spiritual retreats",
        value: -2,
        dimension: "N",
      },
    ],
  },
  {
    id: "q9",
    text: "When documenting your travels, you focus on:",
    dimension: "SN",
    answers: [
      {
        id: "q9a1",
        text: "Specific details: what you ate, where you stayed, practical observations",
        value: 2,
        dimension: "S",
      },
      {
        id: "q9a2",
        text: "Both concrete memories and emotional impressions",
        value: 0,
        dimension: "S",
      },
      {
        id: "q9a3",
        text: "The deeper meaning, connections, and transformative insights",
        value: -2,
        dimension: "N",
      },
    ],
  },

  // Thinking vs Feeling (T/F) - 5 questions
  {
    id: "q10",
    text: "When choosing between two travel options, you typically:",
    dimension: "TF",
    answers: [
      {
        id: "q10a1",
        text: "Compare costs, benefits, and logical pros and cons",
        value: 2,
        dimension: "T",
      },
      {
        id: "q10a2",
        text: "Consider both practical factors and how each option feels",
        value: 0,
        dimension: "T",
      },
      {
        id: "q10a3",
        text: "Go with what feels right and aligns with your values",
        value: -2,
        dimension: "F",
      },
    ],
  },
  {
    id: "q11",
    text: "If something goes wrong during your trip, you:",
    dimension: "TF",
    answers: [
      {
        id: "q11a1",
        text: "Analyze the problem objectively and find the most efficient solution",
        value: 2,
        dimension: "T",
      },
      {
        id: "q11a2",
        text: "Address the practical issues while considering everyone's feelings",
        value: 0,
        dimension: "T",
      },
      {
        id: "q11a3",
        text: "Focus on maintaining harmony and ensuring everyone feels supported",
        value: -2,
        dimension: "F",
      },
    ],
  },
  {
    id: "q12",
    text: "When choosing travel companions, you prioritize:",
    dimension: "TF",
    answers: [
      {
        id: "q12a1",
        text: "People who are reliable, punctual, and share similar travel goals",
        value: 2,
        dimension: "T",
      },
      {
        id: "q12a2",
        text: "A balance of compatibility and shared interests",
        value: 0,
        dimension: "T",
      },
      {
        id: "q12a3",
        text: "People you connect with emotionally and who share your values",
        value: -2,
        dimension: "F",
      },
    ],
  },
  {
    id: "q13",
    text: "Your approach to travel budgeting is:",
    dimension: "TF",
    answers: [
      {
        id: "q13a1",
        text: "Methodical and data-driven, optimizing value for money",
        value: 2,
        dimension: "T",
      },
      {
        id: "q13a2",
        text: "Practical but flexible based on circumstances",
        value: 0,
        dimension: "T",
      },
      {
        id: "q13a3",
        text: "Flexible and values-based, spending on what matters to you personally",
        value: -2,
        dimension: "F",
      },
    ],
  },
  {
    id: "q14",
    text: "When interacting with locals, you're most interested in:",
    dimension: "TF",
    answers: [
      {
        id: "q14a1",
        text: "Learning about systems, economics, and how things work",
        value: 2,
        dimension: "T",
      },
      {
        id: "q14a2",
        text: "Understanding both cultural systems and personal stories",
        value: 0,
        dimension: "T",
      },
      {
        id: "q14a3",
        text: "Personal stories, emotions, and human connections",
        value: -2,
        dimension: "F",
      },
    ],
  },

  // Judging vs Perceiving (J/P) - 4 questions
  {
    id: "q15",
    text: "Your ideal travel style involves:",
    dimension: "JP",
    answers: [
      {
        id: "q15a1",
        text: "Detailed itineraries planned well in advance",
        value: 2,
        dimension: "J",
      },
      {
        id: "q15a2",
        text: "A rough framework with some flexibility built in",
        value: 0,
        dimension: "J",
      },
      {
        id: "q15a3",
        text: "Minimal planning and maximum spontaneity",
        value: -2,
        dimension: "P",
      },
    ],
  },
  {
    id: "q16",
    text: "When your travel plans get disrupted, you:",
    dimension: "JP",
    answers: [
      {
        id: "q16a1",
        text: "Feel stressed and work quickly to restore order and structure",
        value: 2,
        dimension: "J",
      },
      {
        id: "q16a2",
        text: "Adapt reasonably well while trying to maintain some structure",
        value: 0,
        dimension: "J",
      },
      {
        id: "q16a3",
        text: "See it as an adventure and opportunity for unexpected discoveries",
        value: -2,
        dimension: "P",
      },
    ],
  },
  {
    id: "q17",
    text: "Your packing style is:",
    dimension: "JP",
    answers: [
      {
        id: "q17a1",
        text: "Organized lists, everything planned and packed days in advance",
        value: 2,
        dimension: "J",
      },
      {
        id: "q17a2",
        text: "Generally organized but might pack some things last minute",
        value: 0,
        dimension: "J",
      },
      {
        id: "q17a3",
        text: "Last-minute packing, bringing what feels right in the moment",
        value: -2,
        dimension: "P",
      },
    ],
  },
  {
    id: "q18",
    text: "During your trip, you prefer to:",
    dimension: "JP",
    answers: [
      {
        id: "q18a1",
        text: "Stick to your planned schedule and check things off your list",
        value: 2,
        dimension: "J",
      },
      {
        id: "q18a2",
        text: "Follow your plan but remain open to interesting opportunities",
        value: 0,
        dimension: "J",
      },
      {
        id: "q18a3",
        text: "Let each day unfold naturally based on your mood and discoveries",
        value: -2,
        dimension: "P",
      },
    ],
  },
];

// Export question groups for easier access during testing
export const questionsByDimension = {
  EI: questions.filter((q) => q.dimension === "EI"),
  SN: questions.filter((q) => q.dimension === "SN"),
  TF: questions.filter((q) => q.dimension === "TF"),
  JP: questions.filter((q) => q.dimension === "JP"),
};

export const totalQuestions = questions.length;
