import styles from "./Tag.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Tag({ type, template }) {
  return (
    <div
      className={cx("wrapper", "title-color", `${type ? type : template}-bg`)}
    >
      {type ? type : template}
    </div>
  );
}

export default Tag;
