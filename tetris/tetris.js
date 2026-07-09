/*======================================================
  データ
=========================================================*/

//操作
const state = {
    game: {

        holdPiece: null,
    },
    piece: {
        holdFlag: true,
        hardDrop: false,
        moved: false,
        lockTimer: null,
        lockCount: 0,
    }

}
const copyState = structuredClone(state);
const resetGame = () => {
    Object.assign(state, copyState)
}

const copyPiecesState = structuredClone(state.piece);
const resetPiece = () => {
    Object.assign(state.piece, copyPiecesState)
}

const contoroleData = {
    d: () => movePiece(1, 0),
    a: () => movePiece(-1, 0),
    s: () => movePiece(0, 1),
    j: () => rotatePiece(-1),
    k: () => rotatePiece(1),
    h: () => hold(),
    w: () => hardDrop(),
    r: () => resetGame()
};

//数値
const config = {
    lockCount: 14,
    field: {
        height: 20,
        width: 10
    },
    cellSize: 40,
    piece: {
        spawnX: 3,
        spawnY: 1
    },
    hold: { cellSize: 30 },
    next: { cellSize: 30 },
    ghost: 0.2
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

// srs
const srs = {
    "0to1": [[0, 0], [-1, 0], [-1, - 1], [0, 2], [-1, 2]],
    "1to2": [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
    "2to3": [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
    "3to0": [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
    "0to3": [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
    "3to2": [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
    "2to1": [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
    "1to0": [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]]
}
const srsI = {
    "0to1": [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
    "1to2": [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]],
    "2to3": [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
    "3to0": [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
    "0to3": [[0, 0], [-1, 0], [2, 0], [-1, -2], [2, 1]],
    "3to2": [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
    "2to1": [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, -1]],
    "1to0": [[0, 0], [2, 0], [-1, 0], [2, -1], [-1, 2]]
}

//ミノ　オフセット
const offset = {
    T: { x: 0, y: 0.5 },
    J: { x: 0, y: 0.5 },
    L: { x: 0, y: 0.5 },
    S: { x: 0, y: -0.5 },
    Z: { x: 0, y: -0.5 },
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
        ],
    ],

    S: [
        [
            [0, 0, 0],
            [0, 1, 1],
            [1, 1, 0]

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

        ],
    ],
    Z: [
        [
            [0, 0, 0],
            [1, 1, 0],
            [0, 1, 1],

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
        ],

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

let blockContainer = blockShuffle();

//ミノの出現　
const spawnPiece = () => {
    while (blockContainer.length < 6) {
        blockContainer.push(...blockShuffle())
    }
    return {
        x: config.piece.spawnX,
        y: config.piece.spawnY,
        type: blockContainer.shift(),
        rotation: 0
    }
};

let piece = spawnPiece();


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
                    newPieceY < 0 ||
                    newPieceY >= field.length ||
                    field[newPieceY][newPieceX] !== 0) {
                    return true;
                }
            }
        }
    }
    return false;
}


//落下処理
setInterval(() => {
    if (!collision(piece.x, piece.y + 1, piece.type, piece.rotation)) {
        piece.y++
    }
}, 1000);

setInterval(() => {
    //ハードドロップ
    if (state.piece.hardDrop === true) {
        clearTimeout(state.piece.lockTimer)
        lockPiece();
        lineBreak();
        resetPiece();
        piece = spawnPiece();
        return;
    }
    //ブロックと接触してるとき
    if (collision(piece.x, piece.y + 1, piece.type, piece.rotation)) {

        if (state.piece.lockTimer === null) {
            state.piece.lockTimer = setTimeout(() => {
                lockPiece();
                lineBreak();
                resetPiece();
                piece = spawnPiece();
            }, 500)
        }
    } else {//空中
        if (state.piece.moved === true) {
            state.piece.lockCount++;
            state.piece.moved = false;
            if (state.piece.lockCount < config.lockCount) {
                clearTimeout(state.piece.lockTimer);
                state.piece.lockTimer = null;
            } else if (state.piece.lockTimer === null) {
                state.piece.lockTimer = setTimeout(() => {
                    lockPiece();
                    lineBreak();
                    resetPiece();
                    piece = spawnPiece();
                    return
                }, 500)
            }
        };
    }
}, 16);


//ミノをfieldに固定

const lockPiece = () => {

    const shape = blockData[piece.type][piece.rotation];

    for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x] === 1) {
                field[piece.y + y][piece.x + x] = piece.type
            }
        }
    }
};

// ライン消去

const lineBreak = () => {
    const breakedLine = [];
    for (let y = 0; y < field.length; y++) {
        if (!field[y].includes(0)) {
            breakedLine.push(y)
        }
    }
    for (let i = breakedLine.length - 1; i >= 0; i--) {
        field.splice(breakedLine[i], 1);

    }

    for (let n = 0; n < breakedLine.length; n++) {
        field.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0,])
    }
}

/*=============================================
ゲーム進行
＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝*/

// 操作
const contorole = () => {
    document.addEventListener("keydown", (e) => {
        if (Object.hasOwn(contoroleData, e.key)) contoroleData[e.key]();
    })
}

//移動
const movePiece = (x, y) => {
    const nx = piece.x + x;
    const ny = piece.y + y;

    if (!collision(nx, ny, piece.type, piece.rotation)) {
        piece.x = nx
        piece.y = ny;
    }

    if (collision(piece.x, piece.y + 1, piece.type, piece.rotation)) {
        state.piece.moved = true
    }
}

