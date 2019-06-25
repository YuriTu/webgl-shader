import React, {Component} from 'react';
import { connect} from "react-redux";

import {plusCount} from "../../store/home/action";
// 异步 同步的实现
// 自造 中间件的实现
class Home extends Component{
    constructor(props){
        super(props)
        console.log(this.props);

        this.handleClick = () => {
            console.log(this.props.homeData.count,'handle')
            this.props.plusCount(this.props.homeData.count);
        }
    }
    render() {
        return(
            <div>
                <h3>now your count is {this.props.homeData.count}</h3>
                <button onClick={this.handleClick.bind(this)}>plus</button>
            </div>
        )
    }
}


export default connect(state => ({
    homeData:state.genHomeState
}), {
    plusCount
})(Home)



