import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

// AIzaSyBWWkaV0hX1t5w7OpFWdJr0b_R2uJcC7SI

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
    )((props) =>
    <GoogleMap
        defaultZoom={17}
        defaultCenter={{ lat: -14.256834, lng: -71.221120 }}>
            { props.isMarkerShown && <Marker position={{ lat: -14.256834, lng: -71.221120 }} onClick={props.onMarkerClick} /> }
    </GoogleMap>
)

class Maps extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            isMarkerShown: false,
        }
    }

    componentDidMount() {
        this.delayedShowMarker()
    }

    delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({ isMarkerShown: true })
        }, 3000)
    }

    handleMarkerClick = () => {
        this.setState({ isMarkerShown: false })
        this.delayedShowMarker()
    }

    render() {
        return (
            <MyMapComponent
                isMarkerShown={this.state.isMarkerShown}
                onMarkerClick={this.handleMarkerClick}
            />
        )
    }
}

export default Maps;