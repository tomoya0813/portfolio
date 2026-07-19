/*======================================================
  データ
=========================================================*/


//コピー作成のためここから移動禁止======================================================================================
//操作
const state = {
    game: {
        holdPiece: null,
        isGameOver: false,
        isPaused: false,
        isStarted: false,
        dropTimer: null,
        score: 0,
        clearedLine: 0,
        level: 1,
        startLevel: 1
    },
    piece: {
        canHold: true,
        lockTimer: null,
        lockCount: 15,
        controlInterval: null,
        line: 0,
        isFixed: false
    }

}

const copyState = structuredClone(state);

const resetState = () => {
    clearInterval(state.game.dropTimer);
    clearTimeout(state.piece.lockTimer);
    Object.assign(state.game, copyState.game);
    Object.assign(state.piece, copyState.piece);
}

const copyPiecesState = structuredClone(state.piece);

const resetPiece = () => {
    Object.assign(state.piece, copyPiecesState)
}
//ここまで移動禁止========================================================================================/
const controlData = {
    KeyD: () => movePiece(1, 0),
    KeyA: () => movePiece(-1, 0),
    KeyS: () => movePiece(0, 1),
    KeyJ: () => rotatePiece(-1),
    KeyK: () => rotatePiece(1),
    Space: () => hold(),
    KeyW: () => hardDrop(),
    Escape: () => resetGame(),
    KeyP: () => pause(),
    Enter: () => gameStart(),
};

//数値
const config = {
    field: {
        hiddenHeight: 4,
        visibleHeight: 20,
        height: 24,
        width: 10
    },
    cellSize: 40,
    piece: {
        spawnX: 3,
        spawnY: 4,
        ISpawnY: 3
    },
    hold: { cellSize: 30 },
    next: { cellSize: 30 },
    ghost: 0.2,
    score: {
        line0: 0,
        line1: 100,
        line2: 300,
        line3: 500,
        line4: 800,
        maxScoreLevel: 30
    }
};

