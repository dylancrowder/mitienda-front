import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, AppBar, Tabs, Tab, Typography } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
      sx={{ p: 0 }}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: number) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

export const VentasContent = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleTabChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };



  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%", maxWidth: 1000, mx: "auto", mt: 2 }}>

      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="Ventas y Stock"
        >
          <Tab label="Vender"  {...a11yProps(0)}  />
          <Tab label="Vernder con Stock" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        {/* Ventas Varias */}
        {/* agregar aca !! */}
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        {/* Buscar Stock */}
        {/*  agregar aca */}
      </TabPanel>
    </Box>
  );
};
