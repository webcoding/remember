import React, { Component, PropTypes } from 'react';

class AddButton extends Component {

	render(){

		if (this.props.geo.lat){
			return (<div className="remember-add-button">
						<span>{this.props.additionalText}</span>
						<button
							className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored bottom-right"
							onClick={this.props.add} 
							style={{marginLeft: "10px"}}>
								<i className="material-icons">add</i>
						</button>
					</div>);
		}

		return (<div className="remember-add-button">
					<button
						className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored bottom-right">
						<i className="material-icons">error</i>
					</button>
				</div>);
	}
}
AddButton.propTypes = {
	add: PropTypes.func,
	additionalText: PropTypes.string,
	geo: PropTypes.object
};

export default AddButton;