// 色
const colorData = {
    block: {
        T: "#a000f0",
        J: "#0000f0",
        L: "#f0a000",
        S: "#00f000",
        Z: "#f00000",
        O: "#f0f000",
        I: "#00f0f0"
    },
    grid: "#10153f3b",
    piece: {
        stroke: "black"
    }
};
//落下速度
const speed = [
    1000, 900, 800, 700, 600,
    500, 420, 360, 300, 250,
    210, 180, 160, 140, 120,
    100, 90, 80, 70, 60,
    55, 50, 45, 40, 35,
    30, 25, 20, 15, 10,
    8, 7, 6, 5, 4,
    3, 2, 1, 1, 1
];
// srs
const srs = {
    "0to1": [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
    "1to2": [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
    "2to3": [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
    "3to0": [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
    "0to3": [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
    "3to2": [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
    "2to1": [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
    "1to0": [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]]
}
const srsI = {
    "0to1": [[0, 0], [-2, 0], [1, 0], [-2, 1], [1, -2]],
    "1to2": [[0, 0], [-1, 0], [2, 0], [-1, -2], [2, 1]],
    "2to3": [[0, 0], [2, 0], [-1, 0], [2, -1], [-1, 2]],
    "3to0": [[0, 0], [1, 0], [-2, 0], [1, 2], [-2, -1]],
    "0to3": [[0, 0], [-1, 0], [2, 0], [-1, -2], [2, 1]],
    "3to2": [[0, 0], [-2, 0], [1, 0], [-2, 1], [1, -2]],
    "2to1": [[0, 0], [1, 0], [-2, 0], [1, 2], [-2, -1]],
    "1to0": [[0, 0], [2, 0], [-1, 0], [2, -1], [-1, 2]]
}

//ミノ　オフセット
const offset = {
    T: { x: 0, y: 0.5 },
    J: { x: 0, y: 0.5 },
    L: { x: 0, y: 0.5 },
    S: { x: 0, y: 0.5 },
    Z: { x: 0, y: 0.5 },
    O: { x: -0.5, y: 0.5 },
    I: { x: 0, y: 0.5 }
}

//ブロック

const blockData = {

    T: [
        [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 1, 0],
            [0, 1, 1],
            [0, 1, 0]
        ],
        [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ],
        [
            [0, 1, 0],
            [1, 1, 0],
            [0, 1, 0]
        ]
    ],

    J: [
        [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 1, 1],
            [0, 1, 0],
            [0, 1, 0]
        ],
        [
            [0, 0, 0],
            [1, 1, 1],
            [0, 0, 1],
        ],
        [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
        ]
    ],

    L: [
        [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1]
        ],
        [
            [0, 0, 0],
            [1, 1, 1],
            [1, 0, 0]
        ],
        [
            [1, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ]
    ],

    S: [
        [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0],
        ],
        [
            [0, 1, 0],
            [0, 1, 1],
            [0, 0, 1]
        ],
        [
            [0, 0, 0],
            [0, 1, 1],
            [1, 1, 0]
        ],
        [
            [0, 1, 0],
            [0, 1, 1],
            [0, 0, 1]
        ]
    ],
    Z: [
        [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 0, 1],
            [0, 1, 1],
            [0, 1, 0]
        ],
        [
            [0, 0, 0],
            [1, 1, 0],
            [0, 1, 1]
        ],
        [
            [0, 0, 1],
            [0, 1, 1],
            [0, 1, 0]
        ]
    ],

    O: [
        [
            [0, 1, 1],
            [0, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 1, 1],
            [0, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 1, 1],
            [0, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 1, 1],
            [0, 1, 1],
            [0, 0, 0]
        ]

    ],
    I: [
        [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]
        ]
    ]
}
// /フィールド

const field = Array.from({ length: config.field.height }, () => Array(config.field.width).fill(0))

//フィールドデバック用　x座標 y座標　typeで指定マスをtypeの色で埋める
const dF = (x, y, type) => {
    field[y - 1][x - 1] = `${type}`
}
/*======================================================
     ゲームシステム
======================================================*/

//　ミノのシャッフル
const blockShuffle = () => {

    const keys = Object.keys(blockData);
    const randBlock = [];

    for (let i = keys.length; i > 0; i--) {

        const random = Math.floor(Math.random() * i);

        randBlock.push(keys[random]);

        keys.splice(random, 1);
    }
    return randBlock
}

//ミノの出現　
const spawnPiece = () => {
    while (blockContainer.length < 6) {
        blockContainer.push(...blockShuffle())
    }

    const nextType = blockContainer.shift();

    return {
        x: config.piece.spawnX,
        y: nextType === 'I' ?
            config.piece.ISpawnY : config.piece.spawnY,
        type: nextType,
        rotation: 0
    }
};

//level更新
const levelCount = () => {
    const line = state.game.clearedLine;
    state.game.level = state.game.startLevel - 1 + Math.min(Math.floor(line / 10) + 1, 999)
}

//スコア更新
const scoreCount = () => {
    const score = config.score[`line${state.piece.line}`];
    state.game.score = Math.min(state.game.score + score * Math.min(state.game.level, config.score.maxScoreLevel), 99999999)
}
//別タブ時のポーズ
const windowBlur = () => {
    window.addEventListener('blur', () => {
        if (state.game.isStarted && !state.game.isGameOver && !state.game.isPaused) {
            pause();
        }
        for (const key in keyState) {
            keyState[key] = false;
            clearTimeout(delayTimer[key]);
            delayTimer[key] = null;
        }
    })
}
//衝突判定
const collision = (nx, ny, type, nrota) => {

    const shape = blockData[type][nrota];

    for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x] === 1) {
                const newPieceX = nx + x;
                const newPieceY = ny + y;

                if (
                    newPieceX < 0 ||
                    newPieceX >= field[0].length ||
                    newPieceY >= field.length ||
                    (newPieceY >= 0 && field[newPieceY][newPieceX] !== 0)) {
                    return true;
                }
            }
        }
    }
    return false;
}

