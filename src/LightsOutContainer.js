import React, {Component} from "react";
import Board from "./Board";

class LightsOutContainer extends Component{
    render(){
        return (
            <div>
                <Board rows_cols = {7}/>
            </div>
            
        )
    }
}

export default LightsOutContainer;