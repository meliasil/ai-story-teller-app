import {
  GenerateContentCandidate,
  GoogleGenerativeAI,
} from "@google/generative-ai";
import type { NextApiRequest, NextApiResponse } from "next";

interface BodyI {
  prompt: string;
}

interface ApiResponse {
  ok: boolean;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method === "POST") {
    const { prompt } = req.body as BodyI;
    if (!prompt) {
      return res.status(400).json({ ok: false, message: "Body mancante" });
    }

    try {
      if (process.env.NEXT_PUBLIC_GEMINI_KEY) {
        const genAI = new GoogleGenerativeAI(
          process.env.NEXT_PUBLIC_GEMINI_KEY
        );
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);

        const output = (
          result.response.candidates as GenerateContentCandidate[]
        )[0].content.parts[0].text;

        if (output) {
          return res.status(200).json({ ok: true, message: output });
        } else {
          return res
            .status(400)
            .json({ ok: false, message: "No output generated." });
        }
      } else {
        return res
          .status(400)
          .json({ ok: false, message: "Errore nella generazione (else)" });
      }
    } catch (e) {
      console.error(e);
      return res
        .status(400)
        .json({ ok: false, message: "Errore nella generazione" });
    }
  } else {
    return res.status(405).json({ ok: false, message: "Metodo non gestito" });
  }
}
