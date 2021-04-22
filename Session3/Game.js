import { Node } from './Node.js';
import { Card } from './Card.js';
import { Label } from './Label.js';
import { Button } from './Button.js';
import { Animate } from './Animate.js';

var clickedImg = [];
var score = 10000;
var countClick = 0;
var clickable = false;
var win = 0;
var animate = new Animate();

export class Game extends Node {
    init() {
        let bg = new Card('./img/bg.jpg');
        bg.width = window.innerWidth;
        bg.height = window.innerHeight;

        let title = new Card('./img/title.jpg');
        title.width = window.innerWidth / 6;
        title.id = 'title';
        title.height = window.innerHeight / 6;
        title.x = 2 * title.width * 0.95 + window.innerHeight * 0.2;

        let btnPlay = new Card('./img/play.jpeg');
        btnPlay.id = 'play';
        btnPlay.width = window.innerWidth / 5;
        btnPlay.height = window.innerHeight / 3;
        btnPlay.x = window.innerWidth / 2.52;
        btnPlay.y = window.innerHeight / 3;
        btnPlay.on('click', this.play.bind(this));

        this.addChild(bg);
        this.addChild(btnPlay);
        this.addChild(title);

        setInterval(() => {
            var timeline = gsap.timeline();
            timeline.to(document.getElementById('play'), { duration: 1, opacity: 1, scaleX: 1.5, scaleY: 1.5, zIndex: 99 });
            timeline.to(document.getElementById('play'), { duration: 1, opacity: 1, scaleX: 1, scaleY: 1, zIndex: 99 });
        }, 2000);
        
    }

    play() {
        document.getElementById('play').style.display = 'none';
        score = 10000;
        countClick = 0;
        win = 0;
        clickedImg = [];

        let bg = new Card('./img/bg.jpg');
        bg.width = window.innerWidth;
        bg.height = window.innerHeight;

        let vic = new Card('./img/victory.jpeg');
        vic.width = window.innerWidth;
        vic.height = window.innerHeight;
        vic.elm.style.display = 'none';
        vic.id = 'victory';

        let title = new Card('./img/title.jpg');
        title.width = window.innerWidth / 6;
        title.id = 'title';
        title.height = window.innerHeight / 6;
        title.x = 2 * title.width * 0.95 + window.innerHeight * 0.2;

        let showScore = new Label('score',score,80);
        showScore.x = window.innerWidth / (10.5);
        showScore.y = window.innerHeight / 2.6;

        let labelScore = new Label('labelscore','Score',60,'red');
        labelScore.x = window.innerWidth / 10;
        labelScore.y = window.innerHeight / 2.9;

        let btnPlayAgain = new Button();
        btnPlayAgain.text = 'Play Again';
        btnPlayAgain.fontSize = '40px';
        btnPlayAgain.width = window.innerWidth / 5;
        btnPlayAgain.height = window.innerHeight / 6;
        btnPlayAgain.x = window.innerWidth / 2.52;
        btnPlayAgain.y = window.innerHeight / 4;
        btnPlayAgain.backgroundColor = 'LightGreen';
        btnPlayAgain.color = 'White';
        btnPlayAgain.elm.style.display = 'none';
        btnPlayAgain.id = 'btnAgain';
        btnPlayAgain.on('click', this.onClickAgain.bind(this));

        let btnReturn = new Button();
        btnReturn.text = 'Return';
        btnReturn.fontSize = '40px';
        btnReturn.width = window.innerWidth / 5;
        btnReturn.height = window.innerHeight / 6;
        btnReturn.x = window.innerWidth / 2.52;
        btnReturn.y = window.innerHeight / 1.38;
        btnReturn.backgroundColor = 'White';
        btnReturn.color = 'Black';
        btnReturn.elm.style.display = 'none';
        btnReturn.id = 'btnReturn';
        btnReturn.on('click', this.onClickAgain.bind(this));

        this.addChild(bg);
        this.addChild(vic);
        this.addChild(title);
        this.addChild(showScore);
        this.addChild(labelScore);
        this.addChild(btnPlayAgain);
        this.addChild(btnReturn);
        this._initSize();
        this._initCards();
        this._initRandom();
    }


