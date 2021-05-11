import axios from "axios";
import url from '../../shared/url';
import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
import './Rep3.css'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class GraficaCircular extends Component {
    state = {
        valores: []
    };



    async getDataPie() {
        const ruta = url + "/consulta/3";
        const res = await axios.get(ruta);
        let data = res.data;
        let formateado = [];
        let total = 0;
        for (let i = 0; i < data.length; i++) {
            total += data[i].count;
        }
        for (let i = 0; i < data.length; i++) {
            let porcentaje = (data[i].count / total) * 100;
            formateado.push({ y:  Math. round(porcentaje , 2), label: data[i]._id });
        }
        await this.setState({ valores: formateado })
    }
    async componentDidMount() { // es como un constructor

        this.getDataPie();
        this.hilo = setInterval(() =>{this.getDataPie();},2500);
    }
  
    componentWillUnmount() {
      clearInterval(this.hilo);
    }
    render() {
        const controller = {
            theme: "dark2",
            animationEnabled: true,
            exportFileName: "genderGraph",
            exportEnabled: true,
            title: {
                text: "Porcentaje de Vacunados por Sexo"
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

          
                    

            <div className="col-8">
            <CanvasJSChart options={controller} />
		    </div>
                
             
            </>
        );
    }
}

export default GraficaCircular;