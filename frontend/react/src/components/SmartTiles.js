import { Button, ButtonGroup } from "@mui/material";
import React, { useState } from "react";


const styleOfTile = {
    border: "1px solid",
    width: "66.7px",
    height: "29.5px",
    borderRadius: "0px",
};

const SmartTiles = ({ ...props }) => {
    const [tileData, setTileData] = useState([
        "0.5 L",
        "1 L",
        "1.5 L",
        "2 L",
        "2.5 L",
        "3 L",
    ]);
    return (
        <ButtonGroup
            variant="contained"
            sx={{
                display: "grid",
                gridTemplateColumns: "66.7px 66.7px 66.7px",
                // gridTemplateRows: "29.5px 29.5px",
                gap: "0px",
                width: "201px",
            }}
        >
            {
                tileData.map((data) => (
                    <Button
                        type="submit"
                        variant="contained"
                        value={data?.split(" ")?.[0]}
                        color="primary"
                        sx={styleOfTile}
                    >
                        {data}
                    </Button>
                ))
            }
        </ButtonGroup>
    )
};

export default SmartTiles;