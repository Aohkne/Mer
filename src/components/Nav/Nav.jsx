import { Link, useLocation } from "react-router-dom";

import styles from "./Nav.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Nav({ direction }) {
  const location = useLocation();

  return (
    <div className={cx("wrapper", { horizontal: direction === "horizontal" })}>
      <div
        className={cx("item", {
          selected: location.pathname === "/",
        })}
      >
        <Link to="/">
          <img src="/img/home/home-icon.png" alt="home-icon" />
        </Link>
      </div>
      <div
        className={cx("item", {
          selected: location.pathname === "/template",
        })}
      >
        <Link to="/template">
          <img src="/img/home/powerpoint-icon.png" alt="home-icon" />
        </Link>
      </div>
      <div className={cx("item", { selected: location.pathname === "/guide" })}>
        <Link to="/guide">
          <img src="/img/home/guide-icon.png" alt="home-icon" />
        </Link>
      </div>
      <div className={cx("item", { selected: location.pathname === "/info" })}>
        <Link to="/info">
          <img src="/img/home/info-icon.png" alt="home-icon" />
        </Link>
      </div>
    </div>
  );
}

export default Nav;
