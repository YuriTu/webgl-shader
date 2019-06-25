import React, {Component} from 'react';
import { connect} from "react-redux";

class Home extends Component{
    render() {
        return(<div>win</div>)
    }
}


export default connect(state => ({
    homeData:state.homeData
}), {

})(Home)



