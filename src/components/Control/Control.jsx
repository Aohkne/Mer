import styles from "./Control.module.scss";
import classNames from "classnames/bind";
import Theme from "../../components/Theme/Theme";
import Chat from "../Chat/Chat";
import { useState, useEffect } from "react";

const cx = classNames.bind(styles);

const randomMessages = [
  "Hôm nay cũng bị deadline dí à?",
  "Hôm nay bạn thế nào?",
  "Subscribe kênh YouTube chưa người đẹp!",
  "Psst... I'm down here if you need me!",
];

function Control() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [randomMessage, setRandomMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const toggleChat = () => setIsChatOpen((prev) => !prev);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isChatOpen && Math.random() > 0.5) {
        const random =
          randomMessages[Math.floor(Math.random() * randomMessages.length)];
        setRandomMessage(random);
        setShowMessage(true);

        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isChatOpen]);

  return (
    <div className={cx("wrapper")}>
      {!isChatOpen && (
        <div className={cx("theme")}>
          <Theme />
        </div>
      )}

      <div className={cx("chat-container")}>
        {showMessage && (
          <div className={cx("random-message", "description-color")}>
            {randomMessage}
          </div>
        )}

        {!isChatOpen && (
          <div className={cx("chat-icon")} onClick={toggleChat}>
            <img src="/img/theme/mer-bot.png" alt="mer-bot" />
          </div>
        )}
      </div>

      <Chat isChatOpen={isChatOpen} toggleChat={toggleChat} />
    </div>
  );
}

export default Control;
