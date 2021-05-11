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
                <TableDataMongo tituloReporte={'TOP 10 PAISES CON MAS VACUNADOS'} redis={true} urlRedis={''} titulos={['pais' , 'cantidad vacunados']} /> 
                {/* ESTE ES CON REDIS*/}
            </>
         );
    }
}
 
