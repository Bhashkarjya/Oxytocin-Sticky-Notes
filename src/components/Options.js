import { AwesomeButton } from "react-awesome-button";

const Options = ({handleGrouping}) => {
    return(
        <div className="options">
            <AwesomeButton type="secondary" onPress = {() => handleGrouping(false)}>
                Notes Ungrouped
            </AwesomeButton>
            <AwesomeButton type="primary" onPress = {() => handleGrouping(true)}>
                Notes Grouped
            </AwesomeButton>
        </div>
    
    )
};

export default Options;