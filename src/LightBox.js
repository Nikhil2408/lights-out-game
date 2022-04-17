import React, {Component} from "react";
import "./styles/Light.css"

class LightBox extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.click(this.props.position);
    }
    render(){
        return (
            this.props.isActive ? 
            <div className="LightBox-active" onClick={this.handleClick}></div> : 
            <div className="LightBox-inactive" onClick={this.handleClick}></div>
        )
    }
}

export default LightBox;