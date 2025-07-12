"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { BsFillChatSquareTextFill, BsStars } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { FaUser } from "react-icons/fa";
import { ArrowRightIcon, ArrowUpRight, Globe } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import MarkdownRenderer from "./MarkdownRender";
import { ChatbotData } from "~/lib/data/data";

export interface Message {
  role: "user" | "assistant";
  content: string;
  id?: number;
}

interface ChatBotProps {
  data: ChatbotData;
}

const ChatBot = ({ data }: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatPrompt, setChatPrompt] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [language, setLanguage] = useState<"english" | "marathi">("english");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const genAI = useRef(
    new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY as string),
  );

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const generateChatResponse = useCallback(async () => {
    if (!chatPrompt.trim()) return;

    setIsGenerating(true);
    const newMessage: Message = { role: "user", content: chatPrompt };
    setChatMessages((prev) => [...prev, newMessage]);
    setChatPrompt("");

    try {
      const model = genAI.current.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          temperature: 0.2,
          topP: 0.8,
          topK: 40,
        },
      });

      const prompt =
        language === "english"
          ? `${data.context}\n\nUser: ${chatPrompt}`
          : `तुम्ही 'Adithya Interiors' साठी एक स्मार्ट, मैत्रीपूर्ण आणि व्यावसायिक चॅटबॉट आहात. कंपनी मुंबईतील स्थानिक इंटीरियर आणि कन्स्ट्रक्शन सेवा देते. वापरकर्त्याचा प्रश्न: ${chatPrompt}`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: text },
      ]);
    } catch (error) {
      console.error("Error generating chat response:", error);
      const errorMessage =
        language === "english"
          ? "An error occurred. Please try again later."
          : "त्रुटी आली आहे. कृपया नंतर पुन्हा प्रयत्न करा.";

      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: errorMessage },
      ]);
    } finally {
      setIsGenerating(false);
    }
  }, [chatPrompt, language, data.context]);

  const startNewChat = useCallback(() => {
    setChatMessages([]);
    setChatPrompt("");
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "english" ? "marathi" : "english"));
  }, []);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        onClick={() => {
          setIsOpen(!isOpen);
          const button = document.getElementById("chat-button");
          button?.classList.add("scale-effect");
          setTimeout(() => button?.classList.remove("scale-effect"), 300);
        }}
        asChild
      >
        <div
          id="chat-button"
          className="gradient-button fixed right-0 bottom-0 z-50 m-8 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full transition-transform"
        >
          {isOpen ? (
            <RxCross2 className="animate-rotate-in text-2xl text-white transition-transform" />
          ) : (
            <BsFillChatSquareTextFill className="text-2xl text-white transition-transform" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="h-[70vh] w-96 overflow-hidden">
        <div className="flex h-full flex-col">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="leading-tight font-light">
              {language === "english" ? data.title.english : data.title.marathi}
            </h4>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                title={
                  language === "english"
                    ? "Switch to Marathi"
                    : "इंग्रजीवर स्विच करा"
                }
                className="h-8 w-8"
              >
                <Globe className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={startNewChat}
                className="bg-muted h-8 border text-xs"
              >
                {language === "english"
                  ? data.newChat.english
                  : data.newChat.marathi}
              </Button>
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            className="scrollbar flex-grow overflow-y-auto"
          >
            {chatMessages.length === 0 ? (
              <EmptyScreen
                setChatPrompt={setChatPrompt}
                language={language}
                data={data}
              />
            ) : (
              chatMessages.map((message, index) => (
                <ChatItem key={index} message={message} />
              ))
            )}
          </div>

          <div className="mt-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                generateChatResponse();
              }}
            >
              <div className="flex items-end space-x-2">
                <div className="flex-grow">
                  <Textarea
                    placeholder={
                      language === "english"
                        ? data.placeholder.english
                        : data.placeholder.marathi
                    }
                    className="scrollbar min-h-[38px] w-full resize-none px-3 py-3 text-[13px] placeholder:text-gray-400 focus-within:outline-none"
                    value={chatPrompt}
                    onChange={(e) => setChatPrompt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        if (!isGenerating && chatPrompt.trim()) {
                          generateChatResponse();
                        }
                      }
                    }}
                    disabled={isGenerating}
                    rows={1}
                    style={{
                      maxHeight: "114px",
                      overflowY: "auto",
                    }}
                  />
                </div>
                <Button
                  type="submit"
                  className="gradient-button text-primary h-[44px] w-[44px] flex-shrink-0 rounded-md p-0 disabled:cursor-not-allowed"
                  disabled={isGenerating || !chatPrompt.trim()}
                >
                  <ArrowUpRight className="text-white" size={16} />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ChatBot;

const EmptyScreen = ({
  setChatPrompt,
  language,
  data,
}: {
  setChatPrompt: (prompt: string) => void;
  language: "english" | "marathi";
  data: ChatbotData;
}) => {
  const exampleMessages =
    language === "english"
      ? data.exampleMessages.english
      : data.exampleMessages.marathi;

  return (
    <div className="text-foreground mx-auto px-4">
      <div className="flex w-full flex-col items-center justify-center rounded-md p-4">
        <p className="mb-4 text-center leading-normal">
          {language === "english" ? (
            <>How can I help you today?</>
          ) : (
            <>आपल्याला कशी मदत करू शकतो?</>
          )}
        </p>
        <p className="text-primary mb-4 text-[15px] leading-normal">
          {language === "english"
            ? "Try asking about:"
            : "याबद्दल विचारून पहा:"}
        </p>
        <div className="flex flex-col items-start justify-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => setChatPrompt(message)}
              className="bg-background text-muted-foreground hover:bg-muted h-auto w-full justify-start border-[0.5px] p-2 text-xs opacity-80"
            >
              <ArrowRightIcon className="text-muted-foreground mr-2 h-3 w-3" />
              {message}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ChatItem: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <div className="group relative flex items-start py-3 pr-2">
      <div className="bg-background -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border select-none">
        {message.role === "user" ? (
          <FaUser className="text-primary h-4 w-4" />
        ) : (
          <BsStars className="text-muted-foreground h-4 w-4" />
        )}
      </div>
      <div className="ml-3 flex-1 space-y-1 overflow-hidden px-1 text-[13px]">
        <MarkdownRenderer content={message.content} />
      </div>
    </div>
  );
};
