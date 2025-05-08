import Nav from "../../components/Nav/Nav";

import styles from "./Guide.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Guide() {
  return (
    <div className={cx("wrapper")}>
      <Nav direction={"horizontal"} />

      <h3 className={cx("title", "normal-bg", "title-color")}>Guide</h3>

      <div className={cx("video-container")}>
        <iframe
          width="100%"
          height="514"
          src={"https://www.youtube.com/embed/YGO0ritoMHQ"}
          title={"Guide"}
          allow="accelerometer; autoplay; encrypted-media; gyroscope;"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default Guide;
