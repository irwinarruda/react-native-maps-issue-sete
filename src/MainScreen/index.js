import React from "react";
import styles from "./styles";
import { View, Text, Button } from "react-native";
import MapView, { Geojson } from "react-native-maps";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import createGpx from "gps-to-gpx";

class MainScreen extends React.Component {
    state = {
        region: {
            latitude: -16.6782432,
            longitude: -49.2530005,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421,
        },
        buttonChange: true,
        watch_id: null,
        walkedCoordsGps: [],
        gpxString: "",
    };

    async componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (params) => {
                this.setState({
                    region: {
                        latitude: params.coords.latitude,
                        longitude: params.coords.longitude,
                        latitudeDelta: 0.00922,
                        longitudeDelta: 0.00421,
                    },
                });
                console.log("Geolocation found with success");
            },
            (err) => {
                console.error(err);
            },
            {
                timeout: 2000,
                enableHighAccuracy: true,
                maximumAge: 1000,
            }
        );
    }

    handleRecordRoutePress() {
        this.setState({
            walkedCoordsGps: [],
        });
        let watchPositionID = navigator.geolocation.watchPosition(
            (params) => {
                this.setState({
                    walkedCoordsGps: [
                        ...this.state.walkedCoordsGps,
                        {
                            latitude: params.coords.latitude,
                            longitude: params.coords.longitude,
                        },
                    ],
                    region: {
                        latitude: params.coords.latitude,
                        longitude: params.coords.longitude,
                        latitudeDelta: 0.00922,
                        longitudeDelta: 0.00421,
                    },
                });
            },
            (err) => console.error(err),
            {
                timeout: 2000,
                enableHightAccuracy: true,
                maximunAge: 1000,
                distanceFilter: 0.5,
            }
        );
        this.setState({
            buttonChange: false,
            watch_id: watchPositionID,
        });
    }

    async handleStopRecordingPress() {
        if (this.state.watch_id)
            navigator.geolocation.clearWatch(this.state.watch_id);
        this.setState({
            buttonChange: true,
            watch_id: null,
            gpxString: await createGpx(this.state.walkedCoordsGps),
        });
    }

    async handleExportRoutePress() {
        if (this.state.gpxString.length > 0) {
            let fileUri = FileSystem.documentDirectory + "GpxFile.gpx";
            await FileSystem.writeAsStringAsync(fileUri, this.state.gpxString, {
                encoding: FileSystem.EncodingType.UTF8,
            });
            await Sharing.shareAsync(fileUri);
            this.setState({
                gpxString: [],
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            textDecorationLine: "underline",
                        }}
                    >
                        GPX Route Recorder
                    </Text>
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
                                type: "FeatureCollection",
                                features: [
                                    {
                                        type: "Feature",
                                        properties: {},
                                        geometry: {
                                            type: "LineString",
                                            coordinates: this.state.walkedCoordsGps.map(
                                                ({ latitude, longitude }) => [
                                                    longitude,
                                                    latitude,
                                                ]
                                            ),
                                        },
                                    },
                                ],
                            }}
                            strokeColor="#a83291"
                            strokeWidth={5}
                        />
                    </MapView>
                </View>
                <View style={styles.buttonContainer}>
                    {this.state.buttonChange ? (
                        <Button
                            title="Record Route"
                            onPress={() => this.handleRecordRoutePress()}
                        />
                    ) : (
                        <Button
                            title="Stop Recording"
                            onPress={async () =>
                                await this.handleStopRecordingPress()
                            }
                            color="#ff262d"
                        />
                    )}
                    {this.state.walkedCoordsGps.length > 0 &&
                    this.state.buttonChange &&
                    this.state.gpxString.length > 0 ? (
                        <Button
                            title="Export Route"
                            color="#fc03e8"
                            onPress={async () =>
                                await this.handleExportRoutePress()
                            }
                        />
                    ) : null}
                </View>
            </View>
        );
    }
}

export default MainScreen;
