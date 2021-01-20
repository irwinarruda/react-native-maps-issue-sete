import React from 'react';
import MapView from 'react-native-maps';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

class Index extends React.Component {
    state = {
        region: {
            latitude: -16.6782432,
            longitude: -49.2530005,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
    };

    async componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            ({coords: {latitude, longitude}}) => {
                this.setState({
                    region: {
                        latitude,
                        longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
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
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <MapView 
                    style={styles.map}
                    region={this.state.region}
                    showsUserLocation
                    loadingEnabled
                />
            </View>
        );
    }
}

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

