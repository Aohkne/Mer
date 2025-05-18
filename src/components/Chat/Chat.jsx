import { useEffect, useState, useRef } from "react";
import { X, Send } from "lucide-react";
import classNames from "classnames/bind";
import styles from "./Chat.module.scss";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
const prompt = process.env.REACT_APP_PROMPT;

const cx = classNames.bind(styles);

function Chat({ isChatOpen, toggleChat }) {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello Mer bot đây, tôi có thể giúp gì cho bạn?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [currentTypingMessage, setCurrentTypingMessage] = useState(null);
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const messagesEndRef = useRef(null);
  const typingSpeed = 30;

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({
        model: process.env.REACT_APP_MODEL,
      });

      const result = await model.generateContent(prompt + input);
      const response = await result.response;
      const text = await response.text();

      setCurrentTypingMessage({ from: "bot", text });
      setDisplayedText("");
      setCurrentCharIndex(0);
      setTyping(true);
      setLoading(false);
    } catch (err) {
      console.error("Error:", err);
      const errorText =
        "Xin lỗi, hôm nay hoạt động hơi nhiều nên có thể tôi đã bị lỗi, bạn có thể quay lại lúc sau khi tui khoẻ lại nha!";

      setCurrentTypingMessage({ from: "bot", text: errorText });
      setDisplayedText("");
      setCurrentCharIndex(0);
      setTyping(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      typing &&
      currentTypingMessage &&
      currentCharIndex < currentTypingMessage.text.length
    ) {
      const timer = setTimeout(() => {
        setDisplayedText(
          (prev) => prev + currentTypingMessage.text[currentCharIndex]
        );
        setCurrentCharIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    } else if (
      typing &&
      currentTypingMessage &&
      currentCharIndex >= currentTypingMessage.text.length
    ) {
      setMessages((prev) => [...prev, currentTypingMessage]);
      setCurrentTypingMessage(null);
      setTyping(false);
    }
  }, [typing, currentTypingMessage, currentCharIndex, typingSpeed]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, displayedText]);

  // Convert URLs in plain text to markdown links
  const makeLinksClickable = (text) => {
    // Regular expression to match URLs with or without http(s):// prefix
    const urlRegex =
      /(https?:\/\/[^\s]+)|(\b(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,})/g;

    return text.replace(urlRegex, (url) => {
      // Add https:// prefix if it doesn't exist
      const fullUrl = url.startsWith("http") ? url : `https://${url}`;
      return `[${url}](${fullUrl})`;
    });
  };

  return (
    <div className={cx("chatbot")}>
      <div className={cx("chat-box", { open: isChatOpen })}>
        <button className={cx("toggle-btn")} onClick={toggleChat}>
          <X size={20} />
        </button>

        <div className={cx("messages")}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={cx("message", msg.from === "user" ? "user" : "bot")}
            >
              {msg.from === "user" ? (
                <div>{msg.text}</div>
              ) : (
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                  components={{
                    a: ({ node, ...props }) => (
                      <a {...props} target="_blank" rel="noopener noreferrer" />
                    ),
                  }}
                >
                  {makeLinksClickable(msg.text)}
                </ReactMarkdown>
              )}
            </div>
          ))}

          {typing && currentTypingMessage && (
            <div className={cx("message", "bot")}>
              <ReactMarkdown
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                components={{
                  a: ({ node, ...props }) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
              >
                {makeLinksClickable(displayedText)}
              </ReactMarkdown>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className={cx("input-box")}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about website"
            onKeyDown={(e) =>
              e.key === "Enter" && !typing && !loading && handleSend()
            }
            disabled={typing || loading}
          />
          <button onClick={handleSend} disabled={typing || loading}>
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
