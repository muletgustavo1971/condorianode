
import React from 'react';
import type { ChatMessage } from '../types';
import { MessageSender } from '../types';

interface MessageProps {
  message: ChatMessage;
}

const CondorIcon: React.FC = () => (
    <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0 mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9.17a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><path d="M12 20h.01"/>
        </svg>
    </div>
);

const UserIcon: React.FC = () => (
     <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0 ml-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
    </div>
);


export const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.sender === MessageSender.USER;
  const isAI = message.sender === MessageSender.AI;

  const messageContainerClasses = `flex items-start ${isUser ? 'justify-end' : 'justify-start'}`;
  
  const bubbleClasses = `px-5 py-3 rounded-2xl max-w-lg lg:max-w-2xl text-white ${
    isUser
      ? 'bg-sky-600 rounded-br-none'
      : 'bg-slate-700 rounded-bl-none'
  }`;

  return (
    <div className={messageContainerClasses}>
        {isAI && <CondorIcon />}
      <div className={bubbleClasses}>
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
      </div>
      {isUser && <UserIcon />}
    </div>
  );
};
