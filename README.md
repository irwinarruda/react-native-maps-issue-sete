# Create a GPX path using series of GPS positions on the map

This repository was used to register my thought process of learning and making a feature for the app [SETE MOBILE](https://github.com/marcosroriz/sete-mobile)

Description of the Feature: 

We wanted the app user to be able to record a specific path and make it a real route for later usage. It was requested a map and a "Record Route" button showing on the screen, if the user presses the button, it starts recording their route by the navigator.geolocation functions.

For the map, I used react-native-maps, and for handling the GPX file, I used expo-file-system, expo-sharing and gps-to-gpx.

## Packages

* After expo init, the required packages are:
  
        $ yarn add react-native-maps
        $ yarn add expo-file-system
        $ yarn add expo-sharing
        $ yarn add gps-to-gpx
  

## Useful Links
 - Class Components in React
   - https://pt-br.reactjs.org/docs/react-component.html
 - navigator.geolocation docs
   - https://reactnative.dev/docs/geolocation
 - MapView Parameters
   - https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md
 - GeoJSON
   - https://en.wikipedia.org/wiki/GeoJSON
   - https://github.com/react-native-maps/react-native-maps/blob/master/docs/geojson.md
   - https://docs.mongodb.com/manual/reference/geojson/#multilinestring
   - https://geojson.org/geojson-spec.html
   - https://geojson.org/geojson-spec.html#linestring
   - https://geojson.org/geojson-spec.html#positions
 - react-native-maps usage
   - https://medium.com/@princessjanf/react-native-maps-with-direction-from-current-location-ab1a371732c2
   - https://medium.com/@fbiobcsouza/como-usar-a-geolocaliza%C3%A7%C3%A3o-no-react-native-979bc922cd77
   - https://medium.com/nerdzao/utilizando-rotas-com-a-google-maps-api-no-react-native-69a05a434ab5
 - togpx
   - https://github.com/tyrasd/togpx
 - Gps to Gpx 
   - https://www.npmjs.com/package/gps-to-gpx
 - FileSystem
   - https://docs.expo.io/versions/latest/sdk/filesystem/#filesystemdownloadasyncuri-fileuri-options
 - Sharing
   - https://docs.expo.io/versions/latest/sdk/sharing/
