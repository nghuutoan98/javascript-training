//Create a game "canvas"
var game = document.createElement("div");
document.body.appendChild(game);    //Add to body
game.style.position = "relative";

// var cards = [];
// var covers = [];
// var clickedImg = [];
// var img_value = [];
// var corrected_pair = [];
// var randomname = randomImage();
// var win = 0;
// clicked_cover = new Array(20).fill(-1);
// bg_img = createImage("./img/bg.jpg", 0, 0,window.innerWidth,window.innerHeight);
// tittle_img = createImage('./img/title.jpg',0,750,200,100);
// labelScore = createLabel("Score: ",100,500,1000,1000);
// score1 = createLabel(10000,100,580,1000,1000,'score');

function generateCard(cards)
{
    var bg = bg_img;
    for(let i = 0,img = 0; i < 4; i++) {
        for(let j = 0; j < 5; j++, img++)
        {
            let name = "./img/trucxanh" + randomname[img] + ".jpg";
            var img_width = bg.width/12;     
            cards[img] = createImage(name, i*img_width + bg.height*0.2, j*img_width + bg.width*0.3, img_width, img_width,img,'card',randomname[img]);
        }
    }
}

function generateCover(covers)  //USING CLICK EVENT, CHECK THIS OUT PLEASE
{
    var bg = bg_img;
    let img = 0;
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 5; j++, img++)
        {
            var img_width = bg.width/12;
            covers[img] = createImage("./img/back.jpeg", i*img_width + bg.height*0.2, j*img_width + bg.width*0.3, 
                                                        img_width, img_width,img,'cover',randomname[img]);
            console.log("Value: " + covers[img].value);
            covers[img].addEventListener('click', (item) => {
                clickCover(item.path[0])})
        }
    }
}

function randomImage()
{
    var name = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var arr = new Array(20).fill(0);
    for(let i = 0; i < 20; i++)
    {
        random = Math.floor(Math.random() * 10);
        while(name[random] >= 2)
        {
                random = Math.floor(Math.random() * 10);
        }
        name[random]++;
        arr[i] = random;
    }
    return arr;
}

function startPlay(){
    score = 10000;
    cards = [];
    covers = [];
    clickedImg = [];
    img_value = [];
    corrected_pair = [];
    randomname = randomImage();
    win = 0;
    clicked_cover = new Array(20).fill(-1);
    bg_img = createImage("./img/bg.jpg", 0, 0,window.innerWidth,window.innerHeight);
    tittle_img = createImage('./img/title.jpg',0,750,200,100);
    labelScore = createLabel("Score: ",100,500,1000,1000);
    score1 = createLabel(10000,100,580,1000,1000,'score');
    generateCard(cards);
    generateCover(covers);
}
function clickCover(cover)
{
    var regex = /\d+/g;
    var string = cover.id;
    var matches = string.match(regex); 
    corrected_pair.push("card" + matches);
    if(clickedImg.length >=2 ) return;  
    img_value.push(cover.value);
    console.log(img_value);
    clickedImg.push(cover);    
    if (clickedImg.length !== 2) cover.style.display='none';
    else {
        cover.style.display='none';
        setTimeout(function() {
            if(img_value[0] !== img_value[1]) {
            document.getElementById(clickedImg[0].id).style.display = 'flex';
            document.getElementById(clickedImg[1].id).style.display = 'flex';
            score = score - 1000; 
        }
            else {
                document.getElementById(corrected_pair[0]).style.display = 'none';
                document.getElementById(corrected_pair[1]).style.display = 'none';
                win++;
                score = score + 1500;
                updateScore(score);
            }
            updateScore(score);
            console.log(score);
            clickedImg = [];
            corrected_pair = [];
            img_value = [];
        },700);
    }
}

function createImage(src, top, left, width, height,id,type,value) {
    var image = document.createElement("img");
    image.src = src;
    image.id= type + id;
    image.value = value;
    image.style.position = "absolute";
    width && (image.style.width = width +"px");
    height && (image.style.height = height+ "px");
    image.style.top = top + "px";
    image.style.left = left + "px";
    game.appendChild(image);
    return image;
}

function createButton(label,top,left,width,height) {
    var button = document.createElement("button");
    button.innerHTML = label;
    button.style.position = "absolute";
    width && (button.style.width = width +"px");
    height && (button.style.height = height+ "px");
    button.style.top = top + "px";
    button.style.left = left + "px";
    game.appendChild(button);
    return button;
}

function updateScore()
{
    score1.innerHTML = score;
    //document.getElementById('score').innerHTML = score;
    //console.log(score);
    var bg = bg_img;
    var img_width = bg.width/12;
    if(score <= 0) {
        var bg_lose = createImage("./img/bg.jpg", 0, 0,window.innerWidth,window.innerHeight);
        var newtittle_img = createImage('./img/title.jpg',0,750,200,100);
        var lose = createImage("./img/lose.jpeg", 0.4*img_width + bg.height*0.2, 1*img_width + bg.width*0.3, img_width*3, img_width*3);  
        btnPlayAgain = createButton("Play again",0.1*img_width + bg.height*0.12, 2.1*img_width + bg.width*0.3,100,100);  
        btnPlayAgain.addEventListener('click', (item) => {
            playAgain()})
    }
    if(win === 10)    {
        var victory = createImage("./img/victory.jpeg", 2*img_width + bg.height*0.2, 0*img_width + bg.width*0.3, img_width, img_width);
    }
}

function createLabel(text,top,left,width,height,id) {
    var label = document.createElement("p");
    label.innerHTML = text;
    label.id = id;
    //label.style.fontSize = "1000px";
    label.style.position = "absolute";
    label.style.fontSize = "x-large";
    //font-family: "Times New Roman", Times, serif;
    width && (label.style.width = width +"px");
    height && (label.style.height = height+ "px");
    label.style.top = top + "px";
    label.style.left = left + "px";
    game.appendChild(label);
    return label;
}

function playAgain()
{   
    startPlay();
    btnPlayAgain.style.display = 'none';
}

startPlay();