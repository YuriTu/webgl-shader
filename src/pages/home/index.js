import React, {Component} from 'react';
import { connect} from "react-redux";

import {plusCount, saveData ,genRequest} from "../../store/home/action";
// 异步 同步的实现
// 自造 中间件的实现
class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            test:1
        }

        this.handleClick = () => {
            console.log(this.props.homeData.count,'handle')
            this.props.plusCount(this.props.homeData.count);
        }

        this.handleInput = (e) => {
            this.props.saveData('sid',e.target.value)

        }

        this.createSurvey = () => {
            let sid = this.props.homeData.sid;

            this.props.genRequest(sid);

        }
    }


    render() {
        return(
            <div>
                <h3>now your count is {this.props.homeData.count}</h3>
                <button onClick={this.handleClick.bind(this)}>plus</button>
                <h3>get info from xhr create survey from sid is: {this.props.homeData.sid}</h3>
                <label htmlFor="sidInput">input your sid <input id={`sidInput`} type="text" onChange={this.handleInput.bind(this)}/></label>
                <button onClick={this.createSurvey.bind(this)}>create !</button>
                <h4>your result is {this.props.homeData.result}</h4>
            </div>
        )
    }
}


export default connect(state => ({
    homeData:state.genHomeState
}), {
    plusCount,
    saveData,
    genRequest
})(Home)



