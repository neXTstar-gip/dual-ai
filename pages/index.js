// pages/index.js
import Head from 'next/head';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Auto-resize textarea
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.addEventListener('input', () => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      });
    }

    const sendMessage = () => {
      if (!textarea) return;
      const message = textarea.value.trim();
      if (message) {
        addMessage(message, 'user');
        textarea.value = '';
        textarea.style.height = 'auto';

        // Simulate AI response after delay
        setTimeout(() => {
          addMessage("I'm a simulated response. In a real implementation, this would connect to an AI API.", 'ai');
        }, 1000);
      }
    };

    const addMessage = (content, sender) => {
      const messagesContainer = document.querySelector('.message-container');
      if (!messagesContainer) return;
      const messageDiv = document.createElement('div');
      messageDiv.className = `flex space-x-3 ${sender === 'user' ? '' : 'mt-4'}`;
      messageDiv.innerHTML = `
        <div class="w-8 h-8 ${sender === 'user' ? 'bg-gray-600' : 'bg-ai-green'} rounded-full flex-shrink-0 flex items-center justify-center">
            <i class="fas ${sender === 'user' ? 'fa-user' : 'fa-robot'}"></i>
        </div>
        <div class="bg-gray-700 p-3 rounded-lg max-w-3xl">
            <p>${content}</p>
        </div>
      `;
      messagesContainer.appendChild(messageDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    // Attach event listeners
    const btn = document.querySelector('button');
    if (btn && textarea) {
      btn.addEventListener('click', sendMessage);
      textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>ChatGPT Clone</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`
          body {
              font-family: 'Inter', sans-serif;
          }
          .message-container {
              scrollbar-width: thin;
              scrollbar-color: #4b5563 #1f2937;
          }
          .message-container::-webkit-scrollbar {
              width: 6px;
          }
          .message-container::-webkit-scrollbar-track {
              background: #1f2937;
          }
          .message-container::-webkit-scrollbar-thumb {
              background-color: #4b5563;
              border-radius: 3px;
          }
        `}</style>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤖</text></svg>" />
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              darkMode: 'class',
              theme: {
                extend: {
                  colors: {
                    'ai-green': '#10a37f',
                  }
                }
              }
            }
          `
        }} />
      </Head>

      <div className="bg-gray-900 text-gray-100 h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-700 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-ai-green rounded-full flex items-center justify-center">
              <i className="fas fa-robot"></i>
            </div>
            <h1 className="text-xl font-semibold">ChatGPT</h1>
          </div>
          <button className="p-2 rounded-md hover:bg-gray-700">
            <i className="fas fa-ellipsis-vertical"></i>
          </button>
        </header>

        {/* Chat Messages */}
        <div className="message-container flex-1 overflow-y-auto p-4 space-y-4">
          {/* Example messages */}
          <div className="flex space-x-3">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex-shrink-0 flex items-center justify-center">
              <i className="fas fa-user"></i>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg max-w-3xl">
              <p>Hello, how are you today?</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <div className="w-8 h-8 bg-ai-green rounded-full flex-shrink-0 flex items-center justify-center">
              <i className="fas fa-robot"></i>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg max-w-3xl">
              <p>I'm doing well, thank you for asking! How can I assist you today?</p>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-700 p-4">
          <div className="flex items-center space-x-2 bg-gray-700 rounded-lg p-2">
            <textarea 
              className="flex-1 bg-transparent outline-none resize-none max-h-32 p-2" 
              placeholder="Message ChatGPT..."
              rows="1"></textarea>
            <button className="p-2 text-gray-400 hover:text-gray-100">
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            ChatGPT can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </>
  );
}
