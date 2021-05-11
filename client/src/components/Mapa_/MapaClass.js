import React  ,{ Component }from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import Swal from 'sweetalert2'

class Mapa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            geoUrl: "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"
          }
    }
    render() { 
        return ( 
            <div style={{width:600 , height:600}}>
            <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
              <ZoomableGroup>
                <Geographies geography={this.state.geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => {
                          const { NAME, POP_EST } = geo.properties;
                          alert(NAME);
                        }}
                        onMouseEnter={() => {
                          const { NAME, POP_EST } = geo.properties;
 
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
         );
    }
}
 
export default Mapa;