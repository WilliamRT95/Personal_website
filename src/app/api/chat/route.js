import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { message } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers,
      });
    }

    // Initialize Google AI with your API key
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        maxOutputTokens: 150, // Limits response length to ~1-2 sentences
      },
    });

    // Construct the prompt with your system message and user input
    const prompt = `
      You are Guillem's assistant and he is your developer. Follow these rules:
      - Respond in 1-2 sentences
      - You are on www.guillemrt.com
      - Guillem is a former SDR manager turned Web developer specialized in (Next.js, React, JS, TailwindCSS and AI implementatiom).
      - This is my linkedin: https://www.linkedin.com/in/guillem-rtomas/ show it if someone is interested in contacting me.
      - You can reply to questions about any topic.
      
      User message: ${message}
    `;

    // Generate the response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const reply = response.text();

    return new Response(JSON.stringify({ message: reply }), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Google AI error:", error);
    return new Response(
      JSON.stringify({
        error: error.message.includes("quota")
          ? "We've reached our usage limit. Please try again later."
          : "An unexpected error occurred",
      }),
      {
        status: error.message.includes("quota") ? 429 : 500,
        headers,
      }
    );
  }
}
