import styles from "../../assets/styles/components/gallery.module.scss";
import { gallery } from "../../interfaces/index.interface";
import Card from "./Card";
import { useRef } from "react";
import useDraggableScroll from "use-draggable-scroll";
import arrows from "../../assets/images/icons/all-restaurants-arrows.svg";
import { v4 as uuidv4 } from "uuid";

type props = {
  gallery: gallery;
};

const Gallery = ({ gallery }: props) => {
  const ref = useRef(null);

  const { onMouseDown } = useDraggableScroll(ref, { direction: "horizontal" });

  return (
    <div className={styles.gallery}>
      <div
        className={
          gallery.size === "sm"
            ? styles["cards-container-small"]
            : styles["cards-container"]
        }
        ref={ref}
        onMouseDown={onMouseDown}
      >
        {gallery.cards?.map((item) => (
          <Card card={item} size={gallery.size} key={uuidv4()} />
        ))}
      </div>
      {gallery.seeMoreLink && gallery.seeMoreText && (
        <a href={gallery.seeMoreLink} className={styles["see-more"]}>
          <span>{gallery.seeMoreText}</span>
          <img src={arrows} alt="arrow" />
        </a>
      )}
    </div>
  );
};

export default Gallery;
