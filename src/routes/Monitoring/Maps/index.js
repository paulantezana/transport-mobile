import React from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';

import { service }  from 'config/app';

const MyMapComponent = compose (
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBWWkaV0hX1t5w7OpFWdJr0b_R2uJcC7SI&v=3.exp&libraries=geometry,drawing,places",
        // googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `75vh` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
    )((props) => {
        console.log(props);
        return (
            <GoogleMap
                defaultZoom={17}
                defaultCenter={{ lat: props.locations[0].latitude, lng: props.locations[0].longitude }}>
                    {/* <InfoBox>
                        <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
                            <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                            Hello, Taipei!
                            </div>
                        </div>
                    </InfoBox> */}
                    {
                        props.isMarkerShown && props.locations.map((item, key)=>(

                            <Marker 
                                key={key} 
                                position={{ lat: item.latitude, lng: item.longitude }}>
                                <InfoBox>
                                    <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `4px`, width: '100px' }}>
                                        <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>{item.name}</div>
                                    </div>
                                </InfoBox>
                            </Marker>
                        ))
                    }

            </GoogleMap>
        )
    }
)

class Maps extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            isMarkerShown: false,
            locations: [
                {
                    latitude: -14.268477,
                    longitude: -71.225880,
                },
            ],
        }
        this.handleMarkerClick = this.handleMarkerClick.bind(this);
        this.delayedShowMarker = this.delayedShowMarker.bind(this);
        this.handleMapData = this.handleMapData.bind(this);
    }

    componentDidMount() {
        this.delayedShowMarker()
        this.handleMapData();
    }

    delayedShowMarker(){
        setTimeout(() => {
            this.setState({ isMarkerShown: true })
        }, 3000)
    }

    handleMarkerClick(){
        this.setState({ isMarkerShown: false })
        this.delayedShowMarker()
    }

    handleMapData(){
        const ws = new WebSocket(service.socket_location);
        ws.onopen = ()=>{
            console.log("conectado");
        }
        ws.onerror = ()=>{
            console.log("error");
        }
        ws.onmessage = e =>{
            const data = JSON.parse(e.data);
            this.setState({
                locations: data.locations
            });
        }
    }

    render() {
        return (
            <div>
                <MyMapComponent
                    isMarkerShown={this.state.isMarkerShown}
                    onMarkerClick={this.handleMarkerClick}
                    locations={this.state.locations}/>
            </div>
        )
    }
}

export default Maps;