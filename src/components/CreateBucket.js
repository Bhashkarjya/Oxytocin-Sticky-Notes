import {AwesomeButton} from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

const CreateBucket = ({handleCreateBucket}) => {
    return(
        <AwesomeButton type="primary" onPress={() => handleCreateBucket(true)}>
            Create Bucket
        </AwesomeButton>
    )
};

export default CreateBucket;