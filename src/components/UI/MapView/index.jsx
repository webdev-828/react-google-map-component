import React from 'react';
import MapWithMarkers from './MapWithMarkers/MapWithMarkers';

const currentData = {
    dataMarkers: [
        {
            id: 1,
            popupText: "Kirovograd",
            inputValue: "a",
            lat: 48.516918,
            lng: 32.252571,
            markerZoom: 4,
            isSelect: false,
            magnitude: 0.4
        }, 
        {
            id: 2,
            popupText: "",
            inputValue: "b",
            lat: 49.8397,
            lng: 24.0297,
            markerZoom: 6,
            isSelect: false,
            magnitude: 0.8
        }, 
        {
            id: 3,
            popupText: "",
            inputValue: "c",
            lat: 52.2297,
            lng: 21.0122,
            markerZoom: 5,
            isSelect: false,
            magnitude: 0.2
        }, 
        {
            id: 4,
            popupText: "London",
            inputValue: "c",
            lat: 51.5074,
            lng: -0.0901,
            markerZoom: 6,
            isSelect: false,
            magnitude: 0.6
        }, 
        {
            id: 5,
            popupText: "Paris",
            inputValue: "c",
            lat: 48.8566,
            lng: 2.3522,
            markerZoom: 5,
            isSelect: false,
            magnitude: 0.4
        }, 
        {
            id: 6,
            popupText: "Moscow",
            inputValue: "c",
            lat: 55.7558,
            lng: 37.6173,
            markerZoom: 7,
            isSelect: false,
            magnitude: 1.0
        }, 
        {
            id: 7,
            popupText: "Roma",
            inputValue: "c",
            lat: 41.9028,
            lng: 12.4964,
            markerZoom: 10,
            isSelect: false,
            magnitude: 0.4
        }, 
        {
            id: 8,
            popupText: "Barcelona",
            inputValue: "a",
            lat: 41.3851,
            lng: 2.1734,
            markerZoom: 4,
            isSelect: false,
            magnitude: 1.0
        }, 
        {
            id: 9,
            popupText: "Milan",
            inputValue: "b",
            lat: 45.4642,
            lng: 9.1900,
            markerZoom: 6,
            isSelect: false,
            magnitude: 0.4
        }, 
        {
            id: 10,
            popupText: "Istanbul",
            inputValue: "a",
            lat: 41.0082,
            lng: 28.9784,
            markerZoom: 4,
            isSelect: false,
            magnitude: 0.4
        }, 
        {
            id: 11,
            popupText: "Saint Petersburg",
            inputValue: "a",
            lat: 59.9343,
            lng: 30.3351,
            markerZoom: 5,
            isSelect: false,
            magnitude: 0.4
        }, 
    ], 
}
const mapSetting = {
    renderParams: {
        PrimaryColor: {type: String, value: '#d7872b'},
        Filter: {type: Boolean, value: true},
        InitialSelected: {type: String, value: 'a'},
        TransparencyofUnselected: {type: Number, value:0.5},
        Basemap: {type: Object, value: {tileUrl: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png', attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}},
        DefaultZoom: {type: Number, value:4},
        MapHeight: {type: Number, value: 600},
        MapClustering: {type: Boolean, value: false},
        MarkerHeight: {type: Number, value: 36},
        ColorOverride: {type: Array, value:[{ a: '#efac2c', b:'#000000', c: '#4ac456'}]}
    }
}
class MapView extends React.Component {
    render() {
        return (
            <div>
                <h1>MapView</h1>
                <MapWithMarkers 
                    currentData = {currentData}
                    mapSetting = {mapSetting}
                />
            </div>
        );
    }
} 

export default MapView;


