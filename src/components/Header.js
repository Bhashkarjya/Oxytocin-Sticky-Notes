const Header = ({handleDarkMode}) => {
    return(
        <div className="header">
            <h1>Sticky Notes</h1>
            <button 
                onClick={() => {
                    handleDarkMode((prevState) => !prevState)
                }}
                className="save"
            >
                Dark Mode On
            </button>
        </div>
    )
};

export default Header;