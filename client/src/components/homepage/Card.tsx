import { card } from "../../interfaces/index.interface";
import styles from "../../assets/styles/components/card.module.scss";
import spicyIcon from "../../assets/images/icons/spicy-icon.svg";
import veganIcon from "../../assets/images/icons/vegan-icon.svg";
import vegetarianIcon from "../../assets/images/icons/vegetarian-icon.svg";

type props = {
  card: card;
  size?: string;
};

const Card = ({ card, size = "md" }: props) => {
  let imageFileName: string = "";
  if (card.image) imageFileName = card.image;
  let imagePath: string = "";
  if (card.image)
    imagePath = require("../../assets/images/cards/".concat(
      imageFileName
    )).default;

  let backClass = size === "sm" ? "back-beige" : "back-peach";
  let widthClass = "width-1";
  if (size === "md") widthClass = "width-2";
  if (size === "lg") widthClass = "width-3";

  return (
    <div
      className={
        (size === "sm" ? styles["card-sm"] : styles.card) +
        " " +
        styles[widthClass]
      }
    >
      {card.aboveTitle && (
        <div className={styles["above-title"]}>
          <h4>{card.aboveTitle}</h4>
        </div>
      )}

      {card.image && (
        <div
          className={
            styles.img + " " + (size === "lg" ? styles.lg : styles["sm-md"])
          }
          style={{
            backgroundImage: "url(" + imagePath + ")",
          }}
        ></div>
      )}
      <div className={styles["content-wrapper"] + " " + backClass}>
        {card.title && <h4>{card.title}</h4>}
        {card.content && <p>{card.content}</p>}
        {card.icon === "spicy" && (
          <div className={styles["icon-wrapper"]}>
            <img src={spicyIcon} className={styles.icon} alt="spicy" />
          </div>
        )}
        {card.icon === "vegan" && (
          <div className={styles["icon-wrapper"]}>
            <img src={veganIcon} className={styles.icon} alt="vegan" />
          </div>
        )}
        {card.icon === "vegetarian" && (
          <div className={styles["icon-wrapper"]}>
            <img
              src={vegetarianIcon}
              className={styles.icon}
              alt="vegetarian"
            />
          </div>
        )}
        {card.price && (
          <div className={styles.price}>
            <hr />
            <span>
              <span>₪</span>
              {card.price}
            </span>
            <hr />
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
