import React, {Component} from "../../../node_modules/react/cjs/react.development";
import {initShaders} from "../../util/lib/cuon-utils";

export class ReactHelloWorld extends Component {
    constructor(props){
        super(props)
        this.state = {
            message: "hello, world"
        }
        // this.canvas = React.createRef();
        //
        // this.init = () => {
        //     const node = this.canvas.current;
        // }
        // this.setState({test:2})

        // this.init();
    }

    componentWillMount(){
        console.log("component will mount");
    }

    componentWillUpdate(){
        console.log("component will update");
    }

    componentDidUpdate(){
        console.log("component did update");
    }

    componentDidMount(){
        this.setState({
            message:'test'
        })
        this.setState({
            message:'2'
        })
        console.log("component Did Mount");
    }



    render() {
        // return <canvas id={`world`} ref={this.canvas}>123</canvas>
        return <span className={this.state.message}>
            {this.state.message}
        </span>;
    }
}
