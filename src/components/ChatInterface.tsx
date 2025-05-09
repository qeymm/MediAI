import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";
import QuoteForm from "./QuoteForm";
import QuoteDisplay from "./QuoteDisplay";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  isTyping?: boolean;
  isQuoteForm?: boolean;
  isQuoteDisplay?: boolean;
  quoteData?: any;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm MediAI, your insurance assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    // Check if message is about quotes
    const isQuoteRequest =
      inputValue.toLowerCase().includes("quote") ||
      inputValue.toLowerCase().includes("quotation") ||
      inputValue.toLowerCase().includes("price");

    // Simulate AI response after a delay
    setTimeout(() => {
      setIsTyping(false);

      if (isQuoteRequest) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            content:
              "I can help you generate a quote. Please fill out the following form with your client's details:",
            sender: "ai",
            timestamp: new Date(),
            isQuoteForm: true,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            content: getAIResponse(inputValue),
            sender: "ai",
            timestamp: new Date(),
          },
        ]);
      }
    }, 1500);
  };

  const getAIResponse = (userMessage: string): string => {
    // Simple response logic - in a real app, this would connect to an AI service
    if (
      userMessage.toLowerCase().includes("hello") ||
      userMessage.toLowerCase().includes("hi")
    ) {
      return "Hello! How can I assist you with insurance today?";
    } else if (userMessage.toLowerCase().includes("coverage")) {
      return "We offer various coverage options including health, life, property, and travel insurance. Would you like specific information about any of these?";
    } else if (userMessage.toLowerCase().includes("family")) {
      return "Our family insurance plans cover all members of your household with comprehensive benefits. Would you like me to generate a quote for a family plan?";
    } else {
      return "Thank you for your question. I can provide information about our insurance policies, help generate quotes, or answer specific questions about coverage options. How else can I assist you?";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleQuoteFormSubmit = (formData: any) => {
    // Process the quote form data and generate a quote
    const quoteData = {
      ...formData,
      premium: calculatePremium(formData),
      coverageDetails: getCoverageDetails(formData),
    };

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        content:
          "Based on the information provided, here's the generated quote:",
        sender: "ai",
        timestamp: new Date(),
        isQuoteDisplay: true,
        quoteData: quoteData,
      },
    ]);
  };

  const calculatePremium = (formData: any) => {
    // Mock premium calculation logic
    let basePremium = 500;

    if (formData.age > 50) basePremium += 200;
    if (formData.coverageType === "family") basePremium *= 1.8;
    if (formData.coverageType === "company") basePremium *= 3;

    return basePremium;
  };

  const getCoverageDetails = (formData: any) => {
    // Mock coverage details based on form data
    return {
      hospitalCoverage:
        formData.coverageType === "company" ? "$2,000,000" : "$1,000,000",
      outpatientCoverage:
        formData.coverageType === "basic" ? "$5,000" : "$10,000",
      medicationCoverage:
        formData.coverageType === "premium" ? "Full coverage" : "80% coverage",
      annualLimit:
        formData.coverageType === "company" ? "Unlimited" : "$2,000,000",
    };
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-full bg-background border rounded-lg overflow-hidden">
      <div className="p-4 border-b bg-card">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=mediAI"
              alt="MediAI"
            />
            <AvatarFallback>
              <Bot className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">MediAI Assistant</h2>
            <p className="text-sm text-muted-foreground">
              Insurance Quotation & Support
            </p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="flex items-start max-w-[80%]">
                {message.sender === "ai" && (
                  <Avatar className="h-8 w-8 mr-2 mt-1">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=mediAI"
                      alt="MediAI"
                    />
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div>
                  <Card
                    className={`p-3 ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  >
                    <p>{message.content}</p>
                    {message.isQuoteForm && (
                      <QuoteForm onSubmit={handleQuoteFormSubmit} />
                    )}
                    {message.isQuoteDisplay && message.quoteData && (
                      <QuoteDisplay quoteData={message.quoteData} />
                    )}
                  </Card>
                  <div className="text-xs text-muted-foreground mt-1 ml-1">
                    {formatTime(message.timestamp)}
                  </div>
                </div>

                {message.sender === "user" && (
                  <Avatar className="h-8 w-8 ml-2 mt-1">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123"
                      alt="User"
                    />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start max-w-[80%]">
                <Avatar className="h-8 w-8 mr-2 mt-1">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=mediAI"
                    alt="MediAI"
                  />
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <Card className="p-3 bg-muted">
                  <div className="flex space-x-1">
                    <div
                      className="h-2 w-2 bg-current rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="h-2 w-2 bg-current rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="h-2 w-2 bg-current rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-card">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={inputValue.trim() === ""}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          <p>
            Try asking about insurance coverage or request a quote for your
            client.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
