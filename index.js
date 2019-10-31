(function () {
    var SIZE = 600; // 캔버스 크기 설정
    var OBJ_SIZE = SIZE / 20; // 사과랑 뱀 덩어리 크기
    var c = document.getElementById('c'); // canvas 받아오기
    c.height = c.width = SIZE; // 게임판 사이즈
    c.style.width = c.style.height = SIZE; // 게임 자체의 사이즈
    var context = c.getContext('2d'); // 2d 판으로 한다는 뜻

    var direction = 1;
    var increaseLength = 1;
    var newDirection = 1; // 2: 상, -2: 하, -1: 좌, 1: 우
    var snake = [{ x: SIZE / 2, y: SIZE / 2 }]; // 스네이크의 시작 지점 가운데로 하기 위해.
    var apple = null;
    var end = false;


    function appleLocation() {
        return Math.floor(Math.random() * SIZE / OBJ_SIZE) * OBJ_SIZE; // 랜덤 지점을 찍고 격자에 맞춰서 좌표를 리턴해줌.
    }

    function ObjLocation(obj) {
        return [obj.x, obj.y]; // 좌표 리턴
    }

    function tick() {
        var newHead = {
            x: snake[0].x,
            y: snake[0].y
        };


        if (Math.abs(direction) !== Math.abs(newDirection)) { // 위로갈때 아래막고 왼으로갈때 오 막고
            direction = newDirection; // 방향 바꾸기
        }
        var directionKey = Math.abs(direction) === 1 ? 'x' : 'y'; // 좌우가 +-1이므로 x좌표 그게아닐경우 y좌표임을 표시함.
        if (direction < 0) {
            newHead[directionKey] -= OBJ_SIZE; // 좌 또는 하로
        } else {
            newHead[directionKey] += OBJ_SIZE; // 우 또는 상으로
        }


        if (apple && apple.x === newHead.x && apple.y === newHead.y) {
            apple = null;
            snake.unshift(increaseLength);

        } // 사과 먹을때마다 길이 늘어나도록

        context.fillStyle = 'black';
        context.fillRect(0, 0, SIZE, SIZE); // 게임판으로 쓸 직사각형 검은색으로 그림

        if (end) {
            exit();
        } else {
            snake.unshift(newHead); // unshift를 이용해서 배열 앞에 head를 계속 늘림
            snake.pop(newHead); // pop을 이용해서 배열 뒤의 요소를 하나씩제거 결과적으로 앞으로 나아가는 듯한 모션을 만듦
        }


        if (newHead.x < 0 || newHead.x >= SIZE || newHead.y < 0 || newHead.y >= SIZE) {
            end = true;
        } // 벽에 부딛혔을때

        context.fillStyle = 'blue';
        var snakeBodyLocation = {};
        for (var i = 0; i < snake.length; i++) {
            context.fillRect(snake[i].x, snake[i].y, OBJ_SIZE, OBJ_SIZE); // snake의 몸통 늘려주는 것. 
            if (i > 0) {
                snakeBodyLocation[ObjLocation(snake[i])] = true;
            } // 몸통 각각의 좌표설정
            document.getElementById('score').innerHTML = "<i class=\"fas fa-apple-alt\"></i>" + " : " + (snake.length - 1);
        }

        if (snakeBodyLocation[ObjLocation(newHead)]) {
            end = true; // 몸통에 충돌했을때
        }


        while (!apple || snakeBodyLocation[ObjLocation(apple)]) {
            apple = { x: appleLocation(), y: appleLocation() };
        } // 스네이크랑 사과의 위치 안겹치도록

        context.fillStyle = 'red';
        context.fillRect(apple.x, apple.y, OBJ_SIZE, OBJ_SIZE); // 사과 위치
    }

    window.onload = function () {
        setInterval(tick, 80-); // 이 tick 이라는 함수를 setInterval로 설정하여 실행주기를 설정해준다.
        window.onkeydown = function (e) {
            newDirection = { 37: -1, 38: -2, 39: 1, 40: 2 }[e.keyCode] || newDirection;
        };
    };
})();