//ハードドロップ
const hardDrop = () => {
    while (!collision(piece.x, piece.y + 1, piece.type, piece.rotation)) {
        piece.y++;
    }
    state.piece.hardDrop = true
}


//回転
const rotatePiece = (n) => {
    const nrota = (piece.rotation + n + 4) % 4;
    const s = `${piece.rotation}to${nrota}`;

    const Key = (piece.type === "I") ?
        srsI :
        srs;

    for (let i = 0; i < Key[s].length; i++) {
        const sx = Key[s][i][0];
        const sy = Key[s][i][1]

        if (!collision(piece.x + sx, piece.y + sy, piece.type, nrota)) {
            piece.x += sx;
            piece.y += sy;
            piece.rotation = nrota;
        }
        if (collision(piece.x, piece.y + 1, piece.type, piece.rotation)) {
            state.piece.moved = true;
        }
        return;
    }

}

//　ホールド

const hold = () => {
    if (state.piece.holdFlag === false) return;

    if (state.game.holdPiece === null) {
        state.game.holdPiece = piece.type;
        piece = spawnPiece();
    } else {
        const box = state.game.holdPiece;

        state.game.holdPiece = piece.type;

        piece = {
            x: config.piece.spawnX,
            y: config.piece.spawnY,
            type: box,
            rotation: 0
        };
    }
    state.piece.holdFlag = false
}


/*==================================================================
  描画
  ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ */

// フィールド描画

const fieldCanvas = document.getElementById('field');
const fieldCtx = fieldCanvas.getContext('2d');

const drawField = () => {
    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < field[y].length; x++) {
            if (field[y][x] !== 0) {
                fieldCtx.fillStyle = colorData.block[field[y][x]];
                fieldCtx.fillRect(x * config.cellSize, y * config.cellSize, config.cellSize, config.cellSize)
                fieldCtx.strokeRect(x * config.cellSize, y * config.cellSize, config.cellSize, config.cellSize)
            }

        }
    }
};

//　グリッド描画
const drawGrid = () => {

    fieldCtx.strokeStyle = colorData.grid;

    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < field[y].length; x++) {

            fieldCtx.strokeRect(x * config.cellSize, y * config.cellSize, config.cellSize, config.cellSize)
        }
    }
}

// ミノ描画
const drawPiece = () => {
    fieldCtx.fillStyle = colorData.block[piece.type];
    fieldCtx.strokeStyle = colorData.piece.stroke;
    const shape = blockData[piece.type][piece.rotation];
    for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x] === 1) {
                fieldCtx.fillRect((piece.x + x) * config.cellSize, (piece.y + y) * config.cellSize, config.cellSize, config.cellSize);
                fieldCtx.strokeRect((piece.x + x) * config.cellSize, (piece.y + y) * config.cellSize, config.cellSize, config.cellSize);
            }
        }
    }
};



// ホールド描画
const holdCanvas = document.getElementById('hold');
const holdCtx = holdCanvas.getContext('2d')

const drawHold = () => {
    if (state.game.holdPiece === null) return;
    holdCtx.clearRect(0, 0, holdCanvas.width, holdCanvas.height);
    holdCtx.fillStyle = colorData.block[state.game.holdPiece]

    const shape = blockData[state.game.holdPiece][0];
    const size = config.hold.cellSize;

    const centerX = (holdCanvas.width - (shape[0].length * size)) / 2;
    const centerY = (holdCanvas.height - (shape.length * size)) / 2;

    const off = offset[state.game.holdPiece];

    for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x] === 1) {

                const nx = centerX + (x + off.x) * size;
                const ny = centerY + (y + off.y) * size;

                holdCtx.fillRect(nx, ny, size, size);
                holdCtx.strokeRect(nx, ny, size, size);
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

                    const nx = centerX + (x + off.x) * size;
                    const ny = centerY + (y + off.y) * size;

                    element.fillRect(nx, ny, size, size);
                    element.strokeRect(nx, ny, size, size)
                }
            };
        }
    })
}

//ゴーストミノ描画

const drawGhost = () => {

    let ghost = {
        x: piece.x,
        y: piece.y,
        type: piece.type,
        rotation: piece.rotation
    }

    while (!collision(ghost.x, ghost.y + 1, piece.type, ghost.rotation)) {
        ghost.y++
    }

    fieldCtx.save();
    fieldCtx.globalAlpha = config.ghost;
    fieldCtx.fillStyle = colorData.block[ghost.type];

    const shape = blockData[ghost.type][ghost.rotation];

    for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x] === 1) {
                fieldCtx.fillRect((ghost.x + x) * config.cellSize, (ghost.y + y) * config.cellSize, config.cellSize, config.cellSize);
                fieldCtx.strokeRect((ghost.x + x) * config.cellSize, (ghost.y + y) * config.cellSize, config.cellSize, config.cellSize);
            }
        }
    }
    fieldCtx.restore();
}

setInterval(() => {
    fieldCtx.clearRect(0, 0, fieldCanvas.width, fieldCanvas.height)
    drawField();
    drawGrid();
    drawPiece();
    drawGhost()
    drawNext();
    drawHold();
}, 16)



//ゲームオーバー

const gameOver = () => {
    if (collision(piece.x, piece.y, piece.type, piece.rotation)) {
        console.log(1)
    }
}


contorole()