let ball = document.getElementById('ball');

let move = () => {
    if(event.key === 'ArrowUp'){
        ball.classList.add('move-up');
    }
    else if(event.key === 'ArrowRight'){
        ball.classList.add('move-right');
    }
    else if(event.key === 'ArrowLeft'){
        ball.classList.add('move-left');
    }
    else if(event.key === 'ArrowDown'){
        ball.classList.add('move-down');
    }
}


let returnPosition = () => {
    ball.classList.remove('move-up');
    ball.classList.remove('move-right');
    ball.classList.remove('move-left');
    ball.classList.remove('move-down');
}



document.addEventListener('keydown',move);
document.addEventListener('keyup',returnPosition);


let winHeight = window.innerHeight;
document.querySelector('body').style.height = winHeight + "px";

let ballContHeight = winHeight - 300 + "px";
document.querySelector('.ball_container').style.height = ballContHeight;
