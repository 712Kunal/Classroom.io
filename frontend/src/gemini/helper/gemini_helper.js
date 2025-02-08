import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE
  }
];

const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
  systemInstruction:
    'Keep a soft and assistive tone, imagine you are an assistant to help the user solve or understand or figure out the answer to his query',
  safetySettings
});

const history = [
  {
    role: 'user',
    parts: [
      {
        text: 'Please generate an answer for the below mentioned user\'s query based on the pathway provided below as context\n\nUser Query: "I want to know when will I be able to complete the task 3"\n\npathway: "{\n  "description": "90-day learning pathway for Basic React tailored to a 21-year-old male Computer Science student in Pune, India, who prefers video tutorials.",\n  "duration": 90,\n  "intervalType": "week",\n  "intervals": 13,\n  "pathway": [\n    {\n      "intervalNumber": 1,\n      "summary": "Introduction to React and Setting up Development Environment",\n      "tasks": [\n        {\n          "description": "Learn about React\'s core concepts and its benefits.",\n          "expectedOutcome": "Understand what React is and why it\'s used.",\n          "resources": [\n            {\n              "link": "https://www.youtube.com/watch?v=Ke90Tje7VS0",\n              "title": "React JS Tutorial for Beginners",\n              "type": "video tutorial"\n            }\n          ],\n          "taskNumber": 1,\n          "taskTitle": "Introduction to React"\n        },\n        {\n          "description": "Set up Node.js, npm, and create a new React application using create-react-app.",\n          "expectedOutcome": "A working React development environment.",\n          "resources": [\n            {\n              "link": "https://www.youtube.com/watch?v=j942wKiXFu8",\n              "title": "Setting Up a React Development Environment",\n              "type": "video tutorial"\n            }\n          ],\n          "taskNumber": 2,\n          "taskTitle": "Setting Up the Environment"\n        }\n      ]\n    },\n    {\n      "intervalNumber": 2,\n      "summary": "JSX and Components",\n      "tasks": [\n        {\n          "description": "Learn JSX syntax and how to write HTML-like structures in JavaScript.",\n          "expectedOutcome": "Ability to write JSX code.",\n          "resources": [\n            {\n              "link": "https://www.youtube.com/watch?v=PjX8JEK3yKE",\n              "title": "Understanding JSX in React",\n              "type": "video tutorial"\n            }\n          ],\n          "taskNumber": 1,\n          "taskTitle": "Understanding JSX"\n        },\n        {\n          "description": "Learn about functional and class components and how to create them.",\n          "expectedOutcome": "Ability to create functional and class components.",\n          "resources": [\n            {\n              "link": "https://www.youtube.com/watch?v=qVVV9_19vK4",\n              "title": "React Components: Functional vs Class",\n              "type": "video tutorial"\n            }\n          ],\n          "taskNumber": 2,\n          "taskTitle": "Creating React Components"\n        }\n      ]\n    },\n    {\n      "intervalNumber": 3,\n      "summary": "Props and State",\n      "tasks": [\n        {\n          "description": "Learn how to pass data from parent to child components using props.",\n          "expectedOutcome": "Ability to pass data down the component tree.",\n          "resources": [\n            {\n              "link": "https://www.youtube.com/watch?v=KhJyrJzVl4M",\n              "title": "React Props Explained",\n              "type": "video tutorial"\n            }\n          ],\n          "taskNumber": 1,\n          "taskTitle": "Working with Props"\n        },\n        {\n          "description": "Learn how to manage component-specific data using state.",\n          "expectedOutcome": "Ability to manage state within a component.",\n          "resources": [\n            {\n              "link": "https://www.youtube.com/watch?v=O6P86uwfdR0",\n              "title": "Understanding React State",\n              "type": "video tutorial"\n            }\n          ],\n          "taskNumber": 2,\n          "taskTitle": "Managing State in React"\n        }\n      ]\n    },\n    {\n      "intervalNumber": 4,\n      "summary": "Handling Events",\n      "tasks": [\n        {\n          "description": "Learn how to handle user events like clicks, form submissions, etc.",\n          "expectedOutcome": "Ability to handle user interactions in React.",\n          "resources": [\n            {\n              "link": "https://www.youtube.com/watch?v=4l-r8Du9n-8",\n              "title": "Handling Events in React",\n              "type": "video tutorial"\n            }\n          ],\n          "taskNumber": 1,\n          "taskTitle": "Event Handling"\n        }\n      ]\n    },\n    {\n      "intervalNumber": 5,\n      "summary": "Conditional Rendering",\n      "tasks": [\n        {\n          "description": "Learn how to conditionally render different elements based on state or props.",\n          "expectedOutcome": "Ability to show or hide elements based on conditions.",\n          "resources": [\n            {\n              "link": "https://www.youtube.com/watch?v=t1wcQn7UEnQ",\n              "title": "Conditional Rendering in React",\n              "type": "video tutorial"\n            }\n          ],\n          "taskNumber": 1,\n          "taskTitle": "Conditional Rendering"\n        }\n      ]\n    },\n    {\n      "intervalNumber": 6,\n      "summary": "Lists and Keys",\n      "tasks": [\n        {\n          "description": "Learn how to render lists of data dynamically using map and provide unique keys.",\n          "expectedOutcome": "Ability to render lists of data efficiently.",\n          "resources": [\n            {\n              "link": "https://www.youtube.com/watch?v=y0CjfzT6rnc",\n              "title": "Rendering Lists in React with Keys",\n              "type": "video tutorial"\n            }\n          ],\n          "taskNumber": 1,\n          "taskTitle": "Rendering Lists"\n        }\n      ]\n    },\n    {\n      "intervalNumber": 7,\n      "summary": "Forms in React",\n      "tasks": [\n        {\n          "description": "Learn how to create and handle forms in React, including controlled and uncontrolled components.",\n          "expectedOutcome": "Ability to create and manage forms.",\n          "resources": [\n            {\n              "link": "https://www.youtube.com/watch?v=iP1t6S7xOic",\n              "title": "React Forms Tutorial",\n              "type": "video tutorial"\n            }\n          ],\n          "taskNumber": 1,\n          "taskTitle": "Handling Forms"\n        }\n      ]\n    },\n    {\n      "intervalNumber": 8,\n      "summary": "React Hooks (useState and useEffect)",\n      "tasks": [\n        {\n          "description": "Learn the basics of React Hooks, focusing on useState for state management and useEffect for side effects.",\n          "expectedOutcome": "Ability to use useState and useEffect hooks.",\n          "resources": [\n            {\n              "link": "https://www.youtube.com/watch?v=KJP1E-Yjugg",\n              "title": "React Hooks Tutorial",\n              "type": "video tutorial"\n            }\n          ],\n          "taskNumber": 1,\n          "taskTitle": "Introduction to Hooks"\n        }\n      ]\n    },\n    {\n      "intervalNumber": 9,\n      "summary": "Styling React Components",\n      "tasks": [\n        {\n          "description": "Explore different ways to style React components: inline styles, CSS stylesheets, and CSS modules.",\n          "expectedOutcome": "Ability to style React components effectively.",\n          "resources": [\n            {\n              "link": "https://www.youtube.com/watch?v=hkMzYkNWNtc",\n              "title": "Styling React Components",\n              "type": "video tutorial"\n            }\n          ],\n          "taskNumber": 1,\n          "taskTitle": "Styling Techniques"\n        }\n      ]\n    },\n    {\n      "intervalNumber": 10,\n      "summary": "Fetching Data with useEffect",\n      "tasks": [\n        {\n          "description": "Learn how to fetch data from an API using useEffect and update the component\'s state.",\n          "expectedOutcome": "Ability to fetch and display data from an API.",\n          "resources": [\n            {\n              "link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",\n              "title": "Fetching Data with useEffect",\n              "type": "video tutorial"\n            }\n          ],\n          "taskNumber": 1,\n          "taskTitle": "Fetching Data"\n        }\n      ]\n    },\n    {\n      "intervalNumber": 11,\n      "summary": "Simple React Project - Todo App (Part 1)",\n      "tasks": [\n        {\n          "description": "Start building a simple Todo app to consolidate learned concepts. Implement adding tasks.",\n          "expectedOutcome": "A functional Todo app with task adding capability.",\n          "resources": [\n            {\n              "link": "https://www.youtube.com/watch?v=hQAHSlcmYcU",\n              "title": "Build a React Todo App (Part 1)",\n              "type": "video tutorial"\n            }\n          ],\n          "taskNumber": 1,\n          "taskTitle": "Todo App - Adding Tasks"\n        }\n      ]\n    },\n    {\n      "intervalNumber": 12,\n      "summary": "Simple React Project - Todo App (Part 2)",\n      "tasks": [\n        {\n          "description": "Continue building the Todo app. Implement deleting and completing tasks.",\n          "expectedOutcome": "A complete Todo app with add, delete, and complete functionalities.",\n          "resources": [\n            {\n              "link": "https://www.youtube.com/watch?v=wBk2W01gUog",\n              "title": "Build a React Todo App (Part 2)",\n              "type": "video tutorial"\n            }\n          ],\n          "taskNumber": 1,\n          "taskTitle": "Todo App - Deleting and Completing Tasks"\n        }\n      ]\n    },\n    {\n      "intervalNumber": 13,\n      "summary": "Review and Practice",\n      "tasks": [\n        {\n          "description": "Review all concepts learned over the past 12 weeks. Build another small project or refactor the Todo app.",\n          "expectedOutcome": "Solid understanding of React basics and ability to apply them.",\n          "resources": [\n            {\n              "link": "https://react.dev/",\n              "title": "React Official Documentation",\n              "type": "documentation"\n            }\n          ],\n          "taskNumber": 1,\n          "taskTitle": "Review and Practice"\n        }\n      ]\n    }\n  ],\n  "topic": "Basic React"\n}"'
      }
    ]
  },
  {
    role: 'model',
    parts: [
      {
        text: "Okay, I can help you figure that out! Based on the pathway you've provided, could you please clarify which task 3 you are referring to? Since each week/interval has its own set of tasks numbered from 1, it will help to know the context or the week number to give you a precise answer."
      }
    ]
  }
];

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
  maxOutputTokens: 2000
};

/* async function run() {
  const chatSession = model.startChat({
    generationConfig,
    history: history,
  });

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  console.log(result.response.text());
} */

async function initialiseChatSession() {
  const chatSession = model.startChat({
    generationConfig,
    history: history
  });

  return chatSession;
}

async function generateHelperResponse(chatSession, pathway, prompt) {
  try {
    const input = formulateHelperPrompt(pathway, prompt);

    const response = await chatSession.sendMessage(input);
    const result = response.response.text();

    return { result };
  } catch (error) {
    console.error('Error generating helper response:', error);
    throw new Error('Helper response generation failed. Please try again.');
  }
}

export { generateHelperResponse, initialiseChatSession };

function formulateHelperPrompt(pathway, prompt) {
  return `
  Generate a response to the user's query based on the provided pathway. 
  The user's query is: "${prompt}".
  The pathway is:
  ${JSON.stringify(pathway.data)}
  `;
}
