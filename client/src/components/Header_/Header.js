import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LandscapeIcon from '@material-ui/icons/Landscape';
import MonitorIcon from '@material-ui/icons/DesktopWindows';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import HealingRoundedIcon from '@material-ui/icons/HealingRounded';
import ReportProblemRoundedIcon from '@material-ui/icons/ReportProblemRounded';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import StorageIcon from '@material-ui/icons/Storage';
import CompareIcon from '@material-ui/icons/Compare';
import WcOutlinedIcon from '@material-ui/icons/WcOutlined';
import HealingIcon from '@material-ui/icons/LocalHospitalRounded';
import Footer from '../Footer_/Footer';
import './Header.css';
import PublicOutlinedIcon from '@material-ui/icons/PublicOutlined';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const mensaje = "Grupo 28";

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >

        

          <Tab label="Collections MongoDB" icon={< StorageIcon/>} {...a11yProps(0)} />
          <Tab label={"Top 10 of vaccinated countries "} icon={<HealingIcon />} {...a11yProps(1)} />
          <Tab label="Pie Chart of gender vaccinated By Country" icon={< WcOutlinedIcon/>} {...a11yProps(2)} />
          <Tab label="Last 5 vaccinated people stored in Mongo by country" icon={<PeopleAltRoundedIcon />} {...a11yProps(3)} />
          <Tab label="Bar Chart of vaccinated age range in Redis by country" icon={< HealingRoundedIcon/>} {...a11yProps(4)} />
          <Tab label="Interactive realtime map to query this reports" icon={<PublicOutlinedIcon />} {...a11yProps(5)} />
          <Tab label="red infected,yellow less infected and green no infected country" icon={< ReportProblemRoundedIcon/>} {...a11yProps(6)} />
          
    

        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <div className="fondo">
        <Footer/>
        </div>


      
   
      </TabPanel>

      <TabPanel value={value} index={1}>
        
        
      </TabPanel>

      <TabPanel value={value} index={2}>
       
       
      </TabPanel>

      <TabPanel value={value} index={3}>
      
      
      </TabPanel>

      <TabPanel value={value} index={4}>
        
        
      </TabPanel>

      <TabPanel value={value} index={5}>
       
       
      </TabPanel>

    </div>
  );
}