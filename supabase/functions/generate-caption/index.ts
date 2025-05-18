import { GeminiTextRequest, GeminiTextResponse } from "@shared/types.ts";

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
      },
      status: 200,
    });
  }

  try {
    const {
      prompt,
      maxTokens = 256,
      temperature = 0.7,
    } = (await req.json()) as GeminiTextRequest;

    if (!prompt) {
      throw new Error("Prompt is required");
    }

    // Call the Gemini API through PICA passthrough
    const response = await fetch(
      "https://api.pica.io/v1/gemini/generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Deno.env.get("PICA_SECRET_KEY")}`,
        },
        body: JSON.stringify({
          model: "gemini-1.5-flash",
          contents: [
            {
              parts: [
                {
                  text: `Generate an engaging Facebook caption for a business page about: ${prompt}. Include relevant hashtags and emojis.`,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: maxTokens,
            temperature: temperature,
          },
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to generate caption");
    }

    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const result: GeminiTextResponse = {
      text: generatedText,
    };

    return new Response(JSON.stringify(result), {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    const errorResponse: GeminiTextResponse = {
      text: "",
      error: error.message,
    };

    return new Response(JSON.stringify(errorResponse), {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      status: 400,
    });
  }
});
