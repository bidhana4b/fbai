import { GeminiImageRequest, GeminiImageResponse } from "@shared/types.ts";

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
      width = 1024,
      height = 1024,
    } = (await req.json()) as GeminiImageRequest;

    if (!prompt) {
      throw new Error("Prompt is required");
    }

    // Call the Gemini API through PICA passthrough for image generation
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
                  text: `Generate a high-quality image for a Facebook post about: ${prompt}. The image should be visually appealing and relevant to the topic.`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.9,
          },
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to generate image");
    }

    // For now, we'll use a placeholder image since Gemini doesn't directly generate images
    // In a real implementation, you might use another service like DALL-E through PICA
    const imageUrl = `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(prompt)}&width=${width}&height=${height}`;

    const result: GeminiImageResponse = {
      imageUrl: imageUrl,
    };

    return new Response(JSON.stringify(result), {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    const errorResponse: GeminiImageResponse = {
      imageUrl: "",
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
