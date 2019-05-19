import React from 'react';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Leaflet from 'leaflet';

class Proportional extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentData : this.props.currentData.dataMarkers,
            mapSetting: this.props.mapSetting.renderParams
        };
    } 

    getMapSetting() {
        const dataMarkers = this.state.currentData        
        const renderParams = this.state.mapSetting;
        const defaultZoom = renderParams.DefaultZoom.value;
        const tileUrl = renderParams.Basemap.value.tileUrl;
        const attribution = renderParams.Basemap.value.attribution;
        const opacity = renderParams.TransparencyofUnselected.value;
        const mapHeight = renderParams.MapHeight.value;
        const mapClustering = renderParams.MapClustering.value;
        const isFilter = renderParams.Filter.value;	

		let maxLat = Infinity, minLat = -Infinity;		
		let maxLng = Infinity, minLng = -Infinity;
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
        var _lat = parseFloat((maxLat - minLat) / 2 + minLat);
        var _lng = parseFloat((maxLng - minLng) / 2 + minLng);
        return {
            defaultZoom, tileUrl, attribution, opacity, mapHeight, mapClustering, isFilter, _lat, _lng
        }
    }

    filterFn = event => {
        console.log("filterFn is called with" + event);
    }

    handleClick = event => {
        let dataMarkers = this.state.currentData;
        let selectedMarkerZoom = event.markerZoom;
        let selectedMarkerLat = event.lat;
        let selectedMarkerLng = event.lng;
        let selectedMarkerVal = event.inputValue;
        let filterFlag = this.props.mapSetting.renderParams.Filter.value;
        if (!event.isSelect && filterFlag) {
            this.filterFn(event.inputValue);
        }
        dataMarkers = dataMarkers.map((marker) => {
            if(marker.inputValue === event.inputValue)       
                marker.isSelect = !marker.isSelect;
            else    
                marker.isSelect = false;
        });
        this.setState({dataMarkers, selectedMarkerZoom, selectedMarkerLat, selectedMarkerLng, selectedMarkerVal})
    }

    renderMarker = marker => {
        const primarycolor = this.state.mapSetting.PrimaryColor.value;
        const isFilter = this.state.mapSetting.Filter.value;
        const overrideColor = this.state.mapSetting.ColorOverride.value[0];
        const inputValue = marker.inputValue;
        const myCustomColour = overrideColor.hasOwnProperty(inputValue) ? overrideColor[inputValue] : primarycolor
        if (!isFilter) {
            const markerSelectedHtmlStyles = `
            background-color: ${myCustomColour};
            width: 100%;
            height: 100%;
            display: block;
            position: relative;
            border: 2px solid #FFFFFF;
            border-radius: 50%;
            cursor: -webkit-grab;
            `
            const iconMarker = Leaflet.divIcon({
                className: "my-custom-pin",
                iconAnchor: [0, 24],
                labelAnchor: [-6, 0],
                popupAnchor: [0, -36],
                iconSize: [1.0083 * Math.pow((1 / marker.magnitude), 0.5) * 30, 1.0083 * Math.pow((1 / marker.magnitude), 0.5) * 30],
                html: `<span style="${markerSelectedHtmlStyles}" />`
            })
            return {iconMarker}
        } else {
            const markerSelectedHtmlStyles = `
            background-color: ${myCustomColour};
            width: 100%;
            height: 100%;
            display: block;
            position: relative;
            border: 2px solid #FFFFFF;
            border-radius: 50%;
            `
            const iconMarker = Leaflet.divIcon({
                className: "my-custom-pin",
                iconAnchor: [0, 24],
                labelAnchor: [-6, 0],
                popupAnchor: [0, -36],
                iconSize: [1.0083 * Math.pow((1 / marker.magnitude), 0.5) * 30, 1.0083 * Math.pow((1 / marker.magnitude), 0.5) * 30],
                html: `<span style="${markerSelectedHtmlStyles}" />`
            })
            return {iconMarker}
        }
        
    }
    render() {
        const dataMarkers = this.state.currentData;
        const initialSelectedValue = this.state.mapSetting.InitialSelected.value;
        const defaultLat = 51.0;
        const defaultLng = 19.0;
        const {defaultZoom, tileUrl, attribution, opacity, mapHeight, mapClustering, isFilter, _lat, _lng} = this.getMapSetting();
        const {selectedMarkerZoom, selectedMarkerLat, selectedMarkerLng, selectedMarkerVal} = this.state;
        const zoom = selectedMarkerZoom === undefined ? defaultZoom : selectedMarkerZoom;
        const lat = selectedMarkerLat === undefined ? _lat: selectedMarkerLat;
        const lng = selectedMarkerLng === undefined ? _lng: selectedMarkerLng;
        if(isFilter) {
            if (selectedMarkerVal === undefined && (initialSelectedValue !== null || initialSelectedValue !== undefined)) 
                this.filterFn(initialSelectedValue);
        }
        const markers = dataMarkers.map((marker, index) =>{
            const {iconMarker} = this.renderMarker(marker);
            return (
                <Marker 
                    key={index} 
                    position={[marker.lat, marker.lng]} 
                    icon={iconMarker} 
                    onClick={isFilter === true ? e => this.handleClick(marker): null} 
                    opacity={isFilter && marker.isSelect ? 1 : opacity}
                >       
                    {marker.popupText !== "" ? <Popup><span>{marker.popupText}</span></Popup> : ""}
                </Marker> 
            )             
        });
        return (
            <Map center={[ lat || defaultLat, lng || defaultLng ] } zoom={zoom} maxZoom={18}
                style={{
                    height:mapHeight,
                    width: "100%",
                }}
            >
                <TileLayer
                    attribution={attribution}
                    url={tileUrl}
                />       
                {mapClustering ? <MarkerClusterGroup> {markers} </MarkerClusterGroup> : markers}
            </Map>
        );
    }
}

export default Proportional;


