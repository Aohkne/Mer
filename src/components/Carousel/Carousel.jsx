import { Carousel } from "react-bootstrap";

import styles from "./Carousel.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Carosel() {
  const images = [
    { src: "img/slider/slider_1.png", alt: "Info" },
    { src: "img/slider/slider_2.png", alt: "Mer Bot" },
    { src: "img/slider/slider_1.png", alt: "slider_2" },
  ];

  return (
    <Carousel className={cx("wrapper")}>
      {images.map((e, index) => (
        <Carousel.Item key={index} className={cx("item")}>
          <img src={e.src} alt={e.alt} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Carosel;
