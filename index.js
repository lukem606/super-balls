class Ball {
  constructor(originX, originY, rgb) {
    this.posX = originX
    this.posY = originY
    this.distX = Math.round(Math.random() * 20) - 10
    this.distY = Math.round(Math.random() * 20) - 10
    this.size = Math.round(Math.random() * 30)
    this.xy = 1
    this.colour = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.posX, this.posY, this.size, 0, Math.PI * 2)
    ctx.fillStyle = this.colour
    ctx.fill()
    ctx.closePath()
  }

  update() {
    if (Math.random() > 0.95) {
      this.distY = this.distY * -1
    }

    if (Math.random() > 0.95) {
      this.distX = this.distX * -1
    }

    this.posX += this.distX
    this.posY += this.distY
  }
}

class Square {
  constructor(originX, originY, rgb) {
    this.posX = originX
    this.posY = originY
    this.distX = Math.round(Math.random() * 20) - 10
    this.distY = Math.round(Math.random() * 20) - 10
    this.size = Math.round(Math.random() * 30)
    this.xy = 1
    this.colour = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.fillRect(this.posX, this.posY, this.size, this.size)
    ctx.fillStyle = this.colour
    ctx.fill()
    ctx.closePath()
  }
}

class Game {
  constructor(fps, numberOfBalls) {
    this.fps = fps
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.canvas = document.querySelector('.myCanvas')
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.context = this.canvas.getContext('2d')
    this.shapes = this.createShapes(numberOfBalls)
  }

  createShapes(numberOfShapes) {
    const returnArray = []

    for (let i = 0; i < numberOfShapes; i++) {
      if (Math.random() > 0.5) {
        returnArray.push(this.createBall())
      } else {
        returnArray.push(this.createSquare())
      }
    }

    return returnArray
  }

  createBall() {
    return new Ball(
      Math.round(Math.random() * this.width),
      Math.round(Math.random() * this.height),
      this.getRandomBlueColour()
    )
  }

  createSquare() {
    return new Square(
      Math.round(Math.random() * this.width),
      Math.round(Math.random() * this.height),
      this.getRandomGreenColour()
    )
  }

  getRandomBlueColour() {
    const colourVal = Math.random() * 200

    return [colourVal, colourVal, colourVal < 50 ? Math.random() * 255 : 255]
  }

  getRandomGreenColour() {
    const colourVal = Math.random() * 200

    return [colourVal, colourVal < 50 ? Math.random() * 255 : 255, colourVal]
  }

  clearCanvas() {
    this.context.beginPath()
    this.context.fillStyle = 'rgb(0, 0, 0)'
    this.context.fillRect(0, 0, this.width, this.height)
    this.context.closePath()
  }

  update(shape) {
    shape.posX += shape.distX
    shape.posY += shape.distY

    if (
      shape.posX - shape.size / 2 <= 0 ||
      shape.posX + shape.size / 2 >= this.width
    ) {
      shape.distX = shape.distX * -1
    }
    if (
      shape.posY - shape.size / 2 <= 0 ||
      shape.posY + shape.size / 2 >= this.height
    ) {
      shape.distY = shape.distY * -1
    }
  }

  run() {
    this.running = setInterval(() => {
      this.clearCanvas()
      for (let shape of this.shapes) {
        shape.draw(this.context)
        this.update(shape)
      }
    }, 1000 / this.fps)
  }
}

const game = new Game(40, 1000)
game.run()
