
import React, {Component} from "react";
import {initShaders} from "../../util/lib/cuon-utils";
import {Matrix4, Vector3, Vector4} from "../../util/lib/cuon-matrix";

import './index.css';

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const HALF_WIDTH = SCREEN_WIDTH / 2;
const HALF_HEIGHT = SCREEN_HEIGHT / 2;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;

let gl,canvas;


let vertextshader = `
attribute vec4 a_position;

void main() {
    gl_Position = a_position;
}

`;


let fragmentshader = `

precision mediump float;

void main(){
 gl_FragColor = vec4(1, 0, 0.5, 1);
}

`;

export class Shader extends Component {
    constructor(props){
        super(props)
        this.canvas = React.createRef();
    }

    componentDidMount(){
        this.init();
        this.bindData();
        this.draw();
    }

    init(){
        canvas = this.canvas.current;
        canvas.width = SCREEN_WIDTH;
        canvas.height = SCREEN_HEIGHT;
        gl = canvas.getContext('webgl');

        if (!gl){
            throw new Error('without gl');
        }

        initShaders(gl,vertextshader,fragmentshader);
    }

    resize(){
        if (canvas.width !== SCREEN_WIDTH || canvas.height !== SCREEN_HEIGHT){
            canvas.width = SCREEN_WIDTH;
            canvas.height = SCREEN_HEIGHT;
        }
    }

    setView(){
        gl.viewport(0,0,canvas.width,canvas.height);
    }

    bindData(){
        let positionALocation = gl.getAttribLocation(gl.program, 'a_position');

        let posBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);

        let pos = [
            0,0,
            0,0.5,
            0.7,0
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW);

        gl.enableVertexAttribArray(positionALocation)


        let size = 2;
        let type = gl.FLOAT;
        let normalize = false;
        let stride = 0;
        let offset = 0;
        gl.vertexAttribPointer(positionALocation,size,type,normalize,stride,offset);
    }


    draw(){
        gl.clearColor(0,0,0,0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        this.resize();
        this.setView();

        gl.drawArrays(gl.TRIANGLES,0,3);

        requestAnimationFrame(this.draw.bind(this));
    }




    render() {
        return <canvas id={`world`} ref={this.canvas}></canvas>
    }
}
