import React from "react";

const SearchBox = (props) => {
  const handleChange = (e) => {
    props.setSearchValue(e.target.value);
  };
  return (
    <div className="col col-sm-4 me-5">
      <input
        className="form-control"
        value={props.searchValue}
        onChange={handleChange}
        placeholder="영화 검색..."
        type="text"
      />
    </div>
  );
};

export default SearchBox;
