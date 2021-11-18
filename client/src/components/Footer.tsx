import { ReactChild, ReactChildren } from "react";
import styles from "../assets/styles/components/footer.module.scss";
import appleIcon from "../assets/images/icons/apple-icon.svg";
import playIcon from "../assets/images/icons/play-icon.svg";
import aboutLogo from "../assets/images/brand-icon/about-logo@3x.png";

type props = {
  children?: ReactChild | ReactChildren;
};

const footerTextP1 =
  "Id quis laborum cillum id officia consectetur veniam duis velit enim dolor incididunt nisi. Minim ut in aute exercitation exercitation. Anim incididunt sit adipisicing exercitation mollit aliqua velit ut nostrud aute exercitation. Enim occaecat id laborum consectetur commodo tempor ipsum deserunt aute commodo aute.";
const footerTextP2 =
  "Ex velit consectetur duis voluptate aliqua nisi dolor reprehenderit reprehenderit nostrud fugiat. Dolore veniam voluptate aliqua esse exercitation magna in veniam elit voluptate voluptate incididunt cupidatat.";

const Footer = ({ children }: props) => {
  return (
    <section className={styles.footer} data-aos="fade-in">
      <div className={"back-grey " + styles["footer-wrapper"]}>
        <div className={"container " + styles["footer-main"]}>
          <div className={styles["about-left"]}>
            <h2>ABOUT US :</h2>
            <p>{footerTextP1}</p>
            <p>{footerTextP2}</p>
            <img
              src={aboutLogo}
              className={styles["mobile-only-logo"]}
              alt="logo"
            />
            <div className={styles["app-buttons-container"]}>
              <AppButton type="apple" />
              <AppButton type="android" />
            </div>
          </div>
          <div className={styles["about-right"]}>
            <img src={aboutLogo} alt="logo" />
          </div>
        </div>
      </div>
      <div className={styles["footer-wrapper"]}>
        <div className={"container " + styles["footer-links"]}>
          <a href="#">Contact Us</a>
          <a href="#">Term of Use</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </section>
  );
};

type buttonProps = {
  type: string;
};

const AppButton = ({ type }: buttonProps) => {
  const text1 = type === "apple" ? "Download on the" : "Get it on";
  const text2 = type === "apple" ? "App Store" : "Google Play";
  return (
    <div className={styles["app-button"]}>
      <div className={styles["os-icon"]}>
        <img src={type === "apple" ? appleIcon : playIcon} alt="os icon" />
      </div>
      <div className="d-flex flex-column">
        <span className={styles["text-sm"]}>{text1}</span>
        <span className={styles["text-lg"]}>{text2}</span>
      </div>
    </div>
  );
};

export default Footer;
