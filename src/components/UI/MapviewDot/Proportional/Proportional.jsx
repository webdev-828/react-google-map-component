import React from 'react';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Leaflet from 'leaflet';

class Proportional extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.getMarkerData(this.props.currentData.dataMarkers),
            ...this.getMapSetting(this.props.mapSetting.renderParams),
        };
    } 

    getMarkerData(dataMarkers) {
        var maxLat = Infinity, minLat = -Infinity;		
		var maxLng = Infinity, minLng = -Infinity;
		dataMarkers.map((marker) => {			
			const lat = parseFloat(marker.lat);			
			const lng = parseFloat(marker.lng);			
			if ( !(lat === 0 && lng === 0) ) {				
				if ( lng < maxLng ) maxLng = lng;
				if ( lng > minLng ) minLng = lng;				
				if ( lat < maxLat ) maxLat = lat;				
				if ( lat > minLat ) minLat = lat;				
			}			
		} );		
        const centLat = parseFloat((maxLat - minLat) / 2 + minLat);
        const centLng = parseFloat((maxLng - minLng) / 2 + minLng);
        const sw = [minLat, minLng];
        const ne = [maxLat, maxLng];

        return {dataMarkers, centLat, centLng, sw, ne};
    }

    getMapSetting(renderParams) {
        const primaryColor = renderParams.PrimaryColor.value;
        const isFilter = renderParams.Filter.value;
        const initialVal = renderParams.InitialSelected.value;
        const opacity = renderParams.TransparencyofUnselected.value;
        const tileUrl = renderParams.Basemap.value.tileUrl;
        const attribution = renderParams.Basemap.value.attribution;
        const defaultZoom = renderParams.DefaultZoom.value;
        const mapHeight = renderParams.MapHeight.value;
        const mapClustering = renderParams.MapClustering.value;
        const scalingFactor = renderParams.ScalingFactor.value;
        const overrideColor = renderParams.ColorOverride.value[0];
        this.filterFn(initialVal);

        return {primaryColor, isFilter, initialVal, opacity, tileUrl, attribution, defaultZoom, mapHeight, mapClustering, scalingFactor, overrideColor, selectedMarkerVal: initialVal};
    }

    filterFn = event => {
        console.log(event + " was selected");
    }

    handleClick = marker => {
        let dataMarkers = this.state.dataMarkers;
        const selectedMarkerZoom = marker.markerZoom;
        const selectedMarkerLat = marker.lat;
        const selectedMarkerLng = marker.lng;
        if (!marker.isSelect) {
            this.setState({selectedMarkerVal: marker.inputValue});
            this.filterFn(this.state.selectedMarkerVal);
        }
        else {
            this.setState({selectedMarkerVal: null});
        }
        
        dataMarkers = dataMarkers.map((element) => {
            if(element.inputValue === marker.inputValue)  {     
                element.isSelect = !element.isSelect;            
            }
            else {    
                element.isSelect = false;
            }
            return element;

        });
        this.setState({dataMarkers, selectedMarkerZoom, selectedMarkerLat, selectedMarkerLng});
    }

    renderMarker = (marker, index) => {
        const {primaryColor, isFilter, opacity, scalingFactor, overrideColor, selectedMarkerVal} = this.state;
        if (marker.inputValue === selectedMarkerVal) {
            marker.isSelect = true;
        }
        const myCustomColor = overrideColor.hasOwnProperty(marker.inputValue) ? overrideColor[marker.inputValue] : primaryColor;
        var markerSelectedHtmlStyles;
        if (isFilter) {
            markerSelectedHtmlStyles = `
            background-color: ${myCustomColor};
            width: 100%;
            height: 100%;
            display: block;
            position: relative;
            border: 2px solid #FFFFFF;
            border-radius: 50%;
            `
        } else {
            markerSelectedHtmlStyles = `
            background-color: ${myCustomColor};
            width: 100%;
            height: 100%;
            display: block;
            position: relative;
            border: 2px solid #FFFFFF;
            border-radius: 50%;
            cursor: -webkit-grab;
            `
        }
        const iconMarker = Leaflet.divIcon({
            className: "my-custom-pin",
            iconAnchor: [0, 24],
            labelAnchor: [-6, 0],
            popupAnchor: [0, -36],
            iconSize: [1.0083 * Math.pow((1 / marker.magnitude), scalingFactor) * 30, 1.0083 * Math.pow((1 / marker.magnitude), scalingFactor) * 30],
            html: `<span style="${markerSelectedHtmlStyles}" />`
        })
        return (
            <Marker
                classname = 'leaflet-map-container'
                key = {index}
                position = {[marker.lat, marker.lng]}
                icon = {iconMarker}
                onClick = {isFilter ? e=> this.handleClick(marker) : null}
                opacity = {(isFilter && marker.isSelect && marker.inputValue === selectedMarkerVal) ? 1: opacity}
            >
                {marker.popupText === null || marker.popupText === undefined || marker.popupText === "" ? null : <Popup><span>{marker.popupText}</span></Popup>}
            </Marker>
        )
    }

    renderMap = markers => {
        const {tileUrl, attribution, defaultZoom, mapHeight, mapClustering} = this.state;
        const {centLat, centLng, sw, ne, selectedMarkerLat, selectedMarkerLng, selectedMarkerZoom} = this.state;
        const lat = selectedMarkerLat === undefined ? centLat : selectedMarkerLat;
        const lng = selectedMarkerLng === undefined ? centLng : selectedMarkerLng;
        const zoom = selectedMarkerZoom === undefined ? defaultZoom : selectedMarkerZoom;
        const bound = Leaflet.latLngBounds([sw, ne]);
        if (defaultZoom === undefined || defaultZoom === null) {
            return (
                <Map 
                    center = {[lat, lng]}
                    zoom = {zoom}
                    style = {{
                        height: mapHeight,
                        width: "100%",
                    }}
                    bounds={bound}
                >
                <TileLayer
                    attribution = {attribution}
                    url = {tileUrl}
                />  
                {mapClustering ? <MarkerClusterGroup> {markers} </MarkerClusterGroup> : markers}
            </Map>
            )
        } else {
            return (
                <Map 
                    center = {[lat, lng]}
                    zoom = {zoom}
                    style = {{
                        height: mapHeight,
                        width: "100%",
                    }}
                >
                <TileLayer
                    attribution = {attribution}
                    url = {tileUrl}
                />  
                {mapClustering ? <MarkerClusterGroup> {markers} </MarkerClusterGroup> : markers}
            </Map>
            )
        }
    }

    render() {
        const {dataMarkers} = this.state;
        const markers = dataMarkers.map((marker, index) => {
            console.log(marker.lat, marker.lng)
            return (
                 this.renderMarker(marker, index)
            )
        });
        return (
            this.renderMap(markers)
        );
    }
}

export default Proportional;


