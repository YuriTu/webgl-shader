
import React, {Component} from "react";
import {initShaders} from "../../util/lib/cuon-utils";
import {Matrix4, Vector3, Vector4} from "../../util/lib/cuon-matrix";


import './index.css';
import aya from  '../../asset/imgs/akua-cry.jpg'

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const HALF_WIDTH = SCREEN_WIDTH / 2;
const HALF_HEIGHT = SCREEN_HEIGHT / 2;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;

let gl,canvas;


let vertextshader = `
attribute vec2 a_texCoord;
attribute vec2 a_position;


uniform vec2 u_resolution;

varying vec2 v_texCoord;

void main() {
    vec2 clipSpace = ((a_position / u_resolution) * 2.0) - 1.0;

    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    
    v_texCoord = a_texCoord;
}

`;


let fragmentshader = `

precision mediump float;

uniform sampler2D u_image;

varying vec2 v_texCoord;

void main(){
 gl_FragColor = texture2D(u_image, v_texCoord);
}

`;

export class Shader extends Component {
    constructor(props){
        super(props)
        this.canvas = React.createRef();

        this.resize =() => {
            if (canvas.width !== SCREEN_WIDTH || canvas.height !== SCREEN_HEIGHT){
                canvas.width = SCREEN_WIDTH;
                canvas.height = SCREEN_HEIGHT;
            }
        }

        this.setView = () => {
            gl.viewport(0,0,canvas.width,canvas.height);
        }


        // 批量构建缓冲区
        this.initArrayBuffer = (data, num, type, attribute) => {
            // 创建缓冲区
            let buffer = gl.createBuffer();
            // 确定缓冲区变量类型
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            // 向target注入数据
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
            // 链接着色器中的变量 获得着色器中的变量指针
            let a_attribute = gl.getAttribLocation(gl.program, attribute);
            // 通知shader，数据该如何处理
            gl.vertexAttribPointer(a_attribute, num,type,false,0,0);
            // 开启缓冲区
            gl.enableVertexAttribArray(a_attribute);
        };

        this.formateRectArr = (x,y,width,height) => {
            let x1 = x;
            let x2 = x + width;
            let y1 = y;
            let y2 = y+ height;
            return [
                x1, y1,
                x2, y1,
                x1, y2,
                x1, y2,
                x2, y1,
                x2, y2
            ]
        }
    }
    //   应该有一个中间件来处理这个事情，而不是没完没了的promise和clback
    async componentDidMount(){
        this.init();
        const img = await this.getImg(aya);
        this.bindData(img);
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

    getImg(src){
        const img = new Image();
        img.src = src;
        return new Promise((resolve, reject) => {
            img.onload = () => resolve(img);
        })
    }



    bindData(img){
        // 1. 位置信息
        this.positionArr = new Float32Array(this.formateRectArr(0,0,img.width,img.height));

        this.initArrayBuffer(this.positionArr,2,gl.FLOAT,'a_position');

        // texute 位置

        this.texCoordArr = new Float32Array([
            0.0,  0.0,
            1.0,  0.0,
            0.0,  1.0,
            0.0,  1.0,
            1.0,  0.0,
            1.0,  1.0
        ]);

        this.initArrayBuffer(this.texCoordArr,2,gl.FLOAT,'a_texCoord');


        // // texture
        let texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

        // uniform var

        let resolutionLocation = gl.getUniformLocation(gl.program, 'u_resolution');
        gl.uniform2f(resolutionLocation,gl.canvas.width,gl.canvas.height);

    }


    draw(){
        gl.clearColor(0,0,0,0);
        // gl.clear(gl.COLOR_BUFFER_BIT);
        this.resize();
        this.setView();

        gl.drawArrays(gl.TRIANGLES,0,6);

        // requestAnimationFrame(this.draw.bind(this));
    }




    render() {
        return <canvas id={`world`} ref={this.canvas}></canvas>
    }
}
