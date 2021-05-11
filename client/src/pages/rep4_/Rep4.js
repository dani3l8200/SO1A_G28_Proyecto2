import { Component } from "react";
import TableDataMongo from '../../components/Table_/TableDataMongo';






export default  class Rep4  extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <>
                <TableDataMongo tituloReporte={'Ultimos 5 Vacunados'}    numConsulta={4} />
            </>
         );
    }
}
 
