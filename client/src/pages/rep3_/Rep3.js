import axios from "axios";
import url from '../../shared/url';
import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
import './Rep3.css'
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";
import Swal from 'sweetalert2'
import { Bounce } from "react-awesome-reveal";
import Select from "@material-ui/core/Select";
import Grid from '@material-ui/core/Grid';



var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class GraficaCircular extends Component {
    state = {
        valores: [],
        geoUrl: "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json",
        country_name: 'Guatemala',
        paises: []
    };



    async getDataPie() {
        const ruta = url + "/consulta/3/pais/" + this.state.country_name;
        const res = await axios.get(ruta);
        let data = res.data;
        let formateado = [];
        let total = 0;
        for (let i = 0; i < data.length; i++) {
            total += data[i].count;
        }
        for (let i = 0; i < data.length; i++) {
            let porcentaje = (data[i].count / total) * 100;
            formateado.push({ y: Math.round(porcentaje, 2), label: data[i]._id });
        }
        await this.setState({ valores: formateado })
    }
    async componentDidMount() { // es como un constructor

        this.llenarPaises();
        this.getDataPie();
        this.hilo = setInterval(() => { this.getDataPie(); }, 2500);
    }

    async llenarPaises(){
        const res = await axios.get('https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json');
        console.log("GEOGRAFIA", res.data.objects.ne_110m_admin_0_countries.geometries)
        let paises_api = res.data.objects.ne_110m_admin_0_countries.geometries;
        let paises_ = [];
        paises_api.forEach(element => {
            paises_.push(element.properties.NAME_LONG);
        });
        await this.setState({ paises: paises_ })
    }

    ManejadorSearch = async (e) => {
        await this.setState({
            [e.target.name]: e.target.value, // GUARDO EL VALOR DEL INPUT DE ACUERDO A SU NOMBRE
        });
        // ACA QUE HAGA LA BUSQUEDA
        this.getDataPie();
    };

    componentWillUnmount() {
        clearInterval(this.hilo);
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
        this.getDataPie();
    }
    render() {
        const controller = {
            theme: "dark2",
            animationEnabled: true,
            exportFileName: "genderGraph",
            exportEnabled: true,
            title: {
                text: "Porcentaje de Vacunados por Sexo en " + this.state.country_name
            },
            data: [{
                type: "pie",
                showInLegend: true,
                legendText: "{label}",
                toolTipContent: "{label}: <strong>{y}%</strong>",
                indexLabel: "{y}%",
                indexLabelPlacement: "inside",
                dataPoints: this.state.valores
            }]
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
                <Grid container spacing={8}>
                    <Grid item md={12} xs={12} className="offset-2" >
                        <div className="form-group negro" style={{ marginTop: 25, marginLeft: '20%' }}>
                            <label className="col-form-label ">Selecciona un Pais</label>
                            <Select
                                name="country_name"
                                style={{
                                    width: "auto",
                                    minWidth: '60%',
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
                    <CanvasJSChart options={controller} />
                </div>
           
                <div style={{ height: 400 }}>
                </div>
            </>
        );
    }
}

export default GraficaCircular;