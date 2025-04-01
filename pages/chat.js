// pages/chat.js
import { useState, useEffect } from 'react';
import TypingText from '../components/TypingText';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedAI, setSelectedAI] = useState('luminai');
  const [aiResponse, setAiResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Memory Percakapan: load chat history dari localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      setMessages(JSON.parse(savedHistory));
    }
  }, []);

  // Simpan chat history tiap ada perubahan
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    // Tambah pesan user
    const userMsg = { sender: 'User', content: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    
    // Set tipe AI sesuai pilihan user
    setIsTyping(true);
    // Contoh simulasi respon. Di implementasi asli, lo panggil API sesuai selectedAI dan currentInput.
    const simulatedResponse = selectedAI === 'luminai'
      ? "Halo, gue Luminai!"
      : "Yo, gue ChatGPT3, bro!";
    setAiResponse(simulatedResponse);
  };

  const handleCompleteTyping = () => {
    setIsTyping(false);
    // Setelah animasi selesai, tambah pesan AI ke history
    const aiMsg = { 
      sender: selectedAI === 'luminai' ? 'Luminai' : 'ChatGPT3', 
      content: aiResponse 
    };
    setMessages(prev => [...prev, aiMsg]);
    setAiResponse('');
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="border-b border-gray-700 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-ai-green rounded-full flex items-center justify-center">
            <i className="fas fa-robot"></i>
          </div>
          <h1 className="text-xl font-semibold">AI Dual Chat</h1>
        </div>
        <div>
          {/* Personalisasi Karakter: Dropdown untuk pilih AI */}
          <select
            value={selectedAI}
            onChange={e => setSelectedAI(e.target.value)}
            className="bg-gray-700 text-gray-100 p-2 rounded-md"
          >
            <option value="luminai">Luminai (Ramah)</option>
            <option value="chatgpt3">ChatGPT3 (Kocak & Berandal)</option>
          </select>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="message-container flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex space-x-3 ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}>
            <div className={`w-8 h-8 ${msg.sender === 'User' ? 'bg-gray-600' : 'bg-ai-green'} rounded-full flex-shrink-0 flex items-center justify-center`}>
              <i className={`fas ${msg.sender === 'User' ? 'fa-user' : 'fa-robot'}`}></i>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg max-w-3xl">
              <p><strong>{msg.sender}:</strong> {msg.content}</p>
            </div>
          </div>
        ))}
        {isTyping && aiResponse && (
          <div className="flex space-x-3 justify-start">
            <div className="w-8 h-8 bg-ai-green rounded-full flex-shrink-0 flex items-center justify-center">
              <i className="fas fa-robot"></i>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg max-w-3xl">
              {/* Animasi Teks: Pake komponen TypingText */}
              <TypingText text={aiResponse} onComplete={handleCompleteTyping} />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-700 p-4">
        <div className="flex items-center space-x-2 bg-gray-700 rounded-lg p-2">
          <textarea
            className="flex-1 bg-transparent outline-none resize-none max-h-32 p-2"
            placeholder="Message ChatGPT..."
            value={input}
            onChange={e => setInput(e.target.value)}
            rows="1"
          ></textarea>
          <button className="p-2 text-gray-400 hover:text-gray-100" onClick={handleSend}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          ChatGPT can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
}
