import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const AboutPage = () => {
    return (
        <div>
            <h1 className="d-flex justify-content-center">
                This is about page
            </h1>
            ;<Button>Bootstrap + Nextjs</Button>
        </div>
    );
};

export default AboutPage;
