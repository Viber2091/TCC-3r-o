export default function ChatHeader() {
  return (
    <header className="chat-header">
      <div className="chat-header__avatar" aria-hidden="true">
        <svg viewBox="0 0 48 48" width="28" height="28">
          <rect x="10" y="14" width="28" height="22" rx="8" fill="#ffffff" />
          <circle cx="19" cy="25" r="3" fill="#16653f" />
          <circle cx="29" cy="25" r="3" fill="#16653f" />
          <rect x="21" y="6" width="6" height="8" rx="3" fill="#ffffff" />
        </svg>
      </div>

      <div className="chat-header__titles">
        <h1>Dornext IA</h1>
        <p>Assistente de Segurança do Trabalho</p>
      </div>

      <div className="chat-header__status">
        <span className="chat-header__dot" aria-hidden="true" />
        Online agora
      </div>
    </header>
  );
}