//dropタイマーをリセット
const dropTimerReset = () => {
    clearInterval(state.game.dropTimer);
    const level = Math.min(state.game.level, speed.length);
    state.game.dropTimer = setInterval(drop, speed[level - 1]);
}

// lockTimerをリセット
const lockTimerReset = () => {
    clearTimeout(state.piece.lockTimer);
    state.piece.lockTimer = null;
}

//lockCountを減少
const lockCountMinus = () => {
    if (collision(currentPiece.x, currentPiece.y + 1, currentPiece.type, currentPiece.rotation)) {
        state.piece.lockCount--;
    }
}

//落下処理

const drop = () => {
    if (state.game.isPaused || state.game.isGameOver || !state.game.isStarted) return;

    if (!collision(currentPiece.x, currentPiece.y + 1, currentPiece.type, currentPiece.rotation)) {
        currentPiece.y++
    }
}
//固定
const lock = () => {
    if (state.piece.isFixed) return;
    if (state.game.isPaused || state.game.isGameOver || !state.game.isStarted) return;

    //ブロックと接触してるとき
    if (collision(currentPiece.x, currentPiece.y + 1, currentPiece.type, currentPiece.rotation)) {
        if (state.piece.lockCount <= 0) {
            fixPiece();
            return;
        };
        if (state.piece.lockTimer === null) {
            state.piece.lockTimer = setTimeout(() => {
                fixPiece();
            }, 500);

        }
    } else {//空中
        lockTimerReset();
    }
}

const fixPiece = () => {
    if (state.piece.isFixed) return;
    state.piece.isFixed = true;

    lockTimerReset();
    lockPiece();
    lineBreak();
    scoreCount();
    levelCount();
    resetPiece();
    currentPiece = spawnPiece();
    checkRespawn()
    dropTimerReset();
}


const lockPiece = () => {

    const shape = blockData[currentPiece.type][currentPiece.rotation];

    for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x] === 1) {
                const targetX = currentPiece.x + x;
                const targetY = currentPiece.y + y;


                if (targetY >= 0) {
                    field[targetY][targetX] = currentPiece.type;
                }
            }
        }
    }
};

// ライン消去

const lineBreak = () => {
    const clearLines = [];

    for (let y = 0; y < field.length; y++) {
        if (!field[y].includes(0)) {
            clearLines.push(y)
        }
    }

    state.piece.line = clearLines.length;
    state.game.clearedLine += clearLines.length

    for (let i = clearLines.length - 1; i >= 0; i--) {
        field.splice(clearLines[i], 1);

    }
    for (let n = 0; n < clearLines.length; n++) {
        field.unshift(Array(config.field.width).fill(0))
    }
}

//ゲーム中断処理
const text1 = document.getElementById('text1');
const text2 = document.getElementById('text2');
const text3 = document.getElementById('text3');
const message = document.getElementById('message');
const levelRange = document.getElementById('level-setting')

//スタート画面
const gameStart = () => {
    if (state.game.isStarted) return;
    levelRange.classList.remove('none')
    state.game.isStarted = true;
    state.game.level = state.game.startLevel
    message.classList.add('none');

    dropTimerReset();
}

//ゲームオーバー
const gameOver = () => {
    state.game.isGameOver = true;
    levelRange.classList.add('none')
    message.classList.remove('none');
    text1.textContent = 'score'
    text2.textContent = state.game.score;
    text3.textContent = 'Escキーでリトライ';
}
//ポｰズ　
const pause = () => {
    if (state.game.isGameOver || !state.game.isStarted) return;
    state.game.isPaused = !state.game.isPaused;
    levelRange.classList.add('none')
    message.classList.toggle('none');
    text1.textContent = 'PAUSE';
    text2.textContent = 'pキーでPAUSE解除';
    text3.textContent = 'Escキーでリトライ';

    for (const key in keyState) {
        keyState[key] = false;
        clearTimeout(delayTimer[key]);
        delayTimer[key] = null;
    }
}

