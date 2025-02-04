// Define your models here.
export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
  experimental: boolean;
  contextWindow: string;
}

export const models: Array<Model> = [
  {
    id: "gemma2-9b-it",
    label: "Gemma 2.9B",
    apiIdentifier: "gemma2-9b-it",
    description: "Google's Gemma model for general-purpose tasks",
    experimental: false,
    contextWindow: "8,192",
  },
  {
    id: "llama-3.3-70b-versatile",
    label: "Llama 3.3 70B Versatile",
    apiIdentifier: "llama-3.3-70b-versatile",
    description: "Meta's versatile model for complex tasks",
    experimental: false,
    contextWindow: "128k",
  },
  {
    id: "llama-3.1-8b-instant",
    label: "Llama 3.1 8B Instant",
    apiIdentifier: "llama-3.1-8b-instant",
    description: "Fast response model for lightweight tasks",
    experimental: false,
    contextWindow: "128k",
  },
  {
    id: "llama-guard-3-8b",
    label: "Llama Guard 3 8B",
    apiIdentifier: "llama-guard-3-8b",
    description: "Specialized for safety and content moderation",
    experimental: false,
    contextWindow: "8,192",
  },
  {
    id: "llama3-70b-8192",
    label: "Llama3 70B 8192",
    apiIdentifier: "llama3-70b-8192",
    description: "High-capacity model for demanding tasks",
    experimental: false,
    contextWindow: "8,192",
  },
  {
    id: "llama3-8b-8192",
    label: "Llama3 8B 8192",
    apiIdentifier: "llama3-8b-8192",
    description: "Balanced model for general-purpose use",
    experimental: false,
    contextWindow: "8,192",
  },
  {
    id: "mixtral-8x7b-32768",
    label: "Mixtral 8x7B",
    apiIdentifier: "mixtral-8x7b-32768",
    description: "Mistral's high-capacity model",
    experimental: false,
    contextWindow: "32,768",
  },
  {
    id: "deepseek-r1-distill-llama-70b",
    label: "DeepSeek R1 Distill 70B",
    apiIdentifier: "deepseek-r1-distill-llama-70b",
    description: "Distilled version of the 70B model for efficiency",
    experimental: true,
    contextWindow: "128k",
  },
  {
    id: "llama-3.3-70b-specdec",
    label: "Llama 3.3 70B SpecDec",
    apiIdentifier: "llama-3.3-70b-specdec",
    description: "Specialized model with speculative decoding capabilities",
    experimental: true,
    contextWindow: "8,192",
  },
  {
    id: "llama-3.2-1b-preview",
    label: "Llama 3.2 1B Preview",
    apiIdentifier: "llama-3.2-1b-preview",
    description: "Preview version of the 1B model",
    experimental: true,
    contextWindow: "128k",
  },
  {
    id: "llama-3.2-3b-preview",
    label: "Llama 3.2 3B Preview",
    apiIdentifier: "llama-3.2-3b-preview",
    description: "Preview version of the 3B model",
    experimental: true,
    contextWindow: "128k",
  },
] as const;

export const DEFAULT_MODEL_NAME: string = "llama-3.3-70b-specdec";
export const DEFAULT_CHAT_MODEL: string = "llama-3.3-70b-specdec";
