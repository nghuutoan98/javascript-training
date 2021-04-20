import {Node} from './Node.js';

export class Card extends Node {
    constructor(valueImg,id,valueCard)
    {
        super();
        this._valueImg   = '';
        this._id = '';
        this._valueCard = '';
        this.Cards = [];
        this.width = window.innerWidth/12;
        this.height = window.innerWidth/12;
        if (valueImg) this.valueImg = valueImg;
        if(id) this.id = id;
        if (valueCard) this.valueCard = valueCard;
    }

    get valueImg() { return this._valueImg;}
    set valueImg(value) {this._valueImg = value; this.elm.src = this._valueImg; }

    get id() { return this._id;}
    set id(value) { this._id = value;this.elm.id=this._id; }

    get valueCard() { return this._valueCard; }
    set valueCard(value) { this._valueCard = value; 
        this.elm.valueCard = this._valueCard;
    }

    _initElement() {
        this.elm = document.createElement("img");
        this.elm.style.position = "absolute";
    }

    setImage(valueImg) {
        this.valueImg = valueImg;
    }
}