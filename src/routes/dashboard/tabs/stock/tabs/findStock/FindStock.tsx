import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FindCodebar from './findbar/FindCodebar';
import FindManual from './findmanual/FindManual';

const FindStock = () => {
    const [searchTab, setSearchTab] = useState<number>(0);

    const handleSearchTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setSearchTab(newValue);
    };

    return (
        <>

            {/* Barra de búsqueda centrada */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
                <Tabs
                    value={searchTab}
                    onChange={handleSearchTabChange}
                    aria-label="search options"
                    textColor="primary"
                    indicatorColor="primary"
                >
                    <Tab label="Buscar por Código" />
                    <Tab label="Buscar Manualmente" />
                </Tabs>
            </Box>

            <Box>
                {searchTab === 0 && <FindCodebar />}
                {searchTab === 1 && <FindManual />}
            </Box>
        </>
    );
};

export default FindStock;
