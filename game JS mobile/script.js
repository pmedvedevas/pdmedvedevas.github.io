//Player thing
const player = document.getElementById('player');
const game = document.getElementById('game');
const start = document.getElementById('start');
const gameStart = document.getElementById('start-game');

let hiScore;

const playerObj = {
    position: 162.5,
    score: 0,
    pace: 300,
    lives: 3,
    speed: 20,
    width: 50,
    gameOver: true
};

const moveRight = () => {
    if(playerObj.position < 320){
        playerObj.position += playerObj.speed;
        player.style.left = playerObj.position.toString() + "px";
    }
}

const moveLeft = () => {
    if(playerObj.position > 0){
        playerObj.position -= playerObj.speed;
        player.style.left = playerObj.position.toString() + "px";
    }
}

const rightControler = document.getElementById('right');
const leftControler = document.getElementById('left');

rightControler.addEventListener('click',moveRight);
leftControler.addEventListener('click',moveLeft);



//Start game
const gameFlow = () => {
    if(Math.random() > probability()){
        generateNormalBlock();
    } else {
        generateCrazyBlock();
    }
    if(Math.random() < 0.07) {
        generateBonus();
    }
}

gameStart.addEventListener("click", () => {
    start.remove();
    playerObj.gameOver = false;
})

const spawnInterval = setInterval(() => {
    if(!playerObj.gameOver){
        gameFlow();
    }
},playerObj.pace);


//set score, lives and width
const score = document.getElementById('score');
score.innerText = 0;
const lives = document.getElementById('lives');
const heartIcon = `<svg height="24" version="1.1" width="24" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><g transform="translate(0 -1028.4)"><path d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z" fill="#c0392b"/></g></svg>`;
for(let i = 0; i < playerObj.lives; i++){
    lives.innerHTML += heartIcon;
}
player.style.width = playerObj.width.toString()+"px"



//gameOver

const gameOver = () => {
    playerObj.gameOver = true;
    freezeAnimtation();
    updateScore();
    generatePopUp();
}

const freezeAnimtation = () => {
    let blocks = document.getElementsByClassName('block');
    for(const item of blocks){
        item.classList.remove('block-animation');
        item.classList.add('hide');
    }
    let crazyBlocks = document.getElementsByClassName('crazy-block');
    for(const item of crazyBlocks){
        item.classList.remove('crazy-animation');
        item.classList.add('hide');
    }
    let thunderBlocks = document.getElementsByClassName('thunder');
    for(const item of thunderBlocks){
        item.classList.remove('thunder');
        item.classList.add('hide');
    }
    let lifeBlocks = document.getElementsByClassName('addlife');
    for(const item of lifeBlocks){
        item.classList.remove('addlife');
        item.classList.add('hide');
    }
    let truncBlocks = document.getElementsByClassName('trunc');
    for(const item of truncBlocks){
        item.classList.remove('trunc');
        item.classList.add('hide');
    }
}

const updateScore = () => {
    hiScore = JSON.parse(localStorage.getItem('score'));
    if(playerObj.score > hiScore || !hiScore) {
        localStorage.setItem('score', JSON.stringify(playerObj.score));
    }
    hiScore = JSON.parse(localStorage.getItem('score'));
}

const generatePopUp = () => {
    const popUp = document.createElement('div');
    popUp.innerHTML = `<h2>Game Over!</h2>
    <p>Your Score: ${playerObj.score}</p>
    <p>High Score: ${hiScore}</p>
    <form><button id="try-again">New Game</button></form>
    `;
    popUp.setAttribute('id','pop-up');
    game.appendChild(popUp);
}

//Additional
const probability = () => {
    let score = playerObj.score;
    let prob = score / 100 * 0.01;
    return prob;
}





//Generate normal block function description

