import { useEffect, useRef } from "react";

export default function ChatMessages({ messages, isTyping }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="chat-messages">
      {messages.map((msg) => (
        <div key={msg.id} className={`chat-bubble-row chat-bubble-row--${msg.sender}`}>
          {msg.sender === "ia" && (
            <div className="chat-bubble-avatar" aria-hidden="true">
              <svg viewBox="0 0 48 48" width="18" height="18">
                <rect x="10" y="14" width="28" height="22" rx="8" fill="#ffffff" />
                <circle cx="19" cy="25" r="3" fill="#16653f" />
                <circle cx="29" cy="25" r="3" fill="#16653f" />
                <rect x="21" y="6" width="6" height="8" rx="3" fill="#ffffff" />
              </svg>
            </div>
          )}
          <div className={`chat-bubble chat-bubble--${msg.sender}`}>{msg.text}</div>
        </div>
      ))}

      {isTyping && (
        <div className="chat-bubble-row chat-bubble-row--ia">
          <div className="chat-bubble-avatar" aria-hidden="true">
            <svg viewBox="0 0 48 48" width="18" height="18">
              <rect x="10" y="14" width="28" height="22" rx="8" fill="#ffffff" />
              <circle cx="19" cy="25" r="3" fill="#16653f" />
              <circle cx="29" cy="25" r="3" fill="#16653f" />
              <rect x="21" y="6" width="6" height="8" rx="3" fill="#ffffff" />
            </svg>
          </div>
          <div className="chat-bubble chat-bubble--ia chat-bubble--typing">
            <span />
            <span />
            <span />
          </div>
        </div>
      )}

      <div ref={endRef} />
    </div>
  );
}