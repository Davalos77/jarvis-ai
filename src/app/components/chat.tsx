"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";
import { useRef, useEffect } from "react";
import { SiProbot } from "react-icons/si";
import { BsPersonRaisedHand } from "react-icons/bs";
// import Image from "next/image";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const chatParent = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const domNode = chatParent.current;
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  });

  return (
    <main className="flex flex-col max-h-dvh absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
      <header className="container flex  flex-col items-center justify-center p-4 border-b border-slate-400 w-full max-w-3xl mx-auto ">
        <h1 className="text-2xl font-extrabold text-slate-300">Jarvis-ai</h1>
      </header>

      <section className="p-4">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-3xl mx-auto items-center "
        >
          <Input
            className="flex-1 min-h-[40px] bg-black border-slate-400 text-slate-300"
            placeholder="Type your question here..."
            type="text"
            value={input}
            onChange={handleInputChange}
          />
          <Button className="ml-2 text-slate-300" type="submit">
            Submit
          </Button>
        </form>
      </section>

      <section className="container px-0 pb-10 flex flex-col flex-grow gap-4 mx-auto max-w-3xl">
        {/* <Image
          src="/images/jarvis-left.png"
          alt="jarvis left"
          className="absolute transform -translate-x-1 -translate-y-3 top-1/2 left-2"
          width={300}
          height={300}
        />
        <Image
          src="/images/jarvis-right.png"
          alt="jarvis right"
          className="absolute items-center mr-10 mt-20"
          width={300}
          height={300}
        /> */}
        <ul
          ref={chatParent}
          className="h-1 p-4 flex-grow bg-muted/50 rounded-lg overflow-y-auto flex flex-col gap-4 bg-gray-900 "
        >
          {messages.map((m, index) => (
            <>
              {m.role === "user" ? (
                <li key={index} className="flex flex-row">
                  <div className="rounded-xl p-3 bg-slate-700 shadow-md flex  ">
                    <p className="text-primary text-slate-300 grid-cols-2 justify-start">
                      <BsPersonRaisedHand className="float-left text-pink-400" />
                      {m.content}
                    </p>
                  </div>
                </li>
              ) : (
                <li key={index} className="flex flex-row-reverse">
                  <div className="rounded-xl p-3 bg-slate-700  shadow-md flex w-3/4">
                    <p className="text-primary text-slate-300 ">
                      <span className=" font-bold">
                        <SiProbot className="text-red-400 float-left" />
                      </span>
                      {m.content}
                    </p>
                  </div>
                </li>
              )}
            </>
          ))}
        </ul>
      </section>
      <div></div>
    </main>
  );
}
