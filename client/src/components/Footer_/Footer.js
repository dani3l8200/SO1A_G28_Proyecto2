
import { Component } from "react";
import { Fade } from "react-awesome-reveal";


export default  class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
       // console.log("cosntructor")
    }
    render() { 
        return (  
            <>
            <Fade>
            <div className="text-center p-3" style={{ textAlign: 'center'}}>
                © 2020 Copyright Grupo 28
      
            </div>
            </Fade>

            </>
        );
    }
}
 
