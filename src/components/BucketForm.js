import React from "react";
import { Form,Button } from "react-bootstrap";
import {AwesomeButton} from "react-awesome-button";
import "react-awesome-button/dist/styles.css";


const BucketForm = (handleSubmit) => {
    return(
        <Form className="bucket-form" onSubmit={(e) => handleSubmit(e.target.value)}>
            <Form.Group className="bucket-container">
                <Form.Label>Bucket Name</Form.Label>
                <Form.Control placeholder="Enter the bucket name" />
            </Form.Group>
            <AwesomeButton type="Submit">
                Submit
            </AwesomeButton>
        </Form>
    );
};

export default BucketForm;