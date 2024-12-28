import styles from "./Control.module.scss";
import classNames from "classnames/bind";
import Theme from "../../components/Theme/Theme";

const cx = classNames.bind(styles);

function Control() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("theme")}>
        <Theme />
      </div>
      <div className={cx("chat-icon")}>
        <img src="/img/theme/mer-bot.png" alt="" />
      </div>
    </div>
  );
}

export default Control;
