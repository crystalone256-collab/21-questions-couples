export type Question = {
  id: number;
  category: string;
  text: string;
  options: string[];
};

export const QUESTIONS: Question[] = [
  { id: 1, category: "The little things", text: "What is my ideal way to spend a free afternoon?", options: ["Staying in and relaxing", "Going out and exploring", "Playing a sport or being active", "Catching up with friends"] },
  { id: 2, category: "Food & cravings", text: "If I could only pick one kind of food for a week, what would I choose?", options: ["Fast food", "Local/home-cooked food", "Pizza or pasta", "Something sweet and snacky"] },
  { id: 3, category: "Personality", text: "When I am quiet, what is most likely happening?", options: ["I am thinking about something", "I am tired and need a break", "Something is bothering me", "I am simply enjoying the silence"] },
  { id: 4, category: "Fun facts", text: "Which one sounds most like me at a party?", options: ["On the dance floor", "Making people laugh", "Talking to a few close people", "Finding the food first"] },
  { id: 5, category: "Everyday life", text: "What is most likely to make my day better?", options: ["A thoughtful message", "Good food", "A little unexpected adventure", "Time to rest"] },
  { id: 6, category: "Dreams", text: "What motivates me most when things get difficult?", options: ["My future goals", "The people I love", "My faith and values", "Proving to myself that I can do it"] },
  { id: 7, category: "Music", text: "What would I most likely choose to listen to?", options: ["Gospel or worship", "Afrobeats or dancehall", "R&B or love songs", "A bit of everything"] },
  { id: 8, category: "Communication", text: "When I have had a rough day, what do I usually need most?", options: ["Someone to listen", "Encouragement and reassurance", "Space to process things", "A distraction and some laughter"] },
  { id: 9, category: "Travel", text: "Which trip would excite me most?", options: ["A peaceful beach getaway", "A city full of things to explore", "A nature or mountain adventure", "A road trip with my favourite people"] },
  { id: 10, category: "Love language", text: "Which gesture would make me feel especially appreciated?", options: ["Quality time together", "Kind words and encouragement", "A thoughtful gift", "Practical help and little acts of care"] },
  { id: 11, category: "The future", text: "What is one thing I most want to achieve in life?", options: ["Build a meaningful career", "Make a difference in people's lives", "Create a loving home and family", "Explore the world and keep learning"] },
  { id: 12, category: "Little habits", text: "Which habit am I most likely to have?", options: ["Overthinking small things", "Making plans then changing them", "Losing track of time", "Remembering random details"] },
  { id: 13, category: "Friendship", text: "What do I value most in a close friendship?", options: ["Honesty, even when it is hard", "Loyalty and consistency", "Laughter and shared memories", "Being understood without explaining everything"] },
  { id: 14, category: "A perfect date", text: "Which date idea would I probably enjoy most?", options: ["A quiet dinner and deep conversation", "A fun activity or game", "A walk and a beautiful view", "A cosy movie night"] },
  { id: 15, category: "Faith & values", text: "What helps me feel grounded when life gets busy?", options: ["Prayer and time with God", "Talking to someone I trust", "Quiet time alone", "Writing, reflecting or journaling"] },
  { id: 16, category: "Funny choices", text: "If I suddenly became famous, what would it probably be for?", options: ["Something creative or entertaining", "My work or achievements", "A funny moment that went viral", "I would somehow avoid the spotlight"] },
  { id: 17, category: "Affection", text: "What kind of check-in would I appreciate most?", options: ["A simple 'How are you really?'", "A funny meme or random update", "A voice note or phone call", "A sweet good-morning or good-night text"] },
  { id: 18, category: "Challenges", text: "When we disagree, what matters most to me?", options: ["Talking it through calmly", "Having time to cool down first", "Knowing we are still on the same team", "Being honest about what hurt"] },
  { id: 19, category: "Bucket list", text: "Which experience would I love to have one day?", options: ["Visit a new country", "Start a project or business", "Help a community in a meaningful way", "Do something adventurous that scares me a little"] },
  { id: 20, category: "Us", text: "What do I think makes a connection strong?", options: ["Trust and honesty", "Effort from both people", "Laughter and friendship", "Faith, patience and understanding"] },
  { id: 21, category: "One last thing", text: "What would I choose for a perfect ending to a really good day?", options: ["A long conversation with someone special", "A peaceful moment to myself", "Laughing with friends", "A good meal and a good night's sleep"] }
];
