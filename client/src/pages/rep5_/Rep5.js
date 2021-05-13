/*

    REPORTE 7 GRAFICO DE BARRAS

*/
// para las peticiones
import axios from "axios";

import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
import { Bounce } from "react-awesome-reveal";

import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";
import Swal from 'sweetalert2'
import Select from "@material-ui/core/Select";
import Grid from '@material-ui/core/Grid';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class GraficaBarras extends Component {
    state = {
        geoUrl: "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json",
        country_name: 'Guatemala',
        valores: [],
        urlRedis: 'https://us-central1-deft-set-312418.cloudfunctions.net/rep-pais-edades',
        paises: []
    };


    async componentDidMount() { // es como un constructor
        this.llenarPaises();
        this.getPorEdadPorPais();
        this.hilo = setInterval(() => { this.getPorEdadPorPais(); }, 2500);
    }


    componentWillUnmount() {
        clearInterval(this.hilo);
    }

    ManejadorSearch = async (e) => {
        await this.setState({
            [e.target.name]: e.target.value, // GUARDO EL VALOR DEL INPUT DE ACUERDO A SU NOMBRE
        });
        // ACA QUE HAGA LA BUSQUEDA
        this.getPorEdadPorPais();
    };

    async llenarPaises(){
        const res = await axios.get('https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json');
        console.log("GEOGRAFIA", res.data.objects.ne_110m_admin_0_countries.geometries)
        let paises_api = res.data.objects.ne_110m_admin_0_countries.geometries;
        let paises_ = [];
        paises_api.forEach(element => {
            paises_.push(element.properties.NAME_LONG);
        });
        await this.setState({ paises: paises_ });
    
    }
    async getPorEdadPorPais() {  // POR CADA PAIS

    
        if (this.state.country_name !== undefined){ 
           
            await axios.get(this.state.urlRedis ).then( async (res)=>{

                const locations2 = res.data[this.state.country_name].reduce( (edades, item) => {
                    const location = (edades[item.age] || [])
                    location.push(item);
                    edades[item.age] = location;
                    return edades;
                  }, {}
                  );   

                  const paises_total = [];
                  for (const property in locations2) {
                      console.log(`{"${property}": ${locations2[property].length}}`);
                      paises_total.push(JSON.parse(`{"edad":"${property}", "count": ${locations2[property].length}}`));
                  }

                    console.log("edades_>", res.data);
                  if(paises_total.length != 0 ){
                    let data = paises_total;
                    let formateado = [
                    { y: 0, label: "0-10 años" },
                    { y: 0, label: "11-20 años" },
                    { y: 0, label: "21-30 años" },
                    { y: 0, label: "31-40 años" },
                    { y: 0, label: "41-50 años" },
                    { y: 0, label: "51-60 años" },
                    { y: 0, label: "61-70 años" },
                    { y: 0, label: "71-80 años" },
                    { y: 0, label: "81-90 años" },
                    { y: 0, label: "91-100 años" }
                ];
            
            
                    for (let i = 0; i < data.length; i++) {
                        if ((data[i].edad) <= 10) {
                            formateado[0].y += data[i].count;
                        } else if ((data[i].edad) <= 20) {
                            formateado[1].y += data[i].count;
                        } else if ((data[i].edad) <= 30) {
                            formateado[2].y += data[i].count;
                        } else if ((data[i].edad) <= 40) {
                            formateado[3].y += data[i].count;
                        } else if ((data[i].edad) <= 50) {
                            formateado[4].y += data[i].count;
                        } else if ((data[i].edad) <= 60) {
                            formateado[5].y += data[i].count;
                        } else if ((data[i].edad) <= 70) {
                            formateado[6].y += data[i].count;
                        } else if ((data[i].edad) <= 80) {
                            formateado[7].y += data[i].count;
                        } else if ((data[i].edad) <= 90) {
                            formateado[8].y += data[i].count;
                        } else if ((data[i].edad) <= 100) {
                            formateado[9].y += data[i].count;
                        }
                    }
                    await this.setState({ valores: formateado });
                  
                
                }else{
                    await this.setState({ valores: [] });
                  }
                

              }).catch( (err) => { console.log(err); this.setState({valores: []});  });
             
        }



    }

    async setCountrySearch(name) {  // POR CADA PAIS
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: name,
            showConfirmButton: false,
            timer: 1500
        })
        await this.setState({ country_name: name });
        await this.getPorEdadPorPais();
    }


    render() {
        const options = {
            title: {
                text: "Vacunados por Rango de Edades en " + this.state.country_name
            }, theme: "dark2", animationEnabled: true,
            exportFileName: "AgeGraph",
            exportEnabled: true,
            data: [
                {
                    type: "column",
                    dataPoints: this.state.valores
                }
            ]
        }
        return (
            <>
                <Bounce>
                    <label className="col-form-label ">
                        Selecciona un Pais
                </label>
                </Bounce>
                <div style={{ width: 800, height: 800, marginBottom: 0 }}>
                    <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
                        <ZoomableGroup>
                            <Geographies geography={this.state.geoUrl}>
                                {({ geographies }) =>
                                    geographies.map((geo) => (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            onClick={this.setCountrySearch.bind(this, geo.properties.NAME_LONG)}
                                            onMouseEnter={() => {

                                            }}
                                            onMouseLeave={() => {
                                            }}
                                            style={{
                                                default: {
                                                    fill: "#00283d",
                                                    outline: "none"
                                                },
                                                hover: {
                                                    fill: "#F53",
                                                    outline: "none"
                                                },
                                                pressed: {
                                                    fill: "#E42",
                                                    outline: "none"
                                                }
                                            }}
                                        />
                                    ))
                                }
                            </Geographies>
                        </ZoomableGroup>
                    </ComposableMap>
                </div>




                <Grid container spacing={7}>
                    <Grid item md={12} xs={12} className="offset-2" >
                        <div className="form-group negro" style={{ marginTop: 25, marginLeft: '25%' }}>
                            <label className="col-form-label ">Selecciona un Pais</label>
                            <Select
                                name="country_name"
                                style={{
                                    width: "auto",
                                    minWidth: '47%',
                                    marginTop: 0,
                                    marginLeft: 25,
                                    marginBottom: 15,
                                    background: 'white',

                                }}
                                native
                                value={this.state.country_name}
                                onChange={this.ManejadorSearch.bind(this)}

                            >
                                {
                                    this.state.paises.map((row) => (
                                        <option key={row} value={row} style={{ textAlign: 'center' }}>   {row}   </option>
                                    ))

                                }
                            </Select>
                        </div>
                    </Grid>
                </Grid>

                <div className="col-8" style={{ marginTop: 0 }}>
                    <CanvasJSChart options={options} />
                </div>

                <div style={{ height: 400 }}>

                </div>
            </>
        );
    }

}

export default GraficaBarras;