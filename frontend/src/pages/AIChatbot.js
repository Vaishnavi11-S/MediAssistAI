import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaUser, FaPaperPlane, FaPlus, FaTrash, FaEdit, FaSearch, FaCopy, FaThumbsUp, FaThumbsDown, FaMicrophone, FaVolumeUp, FaImage, FaFileAlt, FaEllipsisV, FaStop, FaRedo, FaBookmark, FaPin, FaDownload } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Sidebar from '../components/Sidebar';

const AIChatbot = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const suggestedPrompts = [
    "I have a headache and fever",
    "What causes migraines?",
    "How can I improve my sleep?",
    "Explain blood test results",
    "What are the symptoms of flu?"
  ];

  useEffect(() => {
    scrollToBottom();
    loadConversations();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadConversations = () => {
    // Load from localStorage or API
    const saved = localStorage.getItem('chatConversations');
    if (saved) {
      setConversations(JSON.parse(saved));
    }
  };

  const saveConversations = (updatedConversations) => {
    localStorage.setItem('chatConversations', JSON.stringify(updatedConversations));
    setConversations(updatedConversations);
  };

  const createNewConversation = () => {
    const newConversation = {
      id: Date.now(),
      title: 'New Chat',
      messages: [],
      timestamp: new Date().toISOString()
    };
    const updated = [newConversation, ...conversations];
    saveConversations(updated);
    setCurrentConversationId(newConversation.id);
    setMessages([]);
  };

  const deleteConversation = (id) => {
    const updated = conversations.filter(c => c.id !== id);
    saveConversations(updated);
    if (currentConversationId === id) {
      setCurrentConversationId(null);
      setMessages([]);
    }
  };

  const handleSendMessage = async () => {
  if (!input.trim() && !uploadedImage && !uploadedFile) return;
    const userMessage = {
      role: 'user',
      content: input,
      image: uploadedImage,
      file: uploadedFile,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setUploadedImage(null);
    setUploadedFile(null);
    setIsLoading(true);

    try {
      // Call Gemini API
      const response = await callGeminiAPI([...messages, userMessage]);
      
      const aiMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Update conversation
      if (currentConversationId) {
        const updated = conversations.map(c => {
          if (c.id === currentConversationId) {
            return {
              ...c,
              messages: [...c.messages, userMessage, aiMessage],
              title: c.title === 'New Chat' ? input.substring(0, 30) + '...' : c.title
            };
          }
          return c;
        });
        saveConversations(updated);
      }
    } catch (error) {
      toast.error('Failed to get response. Please try again.');
      console.error(error);
    }

    setIsLoading(false);
  };

  const callGeminiAPI = async (messageHistory) => {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  console.log("API Key:", apiKey);

  const lastMessage = messageHistory[messageHistory.length - 1];

  const response = await fetch(
   `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are MediAssist AI, a healthcare assistant. Give educational health guidance only. User: ${lastMessage.content}`,
              },
            ],
          },
        ],
      }),
    }
  );
const data = await response.json();

console.log("API Key:", apiKey);
console.log("Status:", response.status);
console.log("Response:", data);
console.log("Error:", data.error?.message);

if (!response.ok) {
  throw new Error(data.error?.message || "Gemini API request failed");
}

