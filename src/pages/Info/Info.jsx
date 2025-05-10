import YoutubeChannelStats from "../../api/YoutubeChannel/channel-youtube";
import SocialButton from "../../components/SocialButton/SocialButton";
import Nav from "../../components/Nav/Nav";

import styles from "./Info.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Info() {
  return (
    <div className={cx("wrapper")}>
      <Nav direction={"horizontal"} />

      <h3 className={cx("title", "normal-bg", "title-color")}>About</h3>

      <div className={cx("content-container")}>
        <div className={cx("content-description", "description-color")}>
          Thank you for trusting and using <span>Mer</span>, your go-to site for
          high-quality PowerPoint templates!
        </div>

        <div className={cx("content-subdescription", "description-color")}>
          If you have any questions or encounter any issues while using the
          website, please don’t hesitate to reach out through our social media
          channels below.Your feedback is invaluable and helps us improve to
          deliver better experiences.
        </div>
      </div>

      <div className={cx("Social-container")}>
        <h3 className={cx("social-title", "title-color-withbg")}>
          Social Media
        </h3>

        <div className={cx("social-content")}>
          <div className={cx("youtube-container")}>
            <div className={cx("youtube-logo")}>
              <div className={cx("img-container")}>
                <img src="/logo_info.png" alt="youtube" />
              </div>

              <SocialButton
                type={"youtube"}
                name={"Kẻ Mộng Mơ ☁"}
                icon={"/img/icon/youtube-icon.png"}
                link={"https://www.youtube.com/@ke_mong_mer"}
              />
            </div>

            <div className={cx("youtube-description")}>
              <YoutubeChannelStats channelId={"UCbiCRG3ARyi2kuNwFtgiQpw"} />
            </div>
          </div>
        </div>

        <div className={cx("social-list")}>
          <div className={cx("row")}>
            <div
              className={cx(
                "social-item",
                "col-xl-4",
                "col-lg-4",
                "col-md-6",
                "col-sm-12"
              )}
            >
              <SocialButton
                type={"youtube"}
                name={"Kẻ Mộng Mơ ☁"}
                icon={"/img/icon/youtube-icon.png"}
                link={"https://www.youtube.com/@ke_mong_mer"}
              />
            </div>

            <div
              className={cx(
                "social-item",
                "col-xl-4",
                "col-lg-4",
                "col-md-6",
                "col-sm-12"
              )}
            >
              <SocialButton
                type={"tiktok"}
                name={"Ke Mong Mer"}
                icon={"/img/icon/tiktok-icon.png"}
                link={
                  "https://www.tiktok.com/@mongmerguy?_t=ZS-8wEipxRMAdD&_r=1"
                }
              />
            </div>

            <div
              className={cx(
                "social-item",
                "col-xl-4",
                "col-lg-4",
                "col-md-6",
                "col-sm-12"
              )}
            >
              <SocialButton
                type={"facebook"}
                name={"Băng Băng"}
                icon={"/img/icon/facebook-icon.png"}
                link={"https://www.facebook.com/bang.bang.162972/"}
              />
            </div>

            <div
              className={cx(
                "social-item",
                "col-xl-6",
                "col-lg-6",
                "col-md-6",
                "col-sm-12"
              )}
            >
              <SocialButton
                type={"github"}
                name={"Aohkne"}
                icon={"/img/icon/github-icon.png"}
                link={"https://github.com/Aohkne"}
              />
            </div>

            <div
              className={cx(
                "social-item",
                "col-xl-6",
                "col-lg-6",
                "col-md-12",
                "col-sm-12"
              )}
            >
              <SocialButton
                type={"gmail"}
                name={"aohkne@gmail.com"}
                icon={"/img/icon/gmail-icon.png"}
                link={"aohkne@gmail.com"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
