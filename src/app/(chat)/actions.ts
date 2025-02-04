"use server";

import { generateText, Message } from "ai";
import { cookies } from "next/headers";

import { customModel } from "@/lib/ai";
//import {
//  deleteMessagesByChatIdAfterTimestamp,
//  getMessageById,
//  updateChatVisiblityById,
//} from '@/lib/db/queries';
import { VisibilityType } from "@/components/visibility-selector";

export async function saveModelId(model: string) {
  const cookieStore = await cookies();
  cookieStore.set("model-id", model);
}

export async function generateTitleFromUserMessage({
  message,
}: {
  message: Message;
}) {
  const { text: title } = await generateText({
    model: customModel("llama-3.1-8b-instant"),
    system: `\n
    - you will generate a short title based on the first message a user begins a conversation with
    - ensure it is not more than 80 characters long
    - the title should be a summary of the user's message
    - do not use quotes or colons`,
    prompt: JSON.stringify(message),
  });

  return title;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function deleteTrailingMessages({ id }: { id: string }) {
  //const [message] = await getMessageById({ id });
  //
  //await deleteMessagesByChatIdAfterTimestamp({
  //  chatId: message.chatId,
  //  timestamp: message.createdAt,
  //});
}

export async function updateChatVisibility({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  chatId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  visibility,
}: {
  chatId: string;
  visibility: VisibilityType;
}) {
  //await updateChatVisiblityById({ chatId, visibility });
}
