import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import { InputBar } from './components/InputBar';
import type { ChatMessage } from './types';
import { MessageSender } from './types';
import { getAiResponse } from './services/geminiService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      text: 'Sistema activo. ¿En qué puedo ayudar?',
      sender: MessageSender.AI,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = useCallback(async (inputText: string) => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      text: inputText,
      sender: MessageSender.USER,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const aiResponseText = await getAiResponse(inputText);
      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        text: aiResponseText,
        sender: MessageSender.AI,
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Error desconocido';
      setError(`Error al comunicarse con el asistente: ${errorMessage}`);
      const errorResponseMessage: ChatMessage = {
        id: crypto.randomUUID(),
        text: 'Disculpe, no puedo procesar su solicitud en este momento. Por favor, verifique la conexión e intente nuevamente.',
        sender: MessageSender.AI,
      };
      setMessages(prev => [...prev, errorResponseMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <div className="flex h-screen bg-slate-800 text-white font-sans overflow-hidden">
      <Sidebar onPromptClick={handleSendMessage} />
      <main className="flex-1 flex flex-col bg-slate-900/50">
        <ChatWindow messages={messages} isLoading={isLoading} />
        {error && <div className="text-red-400 text-center text-sm p-2">{error}</div>}
        <InputBar onSendMessage={handleSendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
};

export default App;
