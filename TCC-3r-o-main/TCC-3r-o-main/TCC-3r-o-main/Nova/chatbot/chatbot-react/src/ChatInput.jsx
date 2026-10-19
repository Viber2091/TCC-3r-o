import { useState, useRef, useLayoutEffect } from "react";
import "./ChatInput.css";

const LINE_HEIGHT = 22;
const MAX_ROWS = 5;

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  useLayoutEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "0px";
    const max = LINE_HEIGHT * MAX_ROWS;
    el.style.height = `${Math.min(el.scrollHeight, max)}px`;
  }, [value]);

  function handleSubmit(e) {
    e.preventDefault();
    const texto = value.trim();
    if (!texto || disabled) return;
    onSend(texto);
    setValue("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  const armed = !disabled && value.trim().length > 0;

  return (
    <form className="prompt-bar" onSubmit={handleSubmit}>
      <div className="prompt-bar__field" onClick={() => inputRef.current?.focus()}>
        <textarea
          ref={inputRef}
          className="prompt-bar__input"
          rows={1}
          value={value}
          placeholder="Digite sua dúvida..."
          aria-label="Digite sua dúvida"
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="submit"
          className="prompt-bar__send"
          data-armed={armed ? "" : undefined}
          disabled={!armed}
          aria-label="Enviar"
        >
          <svg className="prompt-bar__glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
            <path d="M12 4.5 18.5 11 14.25 11 14.25 19.5 9.75 19.5 9.75 11 5.5 11 Z" />
          </svg>
        </button>
      </div>
    </form>
  );
}