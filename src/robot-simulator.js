class Robot {
  constructor() {
    this.history = [];
  }

  parseArgs(params) {
    const argsArray = params.split(' ');
    const [x, y, facing, movements] = argsArray;
    Object.assign(this, { x: parseInt(x, 10), y: parseInt(y, 10), facing });
    this.history = [[this.x, this.y]];
    this.processMovements(movements.split(''));
  }

  rotate(dir) {
    const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    const directionIndex = directions.indexOf(this.facing);
    const change = dir === 'L' ? -1 : 1;
    let newDirectionIndex = directionIndex + change;
    if (newDirectionIndex < 0) newDirectionIndex = directions.length - 1;
    if (newDirectionIndex >= directions.length) newDirectionIndex = 0;
    this.facing = directions[newDirectionIndex];
  }

  processMovements(movements) {
    movements.forEach((el) => {
      if (el !== 'A') {
        this.rotate(el);
      } else {
        this.step();
      }
    });
  }

  step() {
    switch (this.facing) {
      case 'EAST':
        this.x += 1;
        break;
      case 'WEST':
        this.x -= 1;
        break;
      case 'SOUTH':
        this.y -= 1;
        break;
      default: this.y += 1;
    }
    this.history.push([this.x, this.y]);
  }

  toString() {
    return Object.values(this).join(' ');
  }

  execute(params) {
    this.parseArgs(params);
    return this.toString();
  }
}

module.exports = { Robot };
