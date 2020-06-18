'use strict';
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  clrfDelay: Infinity
});

const SQUARE_LENGTH = 5;
let directions: Array<String> = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
let isPlaced: boolean = false;
let currentDirection: String = '';
let currentX: number, currentY: number;

function formatString(str: String) {
  return str.trim().toUpperCase();
}

function setPositionAndDirection(x: number, y: number, direction: String) {
  currentX = x;
  currentY = y;
  currentDirection = direction;
}

function moveForward(direction: String) {
  switch (direction) {
    case 'NORTH':
      if (currentY >= 5) break;
      else currentY++;
      break;
    case 'EAST':
      if (currentX >= 5) break;
      currentX++;
      break;
    case 'SOUTH':
      if (currentY === 0) break;
      currentY--;
      break;
    case 'WEST':
      if (currentX === 0) break;
      currentX--;
      break;
  }
}

rl.on('line', (line: any) => {
  const command = formatString(line.split(' ')[0]);

  switch (command) {
    case 'PLACE':
      const posDirString = line.split(' ')[1].split(',');
      let x = parseInt(posDirString[0]);
      let y = parseInt(posDirString[1]);
      let direction = formatString(posDirString[2]);

      if (x >= 0 && x <= SQUARE_LENGTH && y >= 0 && y <= SQUARE_LENGTH && directions.includes(direction)) { // valid
        setPositionAndDirection(x, y, direction);
        isPlaced = true;
      }
      // else {
      //   console.log('Invalid position and/or direction.');
      // }
      break;
    case 'MOVE':
      if (isPlaced) {
        moveForward(currentDirection);
      }
      break;
    case 'LEFT':
      if (isPlaced) {
        let index = directions.findIndex((dir) => dir === currentDirection);
        currentDirection = index ? directions[index-1] : directions[directions.length-1];
      }
      break;
    case 'RIGHT':
      if (isPlaced) {
        let index = directions.findIndex((dir) => dir === currentDirection);
        currentDirection = (index === directions.length-1) ? directions[0] : directions[index+1];
      }
      break;
    case 'REPORT':
      if (isPlaced) {
        console.log(`Output: ${currentX},${currentY},${currentDirection}`);
        isPlaced = false;
      }
      break;
    default:
      // console.log(`Valid commands available: [PLACE, MOVE, LEFT, RIGHT, REPORT]`);
      break;
  }
});