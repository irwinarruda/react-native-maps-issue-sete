import React from 'react';
import MapView, { Geojson } from 'react-native-maps';
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
        watch_id: null,
        walkedCoordsGeoJson: [],
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
        this.setState({
            walkedCoordsGeoJson: []
        });
        let watchPositionID = navigator.geolocation.watchPosition(
            (params) => {
                this.setState({
                    walkedCoordsGeoJson: [...this.state.walkedCoordsGeoJson, [params.coords.longitude, params.coords.latitude]],
                    region: {
                        latitude: params.coords.latitude,
                        longitude: params.coords.longitude,
                        latitudeDelta: 0.00922,
                        longitudeDelta: 0.00421,
                    }
                });
                console.log(params);
            }, 
            (err) => console.error(err), 
            {
                timeout: 2000, 
                enableHightAccuracy: true, 
                maximunAge: 1000,
                distanceFilter: 1,        
            }
        );
        this.setState({
            buttonChange: false,
            watch_id: watchPositionID,
        });
        
    };

    handlePararGravacaoPress() {
        if(this.state.watch_id) navigator.geolocation.clearWatch(this.state.watch_id);
        this.setState({
            buttonChange: true,
            watch_id: null,
        }); 
    };

    handleExportarRotaPress() {

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
                                        type: 'LineString',
                                        coordinates: this.state.walkedCoordsGeoJson
                                    }
                                }]
                            }}
                            strokeColor="#a83291"
                            fillColor="green"
                            strokeWidth={5}
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
                            color='#ff262d'
                        />
                    }  
                    {
                        this.state.walkedCoordsGeoJson.length > 0 && this.state.buttonChange? 
                        <Button 
                            title='Exportar rota'
                            color='#54e397'
                            onPress={() => this.handleExportarRotaPress()}
                        />:
                        null
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
        width: Dimensions.get('window').width - 20,
        height: Dimensions.get('window').height / 1.5,
    },
    map: {
        width: '100%',
        height: '100%',
        paddingVertical: 10,
        borderRadius: 1000
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },  
});
