export interface User {
  id: string;
  email: string;
  password?: string;
  chats?: Chat[];
  documents?: Document[];
  suggestions?: Suggestion[];
}

export interface Chat {
  id: string;
  createdAt: Date;
  title: string;
  userId: string;
  visibility: "private" | "public";
  user?: User;
  messages?: Message[];
  votes?: Vote[];
}

export interface Message {
  id: string;
  chatId: string;
  role: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any; // Using 'any' for Json type, you might want to be more specific
  createdAt: Date;
  chat?: Chat;
  votes?: Vote[];
}

export interface Vote {
  chatId: string;
  messageId: string;
  isUpvoted: boolean;
  chat?: Chat;
  message?: Message;
}

export interface Document {
  id: string;
  createdAt: Date;
  title: string;
  content?: string;
  kind: "text" | "code" | "image";
  userId: string;
  user?: User;
  suggestions?: Suggestion[];
}

export interface Suggestion {
  id: string;
  documentId: string;
  documentCreatedAt: Date;
  originalText: string;
  suggestedText: string;
  description?: string;
  isResolved: boolean;
  userId: string;
  createdAt: Date;
  document?: Document;
  user?: User;
}

// Optional: Add some utility types
export type DocumentKind = "text" | "code" | "image";
export type ChatVisibility = "private" | "public";

// Optional: Add some partial types for creating/updating records
export type CreateUserInput = Omit<
  User,
  "id" | "chats" | "documents" | "suggestions"
>;
export type CreateChatInput = Omit<Chat, "id" | "user" | "messages" | "votes">;
export type CreateMessageInput = Omit<Message, "id" | "chat" | "votes">;
export type CreateDocumentInput = Omit<Document, "id" | "user" | "suggestions">;
export type CreateSuggestionInput = Omit<
  Suggestion,
  "id" | "document" | "user"
>;

// Optional: Add some update types
export type UpdateUserInput = Partial<CreateUserInput>;
export type UpdateChatInput = Partial<CreateChatInput>;
export type UpdateMessageInput = Partial<CreateMessageInput>;
export type UpdateDocumentInput = Partial<CreateDocumentInput>;
export type UpdateSuggestionInput = Partial<CreateSuggestionInput>;
