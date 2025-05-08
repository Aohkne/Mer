import { useEffect, useState } from "react";
import styles from "./Theme.module.scss";
import classNames from "classnames/bind";
import { Moon, Sun } from "lucide-react";

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
        <Moon size={30} />
      </div>

      <div className={cx("theme")} onClick={lightModeHandle}>
        <Sun size={30} />
      </div>
    </div>
  );
}

export default Theme;
