import React, {Component} from 'react';
import {initShaders} from "../../util/lib/cuon-utils";

class Shader extends Component {
    constructor(props){
        super(props)
        this.canvas = React.createRef();

        this.init = () => {
            const node = this.canvas.current;
        }

        this.init();
    }

    render() {
        return <canvas id={`world`} ref={this.canvas}></canvas>
    }
}
