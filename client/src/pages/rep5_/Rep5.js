/*

    REPORTE 7 GRAFICO DE BARRAS

*/
// para las peticiones
import axios from "axios";
import url from '../../shared/url';
import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
import Select from "@material-ui/core/Select";
import Grid from '@material-ui/core/Grid';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class GraficaBarras extends Component {
    state = {
        country_name: '',
        valores: [],
        paises: [{ location: 'Guatemala' }, { location: 'Brasil' }]
    };

    ManejadorRespuesta = async (e) => {
        await this.setState({
            [e.target.name]: e.target.value, // GUARDO EL VALOR DEL INPUT DE ACUERDO A SU NOMBRE
        });
        // ACA QUE HAGA LA BUSQUEDA
    };


    async componentDidMount() { // es como un constructor
        this.getPorEdadPorPais();
    }

    async getPorEdadPorPais() {  // POR CADA PAIS
        const ruta = url + "/consulta/5";
        const res = await axios.get(ruta);
        let data = res.data;
        console.log(data)
        let formateado = [{ y: 0, label: "0-10 años" },
        { y: 0, label: "11-20 años" },
        { y: 0, label: "21-30 años" },
        { y: 0, label: "31-40 años" },
        { y: 0, label: "41-50 años" },
        { y: 0, label: "61-70 años" },
        { y: 0, label: "71-80 años" },
        { y: 0, label: "81-90 años" },
        { y: 0, label: "91-100 años" }];


        for (let i = 0; i < data.length; i++) {
            if ((data[i]._id) <= 10) {
                formateado[0].y += data[i].count;
            } else if ((data[i]._id) <= 20) {
                formateado[1].y += data[i].count;
            } else if ((data[i]._id) <= 30) {
                formateado[2].y += data[i].count;
            } else if ((data[i]._id) <= 40) {
                formateado[3].y += data[i].count;
            } else if ((data[i]._id) <= 50) {
                formateado[4].y += data[i].count;
            } else if ((data[i]._id) <= 60) {
                formateado[5].y += data[i].count;
            } else if ((data[i]._id) <= 70) {
                formateado[6].y += data[i].count;
            } else if ((data[i]._id) <= 80) {
                formateado[7].y += data[i].count;
            } else if ((data[i]._id) <= 90) {
                formateado[8].y += data[i].count;
            } else if ((data[i]._id) <= 100) {
                formateado[9].y += data[i].count;
            }
        }




        await this.setState({ valores: formateado })
    }

    render() {
        const options = {
            title: {
                text: "Vacunados por Rango de Edades"
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
                <Grid container spacing={8}>
                    <Grid item md={12} xs={12} className="offset-2" >


                        <div className="form-group negro" style={{ marginTop: 25, marginLeft: '20%' }}>

                            <label className="col-form-label ">
                                Selecciona un Pais
                    </label>

                            <Select
                                name="country_name"
                                style={{
                                    width: "auto",
                                    minWidth: '60%',
                                    marginTop: 0,
                                    marginLeft: 25,
                                    marginBottom: 15,
                                    background:'white',

                                }}
                                native
                                value={this.state.country_name}
                                onChange={this.ManejadorRespuesta.bind(this)}

                            >
                                {
                                    this.state.paises.map((row) => (
                                        <option key={row.location} value={row.location} style={{textAlign:'center'}}>   {row.location}   </option>
                                    ))

                                }
                            </Select>



                        </div>





                    </Grid>


                </Grid>



                <div className="col-8">
                    <CanvasJSChart options={options} />
                </div>

            </>
        );
    }

}

export default GraficaBarras;