/*=============================================
ゲーム進行
＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝*/

// 操作
const keyState = {
    KeyD: false,
    KeyA: false,
    KeyS: false
}


const delayTimer = {
    KeyD: null,
    KeyA: null,
    KeyS: null
}

const control = () => {

    document.addEventListener("keydown", (e) => {

        if (!Object.hasOwn(controlData, e.code)) return;
        e.preventDefault();
        if (e.repeat) return;

        controlData[e.code]();
        if (e.code === 'KeyA') {
            keyState.KeyD = false;
            clearTimeout(delayTimer.KeyD);
            delayTimer.KeyD = null;
        } else if (e.code === 'KeyD') {
            keyState.KeyA = false;
            clearTimeout(delayTimer.KeyA);
            delayTimer.KeyA = null;
        }

        if (e.code === 'KeyD' || e.code === 'KeyA' || e.code === 'KeyS') {

            if (delayTimer[e.code] !== null) {
                clearTimeout(delayTimer[e.code]);
            }

            delayTimer[e.code] = setTimeout(() => {
                keyState[e.code] = true;
            }, 300);
        }
    });


    document.addEventListener("keyup", (e) => {

        if (!Object.hasOwn(keyState, e.code)) return;

        keyState[e.code] = false;

        clearTimeout(delayTimer[e.code]);
        delayTimer[e.code] = null;
    });


    if (state.piece.controlInterval === null) {

        state.piece.controlInterval = setInterval(() => {

            for (const key in keyState) {

                if (keyState[key]) {
                    controlData[key]();
                }
            }
        }, 32);

    }
}

//移動
const movePiece = (x, y) => {
    if (state.game.isPaused || state.game.isGameOver || !state.game.isStarted) return;

    const nx = currentPiece.x + x;
    const ny = currentPiece.y + y;

    if (!collision(nx, ny, currentPiece.type, currentPiece.rotation)) {
        if (y > 0) {
            state.game.score += 1;
        }
        currentPiece.x = nx
        currentPiece.y = ny;
        lockCountMinus();
        lockTimerReset();
    }
}

//ハードドロップ
const hardDrop = () => {
    if (state.piece.isFixed) return;
    if (state.game.isPaused || state.game.isGameOver || !state.game.isStarted) return;

    while (!collision(currentPiece.x, currentPiece.y + 1, currentPiece.type, currentPiece.rotation)) {
        currentPiece.y++;
        state.game.score += 2
    }
    fixPiece();
}


//回転
const rotatePiece = (n) => {
    if (state.game.isPaused || state.game.isGameOver || !state.game.isStarted) return;

    const nrota = (currentPiece.rotation + n + 4) % 4;
    const s = `${currentPiece.rotation}to${nrota}`;

    const Key = (currentPiece.type === "I") ?
        srsI :
        srs;

    for (let i = 0; i < Key[s].length; i++) {
        const sx = Key[s][i][0];
        const sy = Key[s][i][1]

        if (!collision(currentPiece.x + sx, currentPiece.y + sy, currentPiece.type, nrota)) {
            currentPiece.x += sx;
            currentPiece.y += sy;
            currentPiece.rotation = nrota;
            lockCountMinus();
            lockTimerReset();
            return;
        }
    }

}

//　ホールド

