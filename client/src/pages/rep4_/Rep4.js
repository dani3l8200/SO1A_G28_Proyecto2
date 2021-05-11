import { Component } from "react";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";
import Swal from 'sweetalert2'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Bounce, Zoom } from "react-awesome-reveal";

import url from '../../shared/url';
import axios from "axios";
/*



                            PARA REDIS



*/


export default class Rep4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            geoUrl: "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json",
            country_name: 'Guatemala',
            tituloReporte: 'Ultimos 5 Vacunados en ',
            titulos: ['name', 'location', 'gender', 'age', 'vaccine_type'],
            numConsulta: 4,
            consulta: [], // no se envia sino que se hace la peticion desde aca: :v
        }
    }

    async componentDidMount() {
        // constructor
        this.getConsulta();
        this.hilo = setInterval(() => { this.getConsulta(); }, 2500);
        await this.setState({ tituloReporte:  'Ultimos 5 Vacunados en '+this.state.country_name})

    }

    componentWillUnmount() {
        clearInterval(this.hilo);
    }

    async getConsulta() {
        //console.log('escuchando')
        if (this.state.country_name !== undefined){
            const ruta = url + "/consulta/4/pais/"+this.state.country_name;
            const res = await axios.get(ruta);
            console.log(res);
            this.setState({ consulta: res.data });
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
        await this.setState({ country_name: name })
        await this.setState({ tituloReporte:  'Ultimos 5 Vacunados en '+this.state.country_name})
        await this.getConsulta();
    }
    render() {
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
                                            onClick={this.setCountrySearch.bind(this, geo.properties.NAME)}
                                            onMouseEnter={() => {

                                            }}
                                            onMouseLeave={() => {
                                            }}
                                            style={{
                                                default: {
                                                    fill: "#D6D6DA",
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







                <div style={{ height: 100 }}>

                </div>

                <div style={{ marginTop: -300 }}>

                    <Bounce left>
                        <h2 style={{ textAlign: 'center' }}>{this.state.tituloReporte}</h2>
                    </Bounce>



                    <Zoom>



                        <TableContainer component={Paper} className="my-3" style={{ maxHeight: 481, maxWidth: '100%' }}>
                            <Table style={{ minWidth: 900 }} aria-label="caption table" >
                                <TableHead >

                                    <TableRow >
                                        <TableCell align="center" className="text-black" style={{ fontWeight: 'bolder', textTransform: 'uppercase' }} >{'#'}</TableCell>
                                        {
                                            this.state.titulos.map((row) => (
                                                <TableCell align="center" className="text-black" style={{ fontWeight: 'bolder', textTransform: 'uppercase' }}>{row}</TableCell>
                                            ))
                                        }
                                    </TableRow>

                                </TableHead>
                                <TableBody>
                                    {this.state.consulta.map((row, index) => (
                                        <TableRow key={row.name}>
                                            <TableCell align="center" className="text-black">{index + 1}</TableCell>
                                            {this.state.titulos.map((titulo) => (
                                                <TableCell align="center" className="text-black">{row[titulo]}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Zoom>

                </div>

                <div style={{ height: 100 }}>

                </div>
            </>
        );
    }
}

