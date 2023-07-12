//q:如何修改代码以达到飘落不同的花瓣？
let stop, staticx;
var SakuraImg1 = new Image();
var SakuraImg2 = new Image();
SakuraImg1.src = "https://hsuqnian.top/sakura1.png";
SakuraImg2.src = "https://hsuqnian.top/sakura2.png";
function IsPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod",
  ];
  var flagPc = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flagPc = false;
      break;
    }
  }
  return flagPc;
}
function Sakura(x, y, s, r, fn) {
  this.x = x;
  this.y = y;
  this.s = s;
  this.r = r;
  this.fn = fn;
}
Sakura.prototype.draw = function (cxt, img) {
  cxt.save();
  cxt.translate(this.x, this.y);
  cxt.rotate(this.r);
  cxt.drawImage(img, 0, 0, 18 * this.s, 18 * this.s);
  cxt.restore();
};
Sakura.prototype.update = function () {
  this.x = this.fn.x(this.x, this.y);
  this.y = this.fn.y(this.y, this.y);
  this.r = this.fn.r(this.r);
  if (
    this.x > window.innerWidth ||
    this.x < 0 ||
    this.y > window.innerHeight ||
    this.y < 0
  ) {
    this.r = getRandom("fnr");
    if (Math.random() > 0.4) {
      this.x = getRandom("x");
      this.y = 0;
      this.s = getRandom("s");
      this.r = getRandom("r");
    } else {
      this.x = window.innerWidth;
      this.y = getRandom("y");
      this.s = getRandom("s");
      this.r = getRandom("r");
    }
  }
};
SakuraList = function () {
  this.list = [];
};
SakuraList.prototype.push = function (sakura) {
  this.list.push(sakura);
};
SakuraList.prototype.update = function () {
  for (let i = 0, len = this.list.length; i < len; i++) {
    this.list[i].update();
  }
};
SakuraList.prototype.draw = function (cxt) {
  for (let i = 0, len = this.list.length; i < len; i++) {
    this.list[i].draw(cxt);
  }
};
SakuraList.prototype.get = function (i) {
  return this.list[i];
};
SakuraList.prototype.size = function () {
  return this.list.length;
};

function getRandom(option) {
  let ret, random;
  switch (option) {
    case "x":
      ret = Math.random() * window.innerWidth;
      break;
    case "y":
      ret = Math.random() * window.innerHeight;
      break;
    case "s":
      ret = Math.random();
      break;
    case "r":
      ret = Math.random() * 4;
      break;
    //q：我应该修改哪个参数以减慢动画速率？
    //a：修改这里的random值
    case "fnx":
      random = -1.2 + Math.random() * 0.02;
      ret = function (x, y) {
        return IsPC() ? x + 0.4 * random - 0.4 : x + 0.2 * random - 0.2;
      };
      break;
    //q:这是用来干嘛的？
    //a:这是用来控制花瓣下落速度的

    case "fny":
      random = 1.2 + Math.random() * 0.02;
      ret = function (x, y) {
        return y + random;
      };
      break;

    //a:这是用来控制花瓣旋转的
    case "fnr":
      random = Math.random() * 0.04;
      ret = function (r) {
        return r + random;
      };
      break;
  }
  return ret;
}

function startSakura() {
  requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame;
  let canvas = document.createElement("canvas"),
    cxt;
  staticx = true;
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  canvas.setAttribute(
    "style",
    "position: fixed;left: 0;top: 0;pointer-events: none;z-index:1002"
  );
  canvas.setAttribute("id", "canvas_sakura");
  document.getElementsByTagName("body")[0].appendChild(canvas);
  cxt = canvas.getContext("2d");
  let sakuraList = new SakuraList();
  for (let i = 0; i < (IsPC() ? 48 : 24); i++) {
    let sakura, randomX, randomY, randomS, randomR, randomFnx, randomFny;
    randomX = getRandom("x");
    randomY = getRandom("y");
    randomR = getRandom("r");
    randomS = getRandom("s");
    randomFnx = getRandom("fnx");
    randomFny = getRandom("fny");
    randomFnR = getRandom("fnr");
    sakura = new Sakura(randomX, randomY, randomS, randomR, {
      x: randomFnx,
      y: randomFny,
      r: randomFnR,
    });
    console.log(SakuraImg1, SakuraImg2);
    sakura.draw(cxt, i % 2 == 0 ? SakuraImg1 : SakuraImg2);
    sakuraList.push(sakura);
  }
  stop = requestAnimationFrame(function () {
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    sakuraList.update();
    sakuraList.draw(cxt);
    stop = requestAnimationFrame(arguments.callee);
  });
}
window.onresize = function () {
  let canvasSakura = document.getElementById("canvas_sakura");
  canvasSakura.width = window.innerWidth;
  canvasSakura.height = window.innerHeight;
};
