import { Component } from "react";
import TableDataMongo from '../../components/Table_/TableDataMongo';






export default  class Rep1  extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <>
                <TableDataMongo tituloReporte={'Tabla de datos recopilados'} numConsulta={1} />
            </>
         );
    }
}
 
