export interface GeminiTextRequest {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}

export interface GeminiImageRequest {
  prompt: string;
  width?: number;
  height?: number;
}

export interface GeminiTextResponse {
  text: string;
  error?: string;
}

export interface GeminiImageResponse {
  imageUrl: string;
  error?: string;
}
