import { gallery } from "../../interfaces/index.interface";
import Gallery from "./Gallery";
import HomeSection from "./HomeSection";
import Jumbotron from "./Jumbotron";
import styles from "../../assets/styles/components/homepage.module.scss";
import spicyIcon from "../../assets/images/icons/spicy-icon.svg";
import veganIcon from "../../assets/images/icons/vegan-icon.svg";
import vegetarianIcon from "../../assets/images/icons/vegetarian-icon.svg";
import Footer from "../Footer";

const DUMMY_GALLERY_1: gallery = {
  size: "md",
  seeMoreLink: "#",
  seeMoreText: "All Restaurants",
  cards: [
    {
      image: "claro/claro@3x.png",
      title: "Claro",
      content: "Ran Shmueli",
      link: "#",
    },
    {
      image: "lumina/lumina@3x.png",
      title: "Lumina",
      content: "Meir Adoni",
      link: "#",
    },
    {
      image: "tiger-lili/tiger-lili@3x.png",
      title: "Tiger Lilly",
      content: "Yanir Green",
      link: "#",
    },
    {
      image: "claro/claro@3x.png",
      title: "Claro",
      content: "Ran Shmueli",
      link: "#",
    },
    {
      image: "lumina/lumina@3x.png",
      title: "Lumina",
      content: "Meir Adoni",
      link: "#",
    },
    {
      image: "tiger-lili/tiger-lili@3x.png",
      title: "Tiger Lilly",
      content: "Yanir Green",
      link: "#",
    },
  ],
};

const DUMMY_GALLERY_2: gallery = {
  size: "lg",
  seeMoreLink: "#",
  cards: [
    {
      image: "pad-ki-mao/pad-ki-mao@3x.png",
      title: "Pad Ki Mao",
      content:
        "Shrimps, Glass Noodles, Kemiri Nuts, Shallots, Lemon Grass, Magic Chili Brown Coconut",
      link: "#",
      price: 88,
      aboveTitle: "Tiger Lilly",
      icon: "spicy",
    },
    {
      image: "garbanzo-frito/garbanzo-frito@3x.png",
      title: "Garbanzo Frito",
      content:
        "Polenta fingers, veal cheek,magic chili cured lemon cream, yellow laksa",
      link: "#",
      price: 98,
      aboveTitle: "Kab Kem",
    },
    {
      image: "smoked-pizza/smoked-pizza@3x.png",
      title: "Smoked Pizza",
      content: `Basil dough, cashew "butter", demi-glace, bison & radish`,
      link: "#",
      price: 65,
      aboveTitle: "Popina",
      icon: "vegan",
    },
    {
      image: "pad-ki-mao/pad-ki-mao@3x.png",
      title: "Pad Ki Mao",
      content:
        "Shrimps, Glass Noodles, Kemiri Nuts, Shallots, Lemon Grass, Magic Chili Brown Coconut",
      link: "#",
      price: 88,
      aboveTitle: "Tiger Lilly",
      icon: "spicy",
    },
    {
      image: "garbanzo-frito/garbanzo-frito@3x.png",
      title: "Garbanzo Frito",
      content:
        "Polenta fingers, veal cheek,magic chili cured lemon cream, yellow laksa",
      link: "#",
      price: 98,
      aboveTitle: "Kab Kem",
    },
    {
      image: "smoked-pizza/smoked-pizza@3x.png",
      title: "Smoked Pizza",
      content: `Basil dough, cashew "butter", demi-glace, bison & radish`,
      link: "#",
      price: 65,
      aboveTitle: "Popina",
      icon: "vegan",
    },
  ],
};

const DUMMY_GALLERY_3: gallery = {
  size: "sm",
  seeMoreLink: "#",
  cards: [
    {
      image: "onza/onza@3x.png",
      title: "Onza",
      link: "#",
    },
    {
      image: "kitchen-market/kitchen-market@3x.png",
      title: "Kitchen Market",
      link: "#",
    },
    {
      image: "mashya/mashya@3x.png",
      title: "Mashya",
      link: "#",
    },
    {
      image: "onza/onza@3x.png",
      title: "Onza",
      link: "#",
    },
    {
      image: "kitchen-market/kitchen-market@3x.png",
      title: "Kitchen Market",
      link: "#",
    },
    {
      image: "mashya/mashya@3x.png",
      title: "Mashya",
      link: "#",
    },
  ],
};

const yossiText =
  "Chef Yossi Shitrit has been living and breathing his culinary dreams for more than two decades, including running the kitchen in his first restaurant, the fondly-remembered Violet, located in Moshav  Udim. Shitrit's creativity and culinary  acumen born of long experience  are expressed in the every detail of each and every dish.";

const Homepage = () => {
  return (
    <>
      <Jumbotron />
      <HomeSection background="grey">
        <div className={styles["buttons-container"]}>
          <div className="back-sand">CHEFS</div>
          <div className="back-sand">RESTAURANTS</div>
        </div>
      </HomeSection>
      <HomeSection title="THE POPULAR RESTAURANTS IN EPICURE :">
        <Gallery gallery={DUMMY_GALLERY_1} />
      </HomeSection>
      <HomeSection title="SIGNATURE DISH OF :">
        <Gallery gallery={DUMMY_GALLERY_2} />
      </HomeSection>
      <HomeSection title="THE MEANING OF OUR ICONS :" background="grey">
        <div className={styles["icons-container"]}>
          <div>
            <img src={spicyIcon} alt="spicy" />
            <span>Spicy</span>
          </div>
          <div>
            <img src={vegetarianIcon} alt="vegetarian" />
            <span>Vegetarian</span>
          </div>
          <div>
            <img src={veganIcon} alt="vegan" />
            <span>Vegan</span>
          </div>
        </div>
      </HomeSection>

      <HomeSection title="CHEF OF THE WEEK :">
        <div className={styles["week-chef"]}>
          <div className={styles["chef-info"]}>
            <div className={styles["chef-card"]}>
              <div>
                <h3>Yossi Shitrit</h3>
              </div>
            </div>
            <div className={styles["chef-text"]}>{yossiText}</div>
          </div>
          <div className={styles["chef-restaurants"]}>
            <h3>Yossi's restaurants :</h3>
            <Gallery gallery={DUMMY_GALLERY_3} />
          </div>
        </div>
      </HomeSection>

      <Footer />
    </>
  );
};

export default Homepage;