    _initSize() {    //Window to play game;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }

    _initRandom() {
        var name = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        //var arr = new Array(20).fill(0);
        var arr = [];
        for (let i = 0; i < 20; i++) arr.push(-1);
        for (let i = 0; i < 20; i++) {
            let random = Math.floor(Math.random() * 10);
            while (name[random] >= 2) {
                random = Math.floor(Math.random() * 10);
            }
            name[random]++;
            arr[i] = random;
        }
        return arr;
    }

    _initCards() {
        var randomname = this._initRandom();
        for (let i = 0, img = 0; i < 4; i++) {
            for (let j = 0; j < 5; j++, img++) {
                let card = new Card('./img/back.jpeg', img, randomname[img]);
                let posy = i * (window.innerWidth / 12) + window.innerHeight * 0.2;
                let posx = j * (window.innerWidth / 12) + window.innerWidth * 0.3;
                card.y = window.innerHeight / 2.5;
                card.x = window.innerWidth / 1.2;
                card.width = window.innerWidth / 8;
                card.height = window.innerHeight / 4;
                card.id = img;
                card.valueCard = randomname[img];
                this.addChild(card);
                animate.cardMove(card, posx, posy, card.width, card.height, img);
                card.on("click", this.onClickCard.bind(this));
            }
        }
        setTimeout(() => {
            clickable = true;   
        }, 6500);
    }

    onClickCard(evt) {
        if (clickable === false) return;
        let card = evt.target;
        clickedImg.push(card);
        countClick++;
        if (countClick === 2) {
            if (clickedImg[0].id === clickedImg[1].id) {
                countClick--; clickedImg.pop();
                return;
            }
        }
        if (countClick === 2) clickable = false;
        animate.cardFlipAnimate(card);
        setTimeout(() => {
            clickedImg[countClick - 1].src = './img/trucxanh' + card.valueCard + '.jpg';
            if (countClick === 2) {
                clickable = false;
                setTimeout(() => {
                    this.checkValue(clickedImg[0], clickedImg[1]);
                }, 400)
            }
        }, 400)
    }

    checkOver() {
        if (score <= 0) {
            for (let index = 0; index < 20; index++) {
                document.getElementById(index).style.display = 'none';
            }
            document.getElementById('score').style.display = 'none';
            document.getElementById('labelscore').style.display = 'none';
            document.getElementById('btnAgain').style.display = 'block';
        }
        if (win === 10) {
            for (let index = 0; index < 20; index++) {
                document.getElementById(index).style.display = 'none';
            }
            document.getElementById('score').style.display = 'none';
            document.getElementById('labelscore').style.display = 'none';
            document.getElementById('title').style.display = 'none';
            document.getElementById('victory').style.display = 'block';
            document.getElementById('btnReturn').style.display = 'block';
        }
    }

    reset() {
        clickable = true;
        clickedImg = [];
        countClick = 0;
    }

    onClickAgain() {
        location.reload();
    }

    checkValue(item1, item2) {
        if (item1.valueCard === item2.valueCard) {
            animate.cardCorrect(item1);
            animate.cardCorrect(item2);
            //this.cardCorrect(item1);
            //this.cardCorrect(item2);
            score = animate.updateScore(true,score,'score');
            win++;
        }
        else {
            setTimeout(() => {
                document.getElementById(item1.id).src = './img/back.jpeg';
                document.getElementById(item2.id).src = './img/back.jpeg';
            }, 400)
            score = animate.updateScore(false,score,'score');
            animate.cardFlipAnimate(item1);
            animate.cardFlipAnimate(item2);
        }
        gsap.delayedCall(0.4, this.reset);
        this.checkOver();
    }
}