let shape = 'square'; // 'circle';
let inRow = 100;
let boxSize = 5;
let padding = 0;
let myp5 = null;
let r = 0;
let g = 0;
let b = 0;
let frameRate = 5;

const s = ( p ) => {
  const _inRow = inRow;
  const _boxSize = boxSize;
  const _padding = padding;
  const _frameRate = frameRate;

  const bLength = (_boxSize * _inRow) + (_padding * (_inRow - 1));
  const boardSize = { x: bLength, y: bLength };
  const elNumber = _inRow * _inRow;

  p.setup = () => {
    p.createCanvas(boardSize.x, boardSize.y);
    p.frameRate(_frameRate);
  }
  
  p.draw = () => {
    p.background('#000');
    let xP = 0; // shape === 'circle' ? _boxSize / 2 : 0;
    let yP = 0; // shape === 'circle' ? _boxSize / 2 : 0;
    let numberInRow = 0;
    for (let i = 0; i < elNumber; i++) {
        let _r = r || p.random(0, 255);
        let _g = g || p.random(0, 255);
        let _b = b || p.random(0, 255);
        let bg = p.color(_r, _g, _b);
        xP = (_padding * (i - numberInRow)) + (_boxSize * (i - numberInRow));
        if (xP >= (boardSize.x)) {
          numberInRow = i;
          xP = 0;
          yP += _padding + _boxSize;
        }
        // if (shape === 'circle') {
        //   xP += _boxSize / 2
        // }
        p.fill(bg);
        p.noStroke();
        p[shape](xP, yP, _boxSize);
    }
  }
}

var app = new Vue({
  el: '#app',
  data: {
    inRow: inRow,
    boxSize: boxSize,
    padding: padding,
    r: r,
    g: g,
    b: b,
    frameRate: frameRate
  },
  created () {
    myp5 = new p5(s, 'myContainer');
  },
  methods: {
    onKey(e) {
      const key = e.key;
      const {id, value} = e.target;

      switch (id) {
        case 'inRow':
          inRow = +value;
          break;
        case 'boxSize':
          boxSize = +value;
          break;
        case 'padding':
          padding = +value;
          break;
        case 'r':
          r = +value;
          break;
        case 'g':
          g = +value;
          break;
        case 'b':
          b = +value;
          break;
        case 'frameRate':
          frameRate = +value;
          break;
      }
      
      if (/\d+|Backspace/.test(key)) {
        myp5.remove();
        myp5 = new p5(s, 'myContainer');
      }
    }
  }
})