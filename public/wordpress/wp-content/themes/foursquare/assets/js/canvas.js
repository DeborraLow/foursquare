/*

Copyright (c) YEAR - Alex Safayan - http://codepen.io/alexsafayan/pen/RowKja

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without restriction,
 including without limitation the rights to use, copy, modify,
merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall
be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.

*/


$(function(){


window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

function between(min, max) {
  return Math.random() * (max - min) + min;
}

var c = document.getElementById('c');
var ctx = c.getContext('2d');
//context and id of canvas

var w = window.innerWidth;
var h = window.innerHeight;
//width and height of canvas

c.width = w;
c.height = h;
$(window).resize(function(event) {
 w = window.innerWidth;
 h = window.innerHeight;
c.width = w;
c.height = h;
});


//setting the width and height for canvas var partNum = (w * h) / 100000;

var partNum = 30;
//particle number - change it!

var mouse = {
  x: w / 2,
  y: h / 2,
  r: 30
};
//mouse position
var mouseY =0
var mouse_b =false
var userAgent = window.navigator.userAgent.toLowerCase();
if (userAgent.indexOf('chrome') != -1) {
mouse_b = true
}

var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
$(document).on(mousewheelevent,function(e){
  var delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);
if(mouse_b ){
    mouseY=delta
}else{
  if(mouseY < 140){
    if (delta < 0){
      mouseY += 70
    } else if (delta > 0){
      mouseY += 70
    }
  }
}
});



document.addEventListener('mousemove', function(e){
    mouse.x = e.clientX || e.pageX;
    mouse.y = e.clientY || e.pageY
}, false);
//finding the mouse position

mouse.r = 25;
var cursorOpacity = 1;
var cursorTrue = false;
var cursorMinDest = 25;
var cursorMinDest = 25;
var cl2 ,cl
document.addEventListener('click', function(){
   clearTimeout(cl);
 clearInterval(cl2);
  cl2 = setInterval(function(){
    mouse.r = 400;
    cursorOpacity = 0.2;
    cursorTrue = true;
    cursorMinDest = 600;

  },1000/60)

  cl = setTimeout(function(){
    clearInterval(cl2);
    mouse.r = 25;
    cursorOpacity = 1;
    cursorTrue = false;
    cursorMinDest = 25;

    },1000)
  }, false);

document.addEventListener('mouseup', function(){
  mouse.r = 25;
  cursorOpacity = 1;
  cursorTrue = false;
  cursorMinDest = 25;
}, false);

// making implode
var f_xy = [[352,165],[352,165],[946,177],[1240,342],[1240,342],[150,342],[150,342],[150,342],[480,590],[480,590],[980,617],[980,617]]
var particles = [];
for(i = 0; i < partNum; i++) {
  particles.push(new particle(i,f_xy));
}



//the particle function
function particle(i,xy) {

  //setting the mouse position to the particle x and y
  this.vx = 0;
  this.vy = 0;
  this.r = 20+(Math.random() * 10);

  // var a = '240,169,121';
  // var o = '192,162,222'; //オレンジ
  // var y = '243,217,166'; //黄色
  // var r = '255,135,137'; //赤い
  // var b = '164,184,237'; //青い
  // var p = '237,141,200'; //紫
  var r = '189, 32, 38';
  var y = '255, 203, 46';
  var b = '0, 85, 149';
  var p = '78, 40, 117';

  // var array = [r, o, y, a, b, p];
  var array = [r, y, b, p];
  // var cnum = Math.floor(Math.random() * 6)
  var cnum = Math.floor(Math.random() * 4)

  this.color = array[cnum];

  if(f_xy.length>i){
    //console.log(c.width-1300)
    this.x =(xy[i][0]+((c.width-1600)/2))+(cnum*this.r)-40//((1+ Math.floor(Math.random()*9)) * (c.width/10))+((cnum*this.r)-40);
    this.y =(xy[i][1]+((c.height-1000)/2))+(cnum*this.r)-40//((1+ Math.floor(Math.random()*9)) * (c.height/10))+((cnum*this.r)-40)//+c.height;
  }else{
    this.x =((1+ Math.floor(Math.random()*9)) * (c.width/10))+((cnum*this.r)-40);
    this.y =((1+ Math.floor(Math.random()*9)) * (c.height/10))+((cnum*this.r)-40)+c.height;
  }


}
//-----------------------------
// CLASS
//-----------------------------

/**
 * Delaunay
 */
var Delaunay = (function() {

    /**
     * Node
     *
     * @param {Number} x
     * @param {Number} y
     * @param {Number} id
     */
    function Node(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = !isNaN(id) && isFinite(id) ? id : null;
    }

    Node.prototype = {
        eq: function(p) {
            var dx = this.x - p.x;
            var dy = this.y - p.y;
            return (dx < 0 ? -dx : dx) < 0.0001 && (dy < 0 ? -dy : dy) < 0.0001;
        },

        toString: function() {
            return '(x: ' + this.x + ', y: ' + this.y + ')';
        }
    };

    /**
     * Edge
     *
     * @param {Node} p0
     * @param {Node} p1
     */
    function Edge(p0, p1) {
        this.nodes = [p0, p1];
    }

    Edge.prototype = {
        eq: function(edge) {
            var na = this.nodes, nb = edge.nodes;
            var na0 = na[0], na1 = na[1], nb0 = nb[0], nb1 = nb[1];
            return (na0.eq(nb0) && na1.eq(nb1)) || (na0.eq(nb1) && na1.eq(nb0));
        }
    };

    /**
     * Triangle
     *
     * @param {Node} p0
     * @param {Node} p1
     * @param {Node} p2
     */
    function Triangle(p0, p1, p2) {
        this.nodes = [p0, p1, p2];
        this.edges = [new Edge(p0, p1), new Edge(p1, p2), new Edge(p2, p0)];
        this._createId();
        this._createCircumscribedCircle();
    }

    Triangle.prototype = {
        id: null, // ノードの組み合わせによる識別子
        _circle: null, // 外接円

        /**
         * ノードの組み合わせによる識別子を作成する
         * 識別子の設定されていないノードがある場合 id は null
         */
        _createId: function() {
            var nodes = this.nodes;
            var id0 = nodes[0].id;
            var id1 = nodes[1].id;
            var id2 = nodes[2].id;
            if (id0 !== null && id1 !== null && id2 !== null) {
                this.id = [id0, id1, id2].sort().join('_');
            }
        },

        /**
         * この三角形の外接円を作成する
         */
        _createCircumscribedCircle: function() {
            var nodes = this.nodes;
            var p0 = nodes[0];
            var p1 = nodes[1];
            var p2 = nodes[2];

            var ax = p1.x - p0.x, ay = p1.y - p0.y;
            var bx = p2.x - p0.x, by = p2.y - p0.y;
            var c = 2 * (ax * by - ay * bx);

            var t = (p1.x * p1.x - p0.x * p0.x + p1.y * p1.y - p0.y * p0.y);
            var u = (p2.x * p2.x - p0.x * p0.x + p2.y * p2.y - p0.y * p0.y);

            if (!this._circle) this._circle = {};

            var circle = this._circle;
            circle.x = ((p2.y - p0.y) * t + (p0.y - p1.y) * u) / c;
            circle.y = ((p0.x - p2.x) * t + (p1.x - p0.x) * u) / c;

            var dx = p0.x - circle.x;
            var dy = p0.y - circle.y;
            circle.radiusSq = dx * dx + dy * dy;
        },

        /**
         * 座標がこの外接円に含まれるか示す
         */
        circleContains: function(p) {
            var circle = this._circle;
            var dx = circle.x - p.x;
            var dy = circle.y - p.y;
            var distSq = dx * dx + dy * dy;

            return distSq < circle.radiusSq;
        }
    };


    /**
     * Delaunay
     *
     * @param {Number} width
     * @param {Number} height
     */
    function Delaunay(width, height) {
        this.width = width;
        this.height = height;
        this._triangles = null;

        this.clear();
    }

    Delaunay.prototype = {
        clear: function() {
            var p0 = new Node(0, 0);
            var p1 = new Node(this.width, 0);
            var p2 = new Node(this.width, this.height);
            var p3 = new Node(0, this.height);

            this._triangles = [
                new Triangle(p0, p1, p2),
                new Triangle(p0, p2, p3)
            ];

            return this;
        },

        multipleInsert: function(m) {
            for (var i = 0, len = m.length; i < len; i++) {
                this.insert(m[i]);
            }

            return this;
        },

        insert: function(p) {
            var triangles = this._triangles;
            var t;
            var temps = [];
            var edges = [];

            var i, ilen;

            for (ilen = triangles.length, i = 0; i < ilen; i++) {
                t = triangles[i];

                // 座標が三角形の外接円に含まれるか調べる
                if (t.circleContains(p)) {
                    // 含まれる場合三角形の辺を保存
                    edges.push(t.edges[0], t.edges[1], t.edges[2]);
                } else {
                    // 含まれない場合は持ち越し
                    temps.push(t);
                }
            }

            var edge;
            var polygon = [];
            var j, jlen;
            var isDuplicate;

            // 辺の重複をチェック, 重複する場合は削除する
            edgesLoop: for (ilen = edges.length, i = 0; i < ilen; i++) {
                edge = edges[i];

                // 辺を比較して重複していれば削除
                for (jlen = polygon.length, j = 0; j < jlen; j++) {
                    if (edge.eq(polygon[j])) {
                        polygon.splice(j, 1);
                        continue edgesLoop;
                    }
                }

                polygon.push(edge);
            }

            for (ilen = polygon.length, i = 0; i < ilen; i++) {
                edge = polygon[i];
                temps.push(new Triangle(edge.nodes[0], edge.nodes[1], p));
            }

            this._triangles = temps;

            return this;
        },

        getTriangles: function() {
            return this._triangles.slice();
        }
    };

    Delaunay.Node = Node;

    return Delaunay;

})();


/**
 * Particle
 *
 * @param {Number} x
 * @param {Number} y
 * @super Delaunay.Node
 */
var Particle = (function(Node) {

    // 生成順に数値の ID を付与する
    var currentId = 0;
    function getId() { return currentId++; }

    function Particle(x, y) {
        Node.call(this, x, y, getId());
        this.vx = 0;
        this.vy = 0;
    }

    Particle.prototype = new Node();

    return Particle;

})(Delaunay.Node);




function draw() {
  requestAnimFrame(draw);


  ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.beginPath();
  ctx.fillStyle = 'rgba(255, 255, 200, 0)';
  ctx.arc(mouse.x, mouse.y, mouse.r, Math.PI * 2, false);
  ctx.fill();



  for(t = 0; t < particles.length; t++) {
    var p = particles[t];

    ctx.beginPath();

  /* グラデーション領域をセット */
  var grad  = ctx.createRadialGradient(p.x, p.y, 0,p.x, p.y, p.r);
  /* グラデーション終点のオフセットと色をセット */
  grad.addColorStop(0,'rgba('+p.color+',0.7)');      // 赤
  grad.addColorStop(1,'rgba('+p.color+',0)');     // 青

    ctx.fillStyle = grad//p.color;
    ctx.arc(p.x, p.y, p.r, Math.PI * 2, false);
    ctx.fill();

    p.x+=p.vx;
    p.y+=p.vy;

    p.vx*=0.95;
    p.vy*=0.95;

    if(p.x < 0 + p.r) {
      p.vx *= -1;
    }

    if(p.y < 0 - p.r) {
      p.y = c.height+(p.r/2);
      p.x = ((1+ Math.floor(Math.random()*9)) * (c.width/10))+((p.r)-40);

    }
    if(p.y > c.height - p.r) {
      p.vy *= -1;
    }
    if(p.x > c.width - p.r) {
      p.vx *= -1;
    }
    if(p.r < 3) {
      p.color = 'white';
    };



    for(j = 0; j < particles.length; j++) {
  		var pp = particles[j];
  		//distance(p, pp);
      distance2(p, pp);
    }
    distance(mouse, p);
  }
  (mouseY>1)?mouseY--:mouseY=1
}

function distance2(p1, p2) {
    var dist,
    dx = p1.x - p2.x,
    dy = p1.y - p2.y;
    p1.y -= (p1.r*0.0003)+Math.abs(mouseY*0.005);
    p1.x -= Math.sin(p1.y*0.1)*p1.r*0.0003;
   dist = Math.sqrt(dx*dx + dy*dy);

}
function distance(p1, p2) {
	var dist,
		dx = p1.x - p2.x,
    dy = p1.y - p2.y;
    if(p1.color==p2.color){
        dist = Math.sqrt(dx*dx + dy*dy);
			}else{
        dist = Math.sqrt(dx*dx - dy*dy);
      }
	// Draw the line when distance is smaller
	// then the minimum distance
  var minDist = p1.r + p2.r;
	if(dist <= minDist) {
		var ax = dx,ay = dy;
    // Some acceleration for the partcles
		// depending upon their distance
		if(cursorTrue) {
      p2.vx += ax/400;
		  p2.vy += ay/400;
    } else {
      p2.vx -= ax/250;
		  p2.vy -= ay/250;
    }
	}
}

draw();

})