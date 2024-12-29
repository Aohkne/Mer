import styles from "./Tag.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Tag({ type }) {
  return (
    <div className={cx("wrapper", "title-color", `${type}-bg`)}>{type}</div>
  );
}

export default Tag;
