import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FindStock from './tabs/findStock/FindStock';
import CreateStock from './tabs/createStock/CreateStock';

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children} {/* Se eliminó <Typography> para evitar el error */}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export const Stock = () => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleMainTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleMainTabChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="stock tabs"
                >
                    <Tab
                        icon={<SearchIcon />}
                        iconPosition="start"
                        label="Buscar en stock"
                        {...a11yProps(0)}
                    />
                    <Tab
                        icon={<AddIcon />}
                        iconPosition="start"
                        label="Crear nuevo Stock"
                        {...a11yProps(1)}
                    />
                </Tabs>
            </AppBar>

            <TabPanel value={value} index={0} dir={theme.direction}>
                <FindStock />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <CreateStock />
            </TabPanel>
        </Box>
    );
};