const hold = () => {
    if (state.game.isPaused || state.game.isGameOver || !state.game.isStarted) return;

    if (state.piece.canHold === false) return;


    if (state.game.holdPiece === null) {

        const type = blockContainer[0];
        const x = config.piece.spawnX;
        const y = type === 'I' ?
            config.piece.ISpawnY : config.piece.spawnY;


        if (collision(x, y, type, 0)) {
            state.piece.canHold = false;
            return;
        }
        state.game.holdPiece = currentPiece.type;
        currentPiece = spawnPiece();

        checkRespawn();
    } else {
        const box = state.game.holdPiece;

        const x = config.piece.spawnX;
        const y = box === 'I' ?
            config.piece.ISpawnY : config.piece.spawnY;

        if (collision(x, y, box, 0)) {
            state.piece.canHold = false;
            return;
        }

        state.game.holdPiece = currentPiece.type;

        currentPiece = {
            x: config.piece.spawnX,
            y: box === 'I' ?
                config.piece.ISpawnY : config.piece.spawnY,
            type: box,
            rotation: 0
        };
    }
    state.piece.canHold = false;
    state.piece.lockCount = 15;
    lockTimerReset();
    dropTimerReset();
}
//ゲームオーバー判定
const checkRespawn = () => {
    if (collision(currentPiece.x, currentPiece.y, currentPiece.type, currentPiece.rotation)) {
        gameOver();
    }
}

//ゲームリセット
const resetGame = () => {
    levelRange.classList.remove('none');
    document.getElementById('start-level').value = 1
    resetState();
    levelCount();
    scoreCount();
    for (let y = 0; y < field.length; y++) {
        field[y].fill(0);
    }

    blockContainer = blockShuffle();
    currentPiece = spawnPiece();
    text1.textContent = "TETRIS";
    text2.textContent = "Press Enter";
    text3.textContent = "Start";
    message.classList.remove('none');
}

//初期レベル設定
const startLevelSet = () => {
    const startLevel = document.getElementById('start-level');
    startLevel.addEventListener('input', (e) => {
        state.game.startLevel = Number(e.target.value)
    })
}


/*==================================================================
  描画
  ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ */

// フィールド描画

const fieldCanvas = document.getElementById('field');
const fieldCtx = fieldCanvas.getContext('2d');

const drawField = () => {
    const hidden = config.field.hiddenHeight

    for (let y = hidden; y < field.length; y++) {
        for (let x = 0; x < field[y].length; x++) {
            if (field[y][x] !== 0) {
                const drawX = x * config.cellSize;
                const drawY = (y - hidden) * config.cellSize;
                fieldCtx.fillStyle = colorData.block[field[y][x]];
                fieldCtx.fillRect(drawX, drawY, config.cellSize, config.cellSize)
                fieldCtx.strokeRect(drawX, drawY, config.cellSize, config.cellSize)
            }

        }
    }
};

//　グリッド描画
const drawGrid = () => {

    fieldCtx.strokeStyle = colorData.grid;
    const hidden = config.field.hiddenHeight;
    for (let y = hidden; y < field.length; y++) {
        for (let x = 0; x < field[y].length; x++) {

            const drawX = x * config.cellSize
            const drawY = (y - hidden) * config.cellSize

            fieldCtx.strokeRect(drawX, drawY, config.cellSize, config.cellSize)
        }
    }
}

// ミノ描画
const drawPiece = () => {
    fieldCtx.fillStyle = colorData.block[currentPiece.type];
    fieldCtx.strokeStyle = colorData.piece.stroke;

    const shape = blockData[currentPiece.type][currentPiece.rotation];
    const hidden = config.field.hiddenHeight;

    for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x] === 1) {

                const drawX = (currentPiece.x + x) * config.cellSize
                const drawY = (currentPiece.y + y - hidden) * config.cellSize

                fieldCtx.fillRect(drawX, drawY, config.cellSize, config.cellSize);
                fieldCtx.strokeRect(drawX, drawY, config.cellSize, config.cellSize);
            }
        }
    }
};



// ホールド描画
const holdCanvas = document.getElementById('hold');
const holdCtx = holdCanvas.getContext('2d')

