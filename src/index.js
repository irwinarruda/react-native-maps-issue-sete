import React from 'react';
import MapView, { Geojson, Polyline } from 'react-native-maps';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';

class Index extends React.Component {
    state = {
        region: {
            latitude: -16.6782432,
            longitude: -49.2530005,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421,
        },
        buttonChange: true,
        watchID: null,
        walkedCoordsPolyline: [
            {latitude: 37.4219983, longitude: -122.084},
            {latitude: 37.4150009, longitude: -122.073},
            {latitude: 37.40, longitude: -122.062},
            {latitude: 37.3999999, longitude: -122.051},
            {latitude: 37.38, longitude: -122.040},
        ],
        walkedCoordsGeoJson: [[[37.4219983, -122.084], [37.4150009, -122.073]], [[37.40, -122.062], [37.3999999, -122.051]], [[37.38, -122.040], [37.33, -122.035]]],
    };
    
    async componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            ({coords: {latitude, longitude}}) => {
                this.setState({
                    region: {
                        latitude,
                        longitude,
                        latitudeDelta: 0.00922,
                        longitudeDelta: 0.00421,
                    }
                });
                console.log("GeoLocalização Encontrada com Sucesso");
            },
            (err) => {console.error(err)},
            {
                timeout: 2000,
                enableHighAccuracy: true,
                maximumAge: 1000,
            }
        );
    };

    handleGravarRotaPress() {
        /* this.setState({
            walkedCoordsGeoJson: []
        }); */
        let watchPositionID = navigator.geolocation.watchPosition(
            (params) => {
                this.setState({
                    walkedCoordsGeoJson: [...this.state.walkedCoordsGeoJson, [params.coords.latitude, params.coords.longitude]]
                });
                console.log([params.coords.latitude, params.coords.longitude]);
            }, 
            (err) => console.error(err), 
            {
                timeout: 2000, 
                enableHightAccuracy: true, 
                maximunAge: 1000,
                distanceFilter: 2,        
            }
        );
        this.setState({
            buttonChange: false,
            watchID: watchPositionID,
        });
        
    };

    handlePararGravacaoPress() {
        if(this.state.watchID) navigator.geolocation.clearWatch(this.state.watchID);
        this.setState({
            buttonChange: true,
            watchID: null,
        }); 
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', textDecorationLine: 'underline'}}>Gerador de Trajeto GPX</Text>
                </View>
                <View style={styles.mapContainer}>
                    <MapView 
                        style={styles.map}
                        region={this.state.region}
                        showsUserLocation
                        loadingEnabled
                        
                    >
                        <Geojson 
                            geojson={{
                                type: 'FeatureCollection',
                                features: [{
                                    type: 'Feature',
                                    properties: {},
                                    geometry: {
                                        type: 'MultiLineString',
                                        coordinates: this.state.walkedCoordsGeoJson
                                    }
                                }]
                            }}
                            strokeColor="blue"
                            fillColor="green"
                            strokeWidth={3}
                            zIndex={1000}
                        />
                        <Polyline 
                            coordinates={this.state.walkedCoordsPolyline}
                            strokeColor="red"
                            strokeWidth={3}
                        />
                    </MapView>
                </View>
                <View style={styles.buttonContainer}>
                    {
                        this.state.buttonChange? 
                        <Button 
                            title='Gravar Rota' 
                            onPress={() => this.handleGravarRotaPress()}
                        />:
                        <Button 
                            title='Parar Gravação' 
                            onPress={() => this.handlePararGravacaoPress()}
                        />
                    }         
                </View>
            </View>
        );
    };
}

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 60,
        paddingBottom: 50,
    },
    mapContainer: {
        borderRadius: 7,
        borderWidth: 5,
        borderColor: '#0394fc',
        resizeMode: 'cover',
        width: Dimensions.get('window').width - 30,
        height: Dimensions.get('window').height / 1.8,
    },
    map: {
        width: '100%',
        height: '100%',
        paddingVertical: 15,
        borderRadius: 1000
    },
});

/* rotateEnabled={false}
                        scrollEnabled={false}
                        zoomEnabled={false} */