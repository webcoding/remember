import React, { Component } from "react";
import App from './App.js';
import helpers from '../helpers.js';

class Remember extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data:JSON.parse(localStorage.getItem('remember.locations')) || [],
			geo:{}
		};
		this.initGeoWatch();
		this.initOrientationWatch();
	}

	render() {
		return   <App
			      	addLocation = {this.addLocation.bind(this)}
			      	data = {this.state.data}
			      	deleteLocation = {this.deleteLocation.bind(this)}
			      	geo = {this.state.geo}
					updateDescription = {this.updateDescription.bind(this)}/> ;
	}

	componentDidUpdate(newProps, newState){
		if (newState.data!==this.state.data) {
			localStorage.setItem('remember.locations', JSON.stringify(this.state.data));
		}
	}

	initGeoWatch() {
		navigator.geolocation.watchPosition((pos)=> {
			let {geo} = this.state;
			geo.lastUpdate = pos.timestamp,
			geo.lat = pos.coords.latitude,
			geo.lon = pos.coords.longitude,
			geo.accuracy = pos.coords.accuracy
			this.setState({geo})
		}, (error)=> {
			alert(error.message);
		}, {enableHighAccuracy: false});
	}

	initOrientationWatch() {
		if (window.DeviceOrientationEvent) {
			window.addEventListener('deviceorientation', (e)=> {
				if (e.alpha != null) {
					let {geo} = this.state;
					geo.orientation = Math.floor(e.alpha);
				}
			}, false);
		} else {
			alert('Orientation unavailable');
		}
	}

	deleteLocation(row) {
		let data=this.state.data.filter((d,i) => i != row);
		this.setState({data})
	}

	addLocation(desc, lat, lon) {
		if (desc !== '') {
			this.setState({data:this.state.data.concat([[
						helpers.round(this.state.geo.lat, 4),
						helpers.round(this.state.geo.lon, 4),
						desc
					]])
			})
		}
	}

	updateDescription(desc, row) {
		let data=this.state.data.slice();
		data[row][2]=desc;
		this.setState({data})
	}
}

export default Remember;
