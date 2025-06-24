import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateBlogContentWithGemini(
  prompt: string,
): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Gemini API Key is not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY in your environment variables.",
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", // You can experiment with other models like 'gemini-1.5-pro' for potentially higher quality but slower generation.
    generationConfig: {
      temperature: 0.7, // Adjust temperature for creativity (0.0 - 1.0)
      topP: 0.95,
      topK: 60,
    },
  });

  const systemPrompt = `
      You are a professional blog content writer. Generate high-quality blog content **strictly in HTML format, without any markdown code blocks (e.g., \`\`\`html\`\`\`) or extra text outside the HTML**.
      
      Requirements:
      - Use ONLY the following HTML tags: <section>, <h2>, <p>, <strong>, <ul>, <ol>, <li>, <table>, <tr>, <th>, <td>, <tbody>, <thead>
      - Structure content with multiple sections using <section> tags.
      - Use ONLY <h2> for headings.
      - Use <strong> tags to emphasize important points.
      - Use <table> for tabular data and <ul> or <ol> for lists where appropriate.
      - DO NOT include <img> tags.
      - Write comprehensive, engaging content.
      - Make it informative and well-structured.
      - Length should be substantial (1000+ words equivalent)
      
      Topic: ${prompt}
      
      Generate blog content following the exact HTML structure requirements. The content should be detailed and broken into multiple sections.
    `;

  try {
    const result = await model.generateContent(systemPrompt);
    const response = result.response;
    let text = response.text();

    if (text.startsWith("```html")) {
      text = text.substring(7); // Remove "```html"
    }
    if (text.endsWith("```")) {
      text = text.substring(0, text.length - 3); // Remove "```"
    }
    text = text.trim();

    return text;
  } catch (error) {
    console.error("Error generating blog content with Gemini:", error);
    throw new Error("Failed to generate blog content. Please try again.");
  }
}
