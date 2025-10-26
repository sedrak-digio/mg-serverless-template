import { GoogleGenAI } from "@google/genai";

export interface InlineFile {
  mimeType: string;
  data: string; // base64 encoded
}

export class GeminiService {
  private ai: GoogleGenAI;
  private model: string = "gemini-2.5-flash";

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set");
    }
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generateContent(prompt: string, systemInstruction?: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: this.model,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        thinkingConfig: {
          thinkingBudget: 0, // Disable thinking for faster responses
        },
      },
    });

    return response.text;
  }

  async generateContentWithFiles(
    prompt: string,
    files: InlineFile[],
    systemInstruction?: string
  ): Promise<string> {
    // Build content parts with inline data (base64)
    const fileParts = files.map((file) => ({
      inlineData: {
        mimeType: file.mimeType,
        data: file.data,
      },
    }));

    const response = await this.ai.models.generateContent({
      model: this.model,
      contents: [{ text: prompt }, ...fileParts],
      config: {
        systemInstruction: systemInstruction,
        thinkingConfig: {
          thinkingBudget: 0, // Disable thinking for faster responses
        },
      },
    });

    return response.text;
  }
}
