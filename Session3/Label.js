import {Node} from './Node.js';

export class Label extends Node{
    constructor(){
        super();
        this._text = '';
        this._fontStyle = '';
        this._id = '';
        this._fontSize = '';
        this._color = '';
        this._fontFamily = '';
    }

    get text(){
        return this._text;
    }
    set text(value) {
        this._text = value;
        this.elm.innerHTML = this._text;
    }

    get id(){
        return this._id;
    }
    set id(value){
        this._id = value;
        this.elm.id = this._id;
    }

    _initElement() {
        this.elm = document.createElement('p');
        this.elm.style.position = "absolute";
    }

    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
        this.elm.style.color = this._color;
    }

    get fontSize() {
        return this._fontSize;
    }
    set fontSize(value) {
        this._fontSize = value;
        this.elm.style.fontSize = this._fontSize;
    }

    get fontStyle() {
        return this._fontStyle;
    }

    set fontStyle(value) {
        this.fontStyle = value;
        this.elm.style.fontStyle = this.fontStyle;
    }

}