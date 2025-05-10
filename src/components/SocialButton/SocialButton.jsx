import styles from "./SocialButton.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function SocialButton({ type, name, icon, link, width }) {
  const isGmail = type.toLowerCase() === "gmail";
  const href = isGmail ? `mailto:${link}` : link;

  return (
    <div className={cx("wrapper")}>
      <div className={cx("name-container", "description-color")}>{name}</div>

      <a
        className={cx("btn-container", type, width)}
        href={href}
        target={isGmail ? "_self" : "_blank"}
        rel={isGmail ? undefined : "noopener noreferrer"}
      >
        <img src={icon} alt={name} />
        <div className={cx("btn-text", type)}>{type}</div>
      </a>
    </div>
  );
}

export default SocialButton;