return data.candidates?.[0]?.content?.parts?.[0]?.text;
  };
  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.onstart = () => setIsRecording(true);
      recognition.onend = () => setIsRecording(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
      
      recognition.start();
    } else {
      toast.error('Speech recognition is not supported in your browser');
    }
  };

  const handleTextToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      toast.error('Text-to-speech is not supported in your browser');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const filteredConversations = conversations.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen flex ${isDark ? 'dark' : ''}`}>
      <Sidebar />
      
      <main className="flex-1 lg:ml-72 flex">
        {/* Conversations Sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="w-72 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 flex flex-col"
            >
              <div className="p-4 border-b border-gray-200 dark:border-slate-700">
                <button
                  onClick={createNewConversation}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition"
                >
                  <FaPlus />
                  <span>New Chat</span>
                </button>
              </div>

              <div className="p-4">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-2 space-y-1">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => {
                      setCurrentConversationId(conversation.id);
                      setMessages(conversation.messages);
                    }}
                    className={`p-3 rounded-lg cursor-pointer transition ${
                      currentConversationId === conversation.id
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium truncate">{conversation.title}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteConversation(conversation.id);
                        }}
                        className="text-gray-400 hover:text-red-500 transition"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(conversation.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-slate-900">
          {/* Header */}
          <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition"
              >
                <FaEllipsisV className="text-gray-600 dark:text-gray-400" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <FaRobot className="text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 dark:text-white">MediAssist AI</h2>
                  <p className="text-xs text-green-500">Online</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition">
                <FaBookmark className="text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition">
                <FaDownload className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mb-6">
                  <FaRobot className="text-4xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome to MediAssist AI
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
                  Your intelligent healthcare companion. Ask me anything about health, symptoms, or medical reports.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
                  {suggestedPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(prompt)}
                      className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 transition text-left"
                    >
                      <p className="text-sm text-gray-700 dark:text-gray-300">{prompt}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-3xl ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-primary-500 to-secondary-500'
                      : 'bg-gradient-to-br from-purple-500 to-pink-500'
                  }`}>
                    {message.role === 'user' ? <FaUser className="text-white" /> : <FaRobot className="text-white" />}
                  </div>
                  <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block p-4 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-lg'
                    }`}>
                      {message.image && (
                        <img src={message.image} alt="Uploaded" className="max-w-full h-auto rounded-lg mb-2" />
                      )}
                      {message.file && (
                        <div className="flex items-center space-x-2 mb-2">
                          <FaFileAlt />
                          <span>{message.file.name}</span>
                        </div>
                      )}
                      {message.role === 'assistant' ? (
                        <ReactMarkdown
                          components={{
                            code({ node, inline, className, children, ...props }) {
                              const match = /language-(\w+)/.exec(className || '');
                              return !inline && match ? (
                                <SyntaxHighlighter
                                  style={vscDarkPlus}
                                  language={match[1]}
                                  PreTag="div"
                                  {...props}
                                >
                                  {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                              ) : (
                                <code className={className} {...props}>
                                  {children}
                                </code>
                              );
                            }
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      ) : (
                        <p>{message.content}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                      {message.role === 'assistant' && (
                        <>
                          <button
                            onClick={() => copyToClipboard(message.content)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
                          >
                            <FaCopy className="text-xs" />
                          </button>
                          <button
                            onClick={() => handleTextToSpeech(message.content)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
                          >
                            <FaVolumeUp className="text-xs" />
                          </button>
                          <button className="text-gray-400 hover:text-green-500 transition">
                            <FaThumbsUp className="text-xs" />
                          </button>
                          <button className="text-gray-400 hover:text-red-500 transition">
                            <FaThumbsDown className="text-xs" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <FaRobot className="text-white" />
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-lg">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 p-4">
            {uploadedImage && (
              <div className="mb-3 relative inline-block">
                <img src={uploadedImage} alt="Preview" className="h-20 rounded-lg" />
                <button
                  onClick={() => setUploadedImage(null)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            )}
            {uploadedFile && (
              <div className="mb-3 relative inline-flex items-center space-x-2 bg-gray-100 dark:bg-slate-700 px-3 py-2 rounded-lg">
                <FaFileAlt className="text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{uploadedFile.name}</span>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="text-red-500 hover:text-red-600"
                >
                  ×
                </button>
              </div>
            )}

            <div className="flex items-end space-x-3">
              <div className="flex space-x-2">
                <label className="p-3 bg-gray-100 dark:bg-slate-700 rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition cursor-pointer">
                  <FaImage className="text-gray-600 dark:text-gray-400" />
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                <label className="p-3 bg-gray-100 dark:bg-slate-700 rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition cursor-pointer">
                  <FaFileAlt className="text-gray-600 dark:text-gray-400" />
                  <input type="file" accept=".pdf,.docx,.txt" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>

              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                  rows={1}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none dark:text-white"
                  style={{ minHeight: '48px', maxHeight: '200px' }}
                />
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handleVoiceInput}
                  className={`p-3 rounded-xl transition ${
                    isRecording
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600'
                  }`}
                >
                  <FaMicrophone className="text-gray-600 dark:text-gray-400" />
                </button>
  <button
  onClick={handleSendMessage}
  disabled={
    isLoading ||
    (!input.trim() && !uploadedImage && !uploadedFile)
  }
  className="p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
>
  Send
</button>
              </div>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
              MediAssist AI provides educational guidance only. Always consult a healthcare professional for medical advice.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIChatbot;
