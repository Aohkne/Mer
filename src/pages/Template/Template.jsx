import Nav from "../../components/Nav/Nav";
import Category from "../../layouts/Category/Category";

import styles from "./Template.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Template() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("col-lg-1", "m-auto")}>
        <Nav direction={"horizontal"} />
      </div>
      <div className={cx("content", "col-lg-11", "col-md-12")}>
        <Category Category={"new"} />
      </div>
    </div>
  );
}

export default Template;
