"use client";
import { useState, useRef, useEffect } from "react";
import Navbar from "../ui/Navbar";
import Image from "next/image";
import Footer from "../ui/footer";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      text: "Hello! Welcome to guillemrt.com. How can I help you today?",
      isUser: false,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userInputCopy = inputValue.trim();

    // Add user message
    const userMessage = { text: userInputCopy, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Call OpenAI API through our API route
    try {
      console.log("API Key:", process.env.OPENAI_API_KEY);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ message: userInputCopy }),
      });

      // Check if the response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Received non-JSON response:", await response.text());
        throw new Error("Received non-JSON response from server");
      }

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [...prev, { text: data.message, isUser: false }]);
      } else {
        console.error("API error:", data);
        setMessages((prev) => [
          ...prev,
          {
            text: `Error: ${data.message || "Unknown error occurred"}`,
            isUser: false,
          },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, there was an error connecting to the service. Please check the console for details.",
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    const container = document.querySelector("#chat-container");
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <>
      <Navbar />
      <div className='flex flex-col items-center justify-center min-h-screen p-4'>
        <div className='relative inline-block font-caveat'>
          <Image
            src='/images/profilepic.png'
            alt='profile picture'
            width={75}
            height={64.2}
            className='block transition-all duration-300 ease-out'
            style={{
              position: "fixed",
              top: "20px",
              left: "20px",
              zIndex: 100,
              marginTop: 0,
            }}
          />
        </div>
        <div className='w-full max-w-md mt-20 bg-white rounded-2xl  border-2 border-solid border-gray-200 shadow-[0_3px_12px_0,0_1px_2px_0] shadow-gray-200 overflow-hidden flex flex-col'>
          {/* Chat header */}
          <div className='bg-buttons text-white px-4 py-3 flex items-center'>
            <div className='h-8 w-8 rounded-full bg-white bg-opacity-30 flex items-center justify-center mr-3'>
              <Image
                src='/images/profilepic.png'
                alt='profile picture'
                width={75}
                height={64.2}
              />
            </div>
            <div>
              <h2 className='font-bold text-lg'>{"Guillem's assistant"}</h2>
              <p className='text-xs text-blue-100'>Online(I think)</p>
            </div>
          </div>

          {/* Chat messages */}
          <div
            id='chat-container'
            className='flex-1 p-4 overflow-y-auto min-h-96 max-h-96 bg-gray-50'
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                } mb-3`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs lg:max-w-md ${
                    message.isUser
                      ? "bg-buttons text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className='flex justify-start mb-3'>
                <div className='bg-gray-200 text-gray-800 px-4 py-2 rounded-lg rounded-bl-none flex items-center'>
                  <div className='flex space-x-1'>
                    <div
                      className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                      style={{ animationDelay: "200ms" }}
                    ></div>
                    <div
                      className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                      style={{ animationDelay: "400ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form
            onSubmit={handleSubmit}
            className='border-t border-gray-200 p-4 flex'
          >
            <input
              autoFocus
              ref={inputRef}
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder='Type a message...'
              className='flex-1 border border-gray-300 outline-none rounded-l-lg px-4 py-2'
              //   disabled={isLoading}
            />
            <button
              type='submit'
              className='bg-buttons-hoover text-white px-4 py-2 rounded-r-lg hover:bg-buttons focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-buttons'
              disabled={isLoading || !inputValue.trim()}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
