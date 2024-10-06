import React from "react";
import { AppBar, Toolbar, Tabs, Tab, Typography } from "@mui/material";
import UserAccountDetails from "./UserAccountDetails";

const PrimaryHeader = ({
    value,
    setValue,
    headerColor = "#222222",
    ...props
}) => {

    const quickLinks = [
        {
            id: 1,
            label: "PRODUCTS",
            path: "/home",
        },
        {
            id: 2,
            label: "CART",
            path: "/cart",
        },
        {
            id: 3,
            label: "ORDERS",
            path: "/orders",
        },
        {
            id: 4,
            label: "PAYMENTS",
            path: "/payment-history",
        },
    ];

    return (
        <AppBar
            sx={{
                backgroundColor: headerColor,
            }}
        >
            <Toolbar
                sx={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        gap: "40px",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h4" sx={{ color:"#e0e0e0", fontWeight: "bold" }}>MOO</Typography>
                    <Tabs 
                        variant="scrollable"
                        textColor="inherit" 
                        indicatorColor="primary"
                        value={value}
                        onChange={(event, value) => setValue(value)}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        { quickLinks.map(item => <Tab key={item?.id} label={item?.label} sx={{ fontSize: "16px" }} /> ) }
                    </Tabs>
                </div>
                <UserAccountDetails />
            </Toolbar>
        </AppBar>
    );
};

export default PrimaryHeader;