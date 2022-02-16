import { MdSearch } from "react-icons/md";

const SearchBar = ({handleSearchNote}) => {
    return(
        <div className="search-bar">
            <MdSearch className="search-icon" size = "1.3em"/>
            <input 
                onChange = {(event) => handleSearchNote(event.target.value)}
                type="text" 
                placeholder="type to search..."/>
        </div>
    )
};

export default SearchBar;