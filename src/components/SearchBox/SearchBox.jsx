import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import { TextField } from "@mui/material";
import css from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const searchContact = useSelector((state) => state.filters.filterValue);
  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };
  return (
    <div className={css.searchContainer}>
      <TextField
        label="Find contacts"
        variant="outlined"
        value={searchContact}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBox;
