import { Component } from "react";
import TableDataMongo from '../../components/Table_/TableDataMongo';






export default  class Rep2  extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <>
                <TableDataMongo tituloReporte={'TOP 10 PAISES CON MAS VACUNADOS'} redis={true} urlRedis={'https://us-central1-deft-set-312418.cloudfunctions.net/rep-pais-totvac'} titulos={['pais' , 'vacunados']} /> 
                {/* ESTE ES CON REDIS*/}
            </>
         );
    }
}
 
