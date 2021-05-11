import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import HealingRoundedIcon from '@material-ui/icons/HealingRounded';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import StorageIcon from '@material-ui/icons/Storage';

import WcOutlinedIcon from '@material-ui/icons/WcOutlined';
import HealingIcon from '@material-ui/icons/LocalHospitalRounded';
import Rep1 from '../../pages/rep1_/Rep1';
import Rep2 from '../../pages/rep2_/Rep2';
import Rep3 from '../../pages/rep3_/Rep3';
import Rep4 from '../../pages/rep4_/Rep4';
import Rep5 from '../../pages/rep5_/Rep5';
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

        

          <Tab label="Datos almacenados en la base de datos de Mongo" icon={< StorageIcon/>} {...a11yProps(0)} />
          <Tab label={"Top 10  países con más vacunados en Redis "} icon={<HealingIcon />} {...a11yProps(1)} />
          <Tab label="Gráfica de pie de los géneros de los vacunados por país, en MongoDB" icon={< WcOutlinedIcon/>} {...a11yProps(2)} />
          <Tab label="Los últimos cinco vacunados almacenados por país, en MongoDB." icon={<PeopleAltRoundedIcon />} {...a11yProps(3)} />
          <Tab label="Gráfica de barras del rango de edades (de diez en diez) por cada país, en Redis" icon={< HealingRoundedIcon/>} {...a11yProps(4)} />
          <Tab label="Mapa interactivo" icon={<PublicOutlinedIcon />} {...a11yProps(5)} />
         
          
    

        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <div className="fondo">
        <Rep1/>
        </div>


      
   
      </TabPanel>

      <TabPanel value={value} index={1}>
      <div className="fondo">
        <Rep2/>
        </div>
        
      </TabPanel>

      <TabPanel value={value} index={2}>
      <div className="fondo">
        <Rep3/>
        </div>
       
      </TabPanel>

      <TabPanel value={value} index={3}>
      <div className="fondo">
        <Rep4/>
        </div>
      
      </TabPanel>

      <TabPanel value={value} index={4}>
        
      <div className="fondo">
        <Rep5/>
        </div>
      </TabPanel>

      <TabPanel value={value} index={5}>
       
       
      </TabPanel>

    </div>
  );
}