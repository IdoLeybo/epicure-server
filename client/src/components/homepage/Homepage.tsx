import {
  dbDish,
  dbRestaurant,
  gallery,
} from "../../interfaces/index.interface";
import Gallery from "./Gallery";
import HomeSection from "./HomeSection";
import Jumbotron from "./Jumbotron";
import styles from "../../assets/styles/components/homepage.module.scss";
import spicyIcon from "../../assets/images/icons/spicy-icon.svg";
import veganIcon from "../../assets/images/icons/vegan-icon.svg";
import vegetarianIcon from "../../assets/images/icons/vegetarian-icon.svg";
import Footer from "../Footer";
import { useEffect, useState } from "react";
export const URI = process.env.URI || "http://localhost:8080";
const user = JSON.parse(localStorage.getItem("user") as any);

const yossiText =
  "Chef Yossi Shitrit has been living and breathing his culinary dreams for more than two decades, including running the kitchen in his first restaurant, the fondly-remembered Violet, located in Moshav  Udim. Shitrit's creativity and culinary  acumen born of long experience  are expressed in the every detail of each and every dish.";

const Homepage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [restaurantsArr, setRestaurantsArr] = useState([]);
  const [chefsArr, setChefsArr] = useState([]);
  const [dishArr, setDishArr] = useState([]);
  const [chefRests, setChefRests] = useState([]);

  useEffect(() => {
    if (isLoading === true) {
      getAllData();
      setIsLoading(false);
    }
  }, []);

  const createGallery1 = (restaurants: dbRestaurant[]): gallery => {
    const gallery: gallery = {
      size: "md",
      seeMoreLink: "#",
      seeMoreText: "All Restaurants",
      cards: [],
    };
    gallery.cards = restaurants.map((item) => {
      return {
        image: item.image,
        title: item.name,
        content: item.chef.chefName,
        link: "#",
      };
    });
    return gallery;
  };

  const createGallery2 = (dishes: dbDish[]): gallery => {
    const gallery: gallery = {
      size: "lg",
      seeMoreLink: "#",
      cards: [],
    };
    gallery.cards = dishes.map((item) => {
      return {
        image: item.image,
        title: item.name,
        content: item.description,
        link: "#",
        price: item.price,
        aboveTitle: item.restaurant.name,
        icon: item.typeIcon,
      };
    });
    return gallery;
  };

  const createGallery3 = (restaurants: dbRestaurant[]): gallery => {
    const gallery: gallery = {
      size: "sm",
      seeMoreLink: "#",
      cards: [],
    };
    gallery.cards = restaurants.map((item) => {
      return {
        image: item.image,
        title: item.name,
        link: "#",
      };
    });
    return gallery;
  };

  const getAllData = async () => {
    try {
      const res = await fetch(`${URI}/api/all/data`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();

      data.map((obj: any) => {
        obj.name === "chefs"
          ? setChefsArr(obj.data)
          : obj.name === "restaurants"
          ? setRestaurantsArr(obj.data)
          : obj.name === "chefRestaurants"
          ? setChefRests(obj.data[0].restaurants)
          : setDishArr(obj.data);
      });
      return;
    } catch (err) {
      console.error(err);
    }
  };

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
        <Gallery gallery={createGallery1(restaurantsArr)} />
      </HomeSection>
      <HomeSection title="SIGNATURE DISH OF :">
        <Gallery gallery={createGallery2(dishArr)} />
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
            <Gallery gallery={createGallery3(chefRests)} />
          </div>
        </div>
      </HomeSection>

      <Footer />
    </>
  );
};

export default Homepage;
