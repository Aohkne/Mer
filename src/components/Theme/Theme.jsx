import { useEffect, useState } from "react";
import styles from "./Theme.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Theme() {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const darkModeHandle = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    setIsDark(true);
  };

  const lightModeHandle = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    setIsDark(false);
  };

  useEffect(() => {
    if (isDark) {
      darkModeHandle();
    } else {
      lightModeHandle();
    }
  }, [isDark]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("theme")} onClick={darkModeHandle}>
        <img
          src={isDark ? "img/theme/moon-darkMode.png" : "img/theme/moon.png"}
          alt="moon"
        />
      </div>

      <div className={cx("theme")} onClick={lightModeHandle}>
        <img
          src={isDark ? "img/theme/sun-darkMode.png" : "img/theme/sun.png"}
          alt="sun"
        />
      </div>
    </div>
  );
}

export default Theme;
