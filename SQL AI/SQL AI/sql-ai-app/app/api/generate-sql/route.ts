import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { schema, prompt, action } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured on the server." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    let systemPrompt = "";

    if (action === "auto-generate") {
      systemPrompt = `You are an expert SQL Data Analyst.
Your task is to analyze the provided database schema and generate a comprehensive list of 5-7 diverse SQL queries that demonstrate the full capabilities of SQL on this data.

Database Context Description:
${schema}

Instructions:
1. Generate queries covering: SELECT (Simple), SELECT (Aggregate), JOIN, UPDATE, DELETE, and Complex Filtering.
2. For each query, provide a clear explanation.
3. Return the result strictly as a vaid JSON array of objects.

Example Output format:
[
  {
    "type": "SELECT",
    "sql": "SELECT * FROM Users;",
    "explanation": "Selects all users."
  },
  {
    "type": "JOIN",
    "sql": "SELECT ... JOIN ...",
    "explanation": "Joins tables to show..."
  }
]
Do NOT use markdown code blocks. Just the raw JSON.`;
    } else {
      // Default: Specific Question
      systemPrompt = `You are an expert SQL Data Analyst.
Your task is to generate a valid SQL query based on the following database schema and user question.

Database Context Description:
${schema}

User Question: ${prompt}

Instructions:
1. Analyze the schema to match tables and columns correctly.
2. Generate the valid SQL query.
3. Provide a clear, concise explanation of how the query works.
4. Return the result strictly as a valid JSON object with keys "sql" and "explanation".
5. Do NOT use markdown code blocks (like \`\`\`json) in the response, just the raw JSON string.

Example Output format:
{
  "sql": "SELECT * FROM Users WHERE id = 1;",
  "explanation": "This query selects all columns from the Users table where the id is 1."
}
`;
    }

    const result = await model.generateContent(systemPrompt);
    const text = result.response.text();

    // Clean up just in case the model adds markdown
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

    let responseData;
    try {
      const parsed = JSON.parse(cleanText);
      // Normalize response to always be an array for the frontend if auto-generate, or single object if not
      if (action === "auto-generate") {
        // Ensure it's an array
        responseData = { results: Array.isArray(parsed) ? parsed : [parsed] };
      } else {
        responseData = parsed;
      }
    } catch (e) {
      // Fallback if model fails JSON structure
      console.error("JSON Parse Error", cleanText);
      responseData = {
        sql: cleanText,
        explanation: "Could not parse explanation. See raw output."
      };
    }

    return NextResponse.json(responseData);
  } catch (error: any) {
    console.error("Error generating SQL:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate SQL." },
      { status: 500 }
    );
  }
}
