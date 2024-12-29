import Carosel from "../../components/Carousel/Carousel";
import Nav from "../../components/Nav/Nav";
import Category from "../../layouts/Category/Category";

import styles from "./Home.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("col-lg-1", "m-auto")}>
        <Nav />
      </div>
      <div className={cx("content", "col-lg-11", "col-md-12")}>
        <Carosel />
        <Category />
      </div>
    </div>
  );
}

export default Home;
