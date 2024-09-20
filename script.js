document.addEventListener("DOMContentLoaded" , () => {
    const gameArena = document.getElementById('game-arena');
    const arenaSize = 600;
    const cellSize = 20;
    let score = 0;
    let gameStarted = false;
    let food = {x: 300, y: 200};
    let snake = [{x: 160, y: 200},{x: 140, y: 200},{x: 120, y: 200}];
    let dx = cellSize
    let dy = 0;

    function drawScoreBoard(){
        const scoreBoard = document.getElementById('score-board');
        scoreBoard.textContent = `Score : ${score}`;
    }
    
    function drawDiv(x, y, className){
        const div = document.createElement('div');
        div.classList.add(className);
        div.style.top = `${y}px`;
        div.style.left = `${x}px`;
        return div;
    }

    function drawFoodAndSnake(){
        gameArena.innerHTML = '';// remove everthing drawn previously
        // and redraw with new coordinates when snake move

        snake.forEach((snakeCell)=>{
            const element = drawDiv(snakeCell.x, snakeCell.y, 'sanke');
            gameArena.appendChild(element);
        })
 
        const foodElement = drawDiv(food.x, food.y, 'food');
        gameArena.appendChild(foodElement);
    }

    function moveFood(){
        let newX, newY;
        do{
            newX = Math.floor(Math.random() * ((arenaSize - cellSize)/cellSize)*cellSize);
            newY = Math.floor(Math.random() * ((arenaSize - cellSize)/cellSize)*cellSize);
        } while(snake.some(snakeCell => snakeCell.x == newX && snakeCell.y == newY));

        food = {x:newX, y: newY};
    }

    function updateSnake(){
        console.log("Update snake called")
        // calculate new coordinate the sanke head will go
        const newHead = {x: snake[0].x+dx, y: snake[0].y + dy}
        snake.unshift(newHead); //add new head
        if(newHead.x == food.x && newHead.y == food.y){
            // collision
            //dont pop the element
            score += 5;
            // move food
            moveFood();

        } else{
            snake.pop(); //remove last element
        }
    }

    function isGameOver(){
        // check sanke body hit
        for(i = 1; i < snake.length; i++){
            if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) return true;
        }

        // check wall collision
        const isHittingLeftWall = snake[0].x < 0;
        const isHittingTopWall = snake[0].y < 0;
        const isHittingRightWall = snake[0].x >= arenaSize;
        const isHittingDownWall = snake[0].y >= arenaSize;

        return isHittingDownWall || isHittingLeftWall || isHittingRightWall || isHittingTopWall ; //game over

    }

    function gameLoop(){
        setInterval(()=>{
            if(!gameStarted) return;

            if(isGameOver()){
                gameStarted = false;
                alert(`Game Over, Score = ${score}`);
                window.location.reload();
                return;
            }
            updateSnake();
            drawScoreBoard();
            drawFoodAndSnake();
        },500);
    }

    function runGame(){
        gameStarted = true;
        gameLoop();
    }  

    function initiateGame(){
        const scoreBoard = document.createElement('div');
        scoreBoard.id = 'score-board';
        document.body.insertBefore(scoreBoard, gameArena);

        const startButton = document.createElement('button');
        startButton.textContent = 'Start Game';
        startButton.classList.add('start-button');
        document.body.appendChild(startButton);
        console.log(score);

        startButton.addEventListener('click' , ()=>{
            startButton.style.display = 'none';
            runGame();
        });
    }

    initiateGame();



});