"use client";
//import { cookies } from "next/headers";

import Chat from "@/components/chat";
import { DEFAULT_MODEL_NAME, models } from "@/lib/ai/models";
import { generateUUID } from "@/lib/utils";
import { useLocalStorage } from "usehooks-ts";
//import { DataStreamHandler } from '@/components/data-stream-handler';

export default function Home() {
  const id = generateUUID();

  //const cookieStore = await cookies();
  //const modelIdFromCookie = cookieStore.get("model-id")?.value;
  const [modelIdFromCookie] = useLocalStorage("model-id", DEFAULT_MODEL_NAME);

  const selectedModelId =
    models.find((model) => model.id === modelIdFromCookie)?.id ||
    DEFAULT_MODEL_NAME;

  return (
    <div className="w-full h-full flex-1 flex flex-col justify-center items-center">
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
        selectedModelId={selectedModelId}
        selectedVisibilityType="private"
        isReadonly={false}
      />
    </div>
  );
}
