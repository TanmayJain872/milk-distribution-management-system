/* jshint esversion: 11 */

import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Tabs, Tab } from '@mui/material';
import UserAccountDetails from './UserAccountDetails';
import DeliveryOrderPlacer from './DeliveryOrderPlacer';
import MonthlyOrderedQuantityDisplayer from './MonthlyOrderedQuantityDisplayer';


function Home() {
    // Tabs
    const [value, setValue] = useState(0);
    const labelsForTabs = ['PLACE ORDER', 'ORDER HISTORY', 'PAYMENTS', 'BILLS'];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ color:'#e0e0e0' }}>DOODH WAALA</h1>
            <AppBar position='static' style={{ background: '#222222' }}>
                <Toolbar>
                    <Tabs 
                        variant='scrollable'
                        textColor='inherit' 
                        indicatorColor='primary'
                        alignitems='flex-end'
                        value={value}
                        onChange={(event, value) => setValue(value)}
                    >
                        { labelsForTabs.map(labelOfTab => <Tab key={labelOfTab} label={labelOfTab} sx={{ fontSize: '16px' }} /> ) }
                    </Tabs>
                    <UserAccountDetails />
                </Toolbar>
            </AppBar>
            <br/>
            <br/>
            { value === 0 ? <DeliveryOrderPlacer /> : null }
            { value === 2 ? <MonthlyOrderedQuantityDisplayer /> : null }
        </Box>
    )
}

export default Home;