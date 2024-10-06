/* jshint esversion: 11 */

import React, { useState } from "react";
import PrimaryHeader from "./PrimaryHeader";
import DeliveryRequestForm from "./DeliveryRequestForm";
import MonthlyOrderedQuantityDisplayer from "./MonthlyOrderedQuantityDisplayer";


function Home() {
    // Tabs
    const [value, setValue] = useState(0);
    const [selectedTab, setSelectedTab] = useState(null);

    return (
        <>
            <PrimaryHeader
                value={value}
                setValue={setValue}
            />
            <br/>
            <br/>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    textAlign: "center",
                    color: "#e0e0e0",
                    marginTop: "50px",
                }}
            >
                <DeliveryRequestForm/> 
                <MonthlyOrderedQuantityDisplayer />
            </div>
        </>
    );
}

export default Home;