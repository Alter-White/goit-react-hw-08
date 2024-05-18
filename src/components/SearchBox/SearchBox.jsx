import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filtersSlice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const searchContact = useSelector((state) => state.filters.filterValue);
  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };
  return (
    <div className={css.searchContainer}>
      <label htmlFor="search">Find contacts by name:</label>
      <input
        className={css.searchInput}
        type="text"
        id="search"
        value={searchContact}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBox;
