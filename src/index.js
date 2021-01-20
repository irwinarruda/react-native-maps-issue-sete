import React from 'react';
import MapView from 'react-native-maps';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';

class Index extends React.Component {
    state = {
        region: {
            latitude: -16.6782432,
            longitude: -49.2530005,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        buttonChange: true
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
    };

    handleGravarRotaPress() {
        console.log(this.state);
        this.setState({
            buttonChange: false,
        });
        
    };

    handlePararGravacaoPress() {
        this.setState({
            buttonChange: true,
        }); 
    }

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
                    />
                </View>
                <View style={styles.buttonContainer}>
                    {this.state.buttonChange? 
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
    }
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

