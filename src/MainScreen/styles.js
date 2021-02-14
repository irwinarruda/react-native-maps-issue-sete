import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 60,
        paddingBottom: 50,
    },
    mapContainer: {
        borderRadius: 7,
        borderWidth: 5,
        borderColor: "#0394fc",
        resizeMode: "cover",
        width: Dimensions.get("window").width - 20,
        height: Dimensions.get("window").height / 1.5,
    },
    map: {
        width: "100%",
        height: "100%",
        paddingVertical: 10,
        borderRadius: 1000,
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
});

export default styles;
