import React, {Component} from "react";
import LightBox from "./LightBox";
import "./styles/Light.css"
import "./styles/Board.css"

class Board extends Component{
    static defaultProps = {
        rows_cols: 5
    }

    constructor(props){
        super(props);
        this.state = {
            board: this.createDummyBoard(),
            won: false
        }
        this.click = this.click.bind(this);
        this.reset = this.reset.bind(this);
    }

    click(position){
        const [a, b] = position.split("");
        const x = parseInt(a);
        const y = parseInt(b);
        let copyBoard = [...this.state.board];
        if(x > 0 && x < this.props.rows_cols - 1 && y > 0 && y < this.props.rows_cols - 1){
            copyBoard[x][y] = !copyBoard[x][y];
            copyBoard[x+1][y] = !copyBoard[x+1][y];
            copyBoard[x-1][y] = !copyBoard[x-1][y];
            copyBoard[x][y+1] = !copyBoard[x][y+1];
            copyBoard[x][y-1] = !copyBoard[x][y-1];
        }

        if((x === 0 || x === this.props.rows_cols - 1) && (y === 0 || y === this.props.rows_cols-1))
        {
            copyBoard[x][y] = !copyBoard[x][y];
            x === 0 ? copyBoard[x+1][y] = !copyBoard[x+1][y] : copyBoard[x-1][y] = !copyBoard[x-1][y];
            y === 0 ? copyBoard[x][y+1] = !copyBoard[x][y+1] : copyBoard[x][y-1] = !copyBoard[x][y-1];
        }

        else if(x === 0 || x === this.props.rows_cols - 1){
            copyBoard[x][y] = !copyBoard[x][y];
            copyBoard[x][y-1] = !copyBoard[x][y-1];
            copyBoard[x][y+1] = !copyBoard[x][y+1];
            x===0 ? copyBoard[x+1][y] = !copyBoard[x+1][y] : copyBoard[x-1][y] = !copyBoard[x-1][y];
        }
        
        else if(y === 0 || y === this.props.rows_cols - 1)
        {
            copyBoard[x][y] = !copyBoard[x][y];
            copyBoard[x-1][y] = !copyBoard[x-1][y];
            copyBoard[x+1][y] = !copyBoard[x+1][y];
            y===0 ? copyBoard[x][y+1] = !copyBoard[x][y+1] : copyBoard[x][y-1] = !copyBoard[x][y-1];
        }

        let allInactiveFlag = 1;
        for(let i = 0; i<copyBoard.length; i++)
        {
            for(let j=0; j<copyBoard[i].length; j++)
            {
                if(copyBoard[i][j]){
                    allInactiveFlag = 0;
                }
            }
        }
        console.log(allInactiveFlag);
        if(allInactiveFlag === 1){
            this.setState(function(currentState){
                return {
                    board: copyBoard,
                    won: true
                }
            });
        }
        else{
            this.setState(function(currentState){
                return {
                    board: copyBoard
                }
            });
        }
        
    }

    createDummyBoard(){
        let board = [];
        for(let i = 0; i<this.props.rows_cols; i++)
        {
            let row = [];
            for(let j=0; j<this.props.rows_cols; j++)
            {
                row.push(Math.random() < 0.25);
            }
            board.push(row);
        }
        return board;
    }

    createLightBoxes(){
        let allBoxes = [];
        for(let i = 0; i<this.props.rows_cols; i++)
        {
            let boxRow = [];
            for(let j=0; j<this.props.rows_cols; j++)
            {
                let position = `${i}${j}`;
                boxRow.push(<LightBox key = {position} isActive={this.state.board[i][j]} click = {this.click} position = {position}/>)
            }
            allBoxes.push(<div key={i} className="LightBoxRow">{boxRow}</div>);
        }
        return allBoxes;
    }

    reset(){
        this.setState(function(currentState){
            return {
                board: this.createDummyBoard(),
                won: false
            }
        })
    }

    render(){
        let cells = this.createLightBoxes();
        return <div className="Board">
            <h1 className="Board-header">Lights Out Game</h1>
            <p> The goal is to turn off all the lights from the below boxes </p>
            {this.state.won ? <h2 className="Board-winMsg">Congrats! You have made all the lights Inactive</h2> : cells}
            <button className="Board-resetBtn" onClick = {this.reset}>Restart The Game?</button>
        </div>
    }
}

export default Board;