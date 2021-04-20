import { Node } from './Node.js';
import { Card } from './Card.js';
import {Label} from './Label.js';
import { Button } from './Button.js';

var clickedImg = [];
var score = 10000;
var countClick = 0;
var win = 0;

export class Game extends Node {
    init() {
        score = 1000;
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
        title.width = window.innerWidth/6;
        title.height = window.innerHeight/6;
        title.x = 2*title.width*0.95 + window.innerHeight*0.2;

        let showScore = new Label();
        showScore.x = window.innerWidth/(10.5);
        showScore.y = window.innerHeight/2.6;
        showScore.fontSize = '80px';
        showScore.text = score;
        showScore.id = 'score';

        let labelScore = new Label();
        labelScore.x = window.innerWidth/10;
        labelScore.y = window.innerHeight/2.9;
        labelScore.fontSize = '60px';
        labelScore.color = 'red';
        labelScore.text = 'Score';
        labelScore.id = 'labelscore';

        let btnPlayAgain = new Button();
        btnPlayAgain.text = 'Play Again';
        btnPlayAgain.fontSize = '40px';
        btnPlayAgain.width = window.innerWidth/5;
        btnPlayAgain.height = window.innerHeight/6;
        btnPlayAgain.x = window.innerWidth/2.52;
        btnPlayAgain.y = window.innerHeight/4;
        btnPlayAgain.backgroundColor = 'LightGreen';
        btnPlayAgain.color = 'White';
        btnPlayAgain.elm.style.display = 'none';
        btnPlayAgain.id = 'btnAgain';
        btnPlayAgain.on('click',this.onClickAgain.bind(this));

        this.addChild(bg);
        this.addChild(vic);
        this.addChild(title);
        this.addChild(showScore);
        this.addChild(labelScore);
        this.addChild(btnPlayAgain);
        this._initSize();
        this._initCards();
        this._initRandom();
    }

    

    _initSize(){    //Window to play game;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.elm.style.border = "1px solid blue";
    }

    _initRandom() {
        var name = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var arr = new Array(20).fill(0);
        for(let i = 0; i < 20; i++)
        {
            let random = Math.floor(Math.random() * 10);
            while(name[random] >= 2)
            {
                    random = Math.floor(Math.random() * 10);
            }
            name[random]++;
            arr[i] = random;
        }
        return arr;
    }

    _initCards() {
        var randomname = this._initRandom();
        for(let i = 0,img = 0; i < 4; i++) {
            for(let j = 0; j < 5; j++, img++)
            {
                var img_width = window.innerWidth/12;     
                //let card = new Card(name,'card'+img,randomname[img]);
                let card = new Card('./img/back.jpeg',img,randomname[img]);
                card.y = i*img_width + window.innerHeight*0.2;
                card.id = img;
                card.x = j*img_width + window.innerWidth*0.3;
                card.valueCard = randomname[img];
                this.addChild(card);
                card.on("click", this.onClickCard.bind(this));
            }
        }
    }

    onClickCard(evt) {
        if(countClick >= 2) return;
        countClick++;
        let card = evt.target;
        clickedImg.push(card);
        card.src = './img/trucxanh' + card.valueCard + '.jpg';
        if(countClick === 2) {
            if(clickedImg[0].id === clickedImg[1].id) { countClick--; clickedImg.pop();return;}
            setTimeout(function() {
                if(clickedImg[0].valueCard === clickedImg[1].valueCard)
                {
                    document.getElementById(clickedImg[0].id).style.display = 'none';
                    document.getElementById(clickedImg[1].id).style.display = 'none';
                    score += 1500;
                    win++;
                } 
                else { 
                    document.getElementById(clickedImg[0].id).src = './img/back.jpeg' ;
                    document.getElementById(clickedImg[1].id).src = './img/back.jpeg';
                    score -= 1000;
                }
                document.getElementById('score').innerHTML = score;
                if(score <= 0)
                {
                    for(let index = 0; index < 20; index ++)
                    {
                        document.getElementById(index).style.display = 'none';
                    }
                    document.getElementById('score').style.display = 'none';
                    document.getElementById('labelscore').style.display = 'none';
                    document.getElementById('btnAgain').style.display = 'block';
                    return;
                }
                if(win === 10)
                {
                    for(let index = 0; index < 20; index ++)
                    {
                        document.getElementById(index).style.display = 'none';
                    }
                    document.getElementById('score').style.display = 'none';
                    document.getElementById('labelscore').style.display = 'none';
                    document.getElementById('victory').style.display = 'block';
                    document.getElementById('btnAgain').style.display = 'block';
                }
                clickedImg = [];
                countClick = 0;
            },700)
        }
    }

    onClickAgain()
    {
        location.reload();
        //this.init();
    }
}