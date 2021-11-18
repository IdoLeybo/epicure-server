import React, { ReactChild, ReactChildren } from "react";
import styles from "../../assets/styles/components/home-section.module.scss";

type props = {
  title?: string;
  background?: string;
  children?: ReactChild | ReactChildren;
};

const HomeSection = ({ title, background = "none", children }: props) => {
  return (
    <section
      className={
        styles["home-section"] +
        " d-flex " +
        (background === "grey" ? "back-grey" : "")
      }
      data-aos="zoom-in"
    >
      <div className="container">
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </section>
  );
};

export default HomeSection;