const drawHold = () => {
    holdCtx.clearRect(0, 0, holdCanvas.width, holdCanvas.height)
    if (state.game.holdPiece === null) return;

    holdCtx.fillStyle = colorData.block[state.game.holdPiece]

    const shape = blockData[state.game.holdPiece][0];
    const size = config.hold.cellSize;

    const centerX = (holdCanvas.width - (shape[0].length * size)) / 2;
    const centerY = (holdCanvas.height - (shape.length * size)) / 2;

    const off = offset[state.game.holdPiece];

    for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x] === 1) {

                const drawX = centerX + (x + off.x) * size;
                const drawY = centerY + (y + off.y) * size;

                holdCtx.fillRect(drawX, drawY, size, size);
                holdCtx.strokeRect(drawX, drawY, size, size);
            }
        }
    }
}
// ネクスト描画
const nextCanvas = document.querySelectorAll('.next');
const nextCtx = [];

nextCanvas.forEach(element => {
    nextCtx.push(element.getContext('2d'));
});

const drawNext = () => {
    nextCtx.forEach((element, i) => {
        element.clearRect(0, 0, nextCanvas[i].width, nextCanvas[i].height);

        const type = blockContainer[i];
        const shape = blockData[type][0];
        const size = config.next.cellSize;

        const centerX = (nextCanvas[i].width - (shape[0].length * size)) / 2;
        const centerY = (nextCanvas[i].height - (shape.length * size)) / 2;

        const off = offset[type];

        element.fillStyle = colorData.block[type]
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x] === 1) {

                    const drawX = centerX + (x + off.x) * size;
                    const drawY = centerY + (y + off.y) * size;

                    element.fillRect(drawX, drawY, size, size);
                    element.strokeRect(drawX, drawY, size, size)
                }
            };
        }
    })
}

//ゴーストミノ描画
const drawGhost = () => {

    let ghost = {
        x: currentPiece.x,
        y: currentPiece.y,
        type: currentPiece.type,
        rotation: currentPiece.rotation
    }

    while (!collision(ghost.x, ghost.y + 1, ghost.type, ghost.rotation)) {
        ghost.y++
    }

    fieldCtx.save();
    fieldCtx.globalAlpha = config.ghost;
    fieldCtx.fillStyle = colorData.block[ghost.type];

    const shape = blockData[ghost.type][ghost.rotation];
    const hidden = config.field.hiddenHeight;

    for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x] === 1) {
                const drawX = (ghost.x + x) * config.cellSize;
                const drawY = (ghost.y + y - hidden) * config.cellSize;

                fieldCtx.fillRect(drawX, drawY, config.cellSize, config.cellSize);
                fieldCtx.strokeRect(drawX, drawY, config.cellSize, config.cellSize);
            }
        }
    }
    fieldCtx.restore();
}
//level描画
const drawLevel = () => {
    document.getElementById('level').textContent = state.game.level
}
//score描画
const drawScore = () => {
    document.getElementById('score').textContent = state.game.score.toLocaleString('ja-JP')
}
//line描画
const drawLine = () => {
    const clearedLine = Math.min(state.game.clearedLine, 9999);
    document.getElementById('line').textContent = clearedLine;
}

const drawStartLevel = () => {
    document.getElementById('level-value').textContent = state.game.startLevel
}

const drawAll = () => {
    fieldCtx.clearRect(0, 0, fieldCanvas.width, fieldCanvas.height)
    drawField();
    drawGrid();
    drawPiece();
    drawGhost()
    drawNext();
    drawHold();
    drawLevel();
    drawScore();
    drawLine();
    drawStartLevel();
    requestAnimationFrame(drawAll)
}

/*======================================
初期化
===============================*/
startLevelSet();
let blockContainer = blockShuffle();
let currentPiece = spawnPiece();

setInterval(lock, 16);
control();
drawAll();
windowBlur();