const generateNormalBlock = () => {
    const block = document.createElement('div');
    let randomPosition = Math.floor(Math.random() * 355);
    block.style.left = randomPosition.toString() + "px";
    block.setAttribute("class","block block-animation");
    game.appendChild(block);

    setInterval( () => {
        let blockTop = parseInt(window.getComputedStyle(block).top);
        let blockLeft = parseInt(window.getComputedStyle(block).left);
        let playerPosition = parseInt(window.getComputedStyle(player).left);
        if(blockTop >= 530 && blockTop < 570 && blockLeft + 20 > playerPosition && blockLeft < playerPosition + playerObj.width){
            playerObj.lives--;
            block.remove();
            lives.innerHTML = '';
            for(let i = 0; i < playerObj.lives; i++){
                lives.innerHTML += heartIcon;
            }
            if(playerObj.lives < 1) {
                gameOver();
            }
        }
    },10)

    setTimeout(() => {
        block.remove();
        if(!playerObj.gameOver){
            playerObj.score += 10;
            score.innerText = playerObj.score;
        }
    },2900)
    
}


//generate crazy block

const generateCrazyBlock = () => {
    const block = document.createElement('div');
    let randomPosition = Math.floor(Math.random() * 355);
    block.style.left = randomPosition.toString() + "px";
    if(Math.random() > 0.5) {
        block.setAttribute("class","crazy-block crazy-animation-left");
    } else {
        block.setAttribute("class","crazy-block crazy-animation-right");
    }
    game.appendChild(block);

    setInterval( () => {
        let blockTop = parseInt(window.getComputedStyle(block).top);
        let blockLeft = parseInt(window.getComputedStyle(block).left);
        let playerPosition = parseInt(window.getComputedStyle(player).left);
        if(blockTop >= 540 && blockTop < 560 && blockLeft + 10 > playerPosition && blockLeft < playerPosition + playerObj.width){
            playerObj.lives--;
            block.remove();
            lives.innerHTML = '';
            for(let i = 0; i < playerObj.lives; i++){
                lives.innerHTML += heartIcon;
            }
            if(playerObj.lives < 1) {
                gameOver();
            }
            
        }
    },10)

    setTimeout(() => {
        block.remove();
        if(!playerObj.gameOver){
            playerObj.score += 50;
            score.innerText = playerObj.score;
        }
    },2900)
}


//generate thunder 
const thunder = `<svg height="20px" viewBox="0 0 40 40" width="20px" xmlns="http://www.w3.org/2000/svg"><title/><polygon fill="#ffff00" points="32.468 11.421 14.996 31.098 25.566 31.222 21.677 46.443 40.508 26.496 28.799 26.496 32.468 11.421"/></svg>`;
const greenHeartIcon = `<svg height="24" version="1.1" width="24" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><g transform="translate(0 -1028.4)"><path d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z" fill="#00ff80"/></g></svg>`;

const generateBonus = () => {
    const block = document.createElement('div');
    let randomPosition = Math.floor(Math.random() * 355);
    block.style.left = randomPosition.toString() + "px";

    let randomIndex = Math.random();
    if(randomIndex > 0.5) {
        block.innerHTML = thunder;
        block.setAttribute('class','thunder');
    }
    else if(randomIndex < 0.5 && randomIndex >0.1) {
        block.setAttribute('class','trunc');
    }
    else {
        block.innerHTML = greenHeartIcon;
        block.setAttribute('class','addlife');
    }
    game.appendChild(block);

    setInterval( () => {
        let blockTop = parseInt(window.getComputedStyle(block).top);
        let blockLeft = parseInt(window.getComputedStyle(block).left);
        let playerPosition = parseInt(window.getComputedStyle(player).left);
        if(blockTop >= 530 && blockTop < 570 && blockLeft + 20 > playerPosition && blockLeft < playerPosition + playerObj.width){
            block.remove();
            if(block.classList.contains('thunder')){
                playerObj.speed +=10;
                setTimeout(() => {
                    playerObj.speed -=10;
                }, 15000);
            }
            else if(block.classList.contains('addlife')){
                playerObj.lives += 1;
                lives.innerHTML = '';
                for(let i = 0; i < playerObj.lives; i++){
                    lives.innerHTML += heartIcon;
                }
            }
            else if(block.classList.contains('trunc')){
                if(playerObj.width > 20) {
                    playerObj.width -= 10;
                    setTimeout(() => {
                        playerObj.width +=10;
                        player.style.width = playerObj.width.toString()+"px"
                    }, 30000);
                }
                player.style.width = playerObj.width.toString()+"px"
            }
            
        }
    },10)

    setTimeout(() => {
        block.remove();
    },2900)
}



