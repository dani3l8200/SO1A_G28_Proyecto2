



import url from '../../shared/url';
import React, { Component } from "react";
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Bounce, Zoom } from "react-awesome-reveal";


export default class TableRep1 extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tituloReporte: this.props.tituloReporte || '',
      titulos: this.props.titulos || ['name', 'location', 'gender', 'age', 'vaccine_type'],
      numConsulta: this.props.numConsulta || 1,
      consulta: this.props.consulta || [], // no se envia sino que se hace la peticion desde aca: :v
      redis: this.props.redis || false,
      urlRedis: this.props.urlRedis || ''
    }
  }

  async componentDidMount() {
    // constructor
      this.getConsulta();
      this.hilo = setInterval(() =>{this.getConsulta();},2500);
  }

  componentWillUnmount() {
    clearInterval(this.hilo);
  }

  async getConsulta() {
    //console.log('escuchando')
    if (this.state.redis ===  true){
      const res = await axios.get(this.state.urlRedis);
      let top = [];
      for (let i = 0; i < res.data.length && i < 10; i++) {
        top.push(res.data[i])
      }
      console.log("TOP 10", top);
      this.setState({ consulta: top });
    }else{
      const ruta = url + "/consulta/"+this.state.numConsulta;
      const res = await axios.get(ruta);
      
      //console.log(res);
      this.setState({ consulta: res.data });
    }
  }



  render() {

    return (
      <div style={{ marginTop: -300 }}>

        <Bounce left>
          <h2 style={{ textAlign: 'center' }}>{this.state.tituloReporte}</h2>
        </Bounce>



        <Zoom>



          <TableContainer component={Paper} className="my-3" style={{ maxHeight: 481, maxWidth: '100%' }}>
            <Table style={{ minWidth: 900 }} aria-label="caption table" >
              <TableHead >

                <TableRow >
                <TableCell align="center" className="text-black" style={{fontWeight:'bolder' , textTransform:'uppercase'}} >{'#'}</TableCell>
                  {
                    this.state.titulos.map((row) => (
                      <TableCell align="center" className="text-black" style={{fontWeight:'bolder' , textTransform:'uppercase'}}>{row}</TableCell>
                    ))
                  }
                </TableRow>

              </TableHead>
              <TableBody>
                {this.state.consulta.map((row , index) => (
                  <TableRow key={row.name}>
                    <TableCell align="center" className="text-black">{ index + 1 }</TableCell>
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
    );
  }
}