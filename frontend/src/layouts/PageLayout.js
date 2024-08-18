import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";


const PageLayout = ({ children }) => {

    return (<>
        <Header />
        <Navbar />
        <div>{children}</div>
        <Footer />
    </>
    )

};

export default PageLayout;