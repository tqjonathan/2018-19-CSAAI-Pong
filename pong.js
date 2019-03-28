function raqueta(posx,posy){
  //-- Posición inicial de la raqueta pasado como parametro desde el main
  this.x_ini = posx;
  this.y_ini = posy;
  //-- Dimensiones de la raqueta
  this.width = 10;
  this.height = 40;
    //-- Coordenadas
  this.x =  0;
  this.y = 0;
  //-- Velocidad
  this.vx = 0;
  this.vy = 0;
  //-- Contexto
  this.ctx = null;
  //-- Inicializar la bola
  this.init = function(ctx) {
    this.ctx = ctx;
    this.reset();
  };
  //-- Dibujar
  this.draw = function () {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(this.x, this.y, this.width, this.height)
  };
  //-- Update
  this.update = function () {
      this.y += this.vy;
  };
  //-- Reset: volver las rquetas a la pos. inicial
  this.reset = function() {
    this.x = this.x_ini;
    this.y = this.y_ini;
  };
}

/////////////////////////////////////////////////////////////////

//-- Definir el objeto BOLA
function pelota(){
  //-- Posición inicial de la pelota (predeterminada)
  this.x_ini = 80,
  this.y_ini = 50,
  //-- Dimensiones de la pelota
  this.width = 5,
  this.height = 5,
  //-- Coordenadas
  this.x = 0,
  this.y = 0,
  //-- Velocidad de movimiento de la pelota
  this.vx = 4,
  this.vy = 1,
  //-- Contexto
  this.ctx = null,
  //-- Inicializar la pelota
  this.init = function(ctx) {
    this.ctx = ctx;
    this.reset();
  },
  //-- Dibujar
  this.draw = function () {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(this.x, this.y, this.width, this.height)
  },
  //-- Update
  this.update = function () {
    this.x += this.vx;
    this.y += this.vy;
  },
  //-- Reset: Set the ball to the initial state
  this.reset = function() {
    this.x = this.x_ini;
    this.y = this.y_ini;
    this.vx = 4;
    this.vy = 1;
  }
}

function contador(){
  this.ctx = null,

  //Valores iniciales a 0
  this.valor1 = 0,
  this.valor2 = 0,

  this.init = function(ctx) {
    this.ctx = ctx;
  },

  this.update1 = function () {
    this.valor1 += 1;
  },

  this.update2 = function () {
    this.valor2 += 1;
  },

  this.draw = function () {
    this.ctx.font = "80px Arial";
    this.ctx.fillStyle = 'white'
    this.ctx.fillText(this.valor1, 220, 70);
    this.ctx.font = "80px Arial";
    this.ctx.fillStyle = 'white'
    this.ctx.fillText(this.valor2, 340, 70);
  }
}

function main()
{
  console.log("Pong: Main: Start!")

  //Campo
  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;
  var ctx = canvas.getContext("2d");

  //Red
  var i = 0;
  while (i<canvas.height){
    ctx.fillStyle = 'white';
    ctx.fillRect(300, i, 1, 10)
    i += 20;
  }

  //Raquetas
  var player1 = new raqueta(50,20);
  var player2 = new raqueta(550,160);

  player1.init(ctx);
  player2.init(ctx);
  player1.draw();
  player2.draw();

  //pelota
  var bola = new pelota();
  bola.init(ctx);
  bola.draw(ctx);

  //Marcador
  var marcador = new contador();
  marcador.init(ctx);
  marcador.draw(ctx);

  var timer = null;
  var sacar = document.getElementById('Sacar');

  sacar.onclick = () => {

      //-- Si la bola ya se está animando,
      //-- no hacer nada
      if (!timer) {

        //-- Lanzar el timer. Su funcion de retrollamada la definimos
        //-- en su primer parámetro
        timer = setInterval(()=>{

          //-- Esto se ejecuta cada 20ms

          //Actualiza elementos
          player1.update();
          player2.update();
          bola.update();

          //-- Borrar el canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          //-- Redibujar elementos
          bola.draw();
          player1.draw();
          player2.draw();
          marcador.draw();

          var i = 0;
          while (i<canvas.height){
            ctx.fillStyle = 'white';
            ctx.fillRect(300, i, 1, 10)
            i += 20;
          }

          if (bola.x > canvas.width) {
            //Actualiza contador (sube puntos a j1)
            marcador.update1();
            //-- Bola a su posicion inicial
            bola.reset();
            //-- Dibujar la bola en pos. inicial
            bola.draw();
          }if (bola.x < 0) {
            //Actualiza contador (sube puntos a j2)
            marcador.update2();
            //-- Bola a su posicion inicial
            bola.reset();
            //-- Dibujar la bola en pos. inicial
            bola.draw();
          };


          //-- Si la bola llega a la parte derecha del canvas:
          //-- Terminar
          if (bola.x > canvas.width) {

            //-- Eliminar el timer
            clearInterval(timer)
            timer = null;

            //-- Bola a su posicion inicial
            bola.reset();

            //-- Dibujar la bola en pos. inicial
            bola.draw();
          }
        },20); //-- timer
      }
    } //-- Fin onclick


}
