import { useState } from "react";
import Nav from "../../components/Nav/Nav";

import styles from "./Guide.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Guide() {
  const [isDark] = useState(localStorage.getItem("theme") === "dark");

  return (
    <div className={cx("wrapper")}>
      <Nav direction={"horizontal"} />

      <h3 className={cx("title", "normal-bg", "title-color")}>Guide</h3>

      <div className={cx("video-container")}>
        <iframe
          width="100%"
          height="514"
          src={"https://www.youtube.com/embed/dZn2OPClFJw"}
          title={"Guide"}
          allow="accelerometer; autoplay; encrypted-media; gyroscope;"
          allowFullScreen
        ></iframe>
      </div>

      <div className={cx("content")}>
        <h3 className={cx("content-title", "title-color-withbg")}>
          Conditions for downloading the file
        </h3>
        <li className={cx("content-description", "description-color")}>
          The video on YouTube must receive at least 20 likes.
        </li>

        <h3 className={cx("content-title", "title-color-withbg")}>
          How to use AI - <span>Mer Bot</span>
        </h3>

        <div className={cx("bot-container")}>
          <div className={cx("bot-name")}>
            <img src="/img/theme/mer-guide.png" alt="mer-guide" />

            <div className={cx("bot-info")}> I'm Mer Bot</div>
          </div>

          <div className={cx("bot-location")}>
            <li className={cx("bot-description", "description-color")}>
              You'll find the Mer bot in the bottom right corner
            </li>

            {isDark ? (
              <img src="/img/theme/mer-location-dark.png" alt="mer-guide" />
            ) : (
              <img src="/img/theme/mer-location-light.png" alt="mer-guide" />
            )}
          </div>

          <div className={cx("bot-ui")}>
            <li className={cx("bot-description", "description-color")}>
              Chat UI
            </li>

            {isDark ? (
              <img src="/img/theme/mer-chat-dark.png" alt="mer-guide" />
            ) : (
              <img src="/img/theme/mer-chat-light.png" alt="mer-guide" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Guide;
