import styles from "../assets/styles/components/search-box.module.scss";
import searchIcon from "../assets/images/icons/search-icon.svg";

type props = {
  size?: string;
  direction?: string;
};

const SearchBox = ({ size = "sm", direction = "normal" }: props) => {
  return (
    <form
      className={
        "d-flex " +
        (direction === "reverse" ? "flex-row-reverse " : "flex-row ") +
        (size === "lg" ? styles["search-form-lg"] : styles["search-form"])
      }
    >
      <input
        type="text"
        placeholder="Search for restaurant cuisine, chef"
      ></input>
      <button type="submit">
        <img src={searchIcon} alt="search" />
      </button>
    </form>
  );
};

export default SearchBox;
