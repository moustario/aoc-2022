const shapePoint: { [index: string]: number } = {
  "X": 1,
  "Y": 2,
  "Z": 3,
};

const outcomePoint: { [index: string]: { [index: string]: number } } = {
  "A": {
    "X": 3,
    "Y": 6,
    "Z": 0,
  },
  "B": {
    "X": 0,
    "Y": 3,
    "Z": 6,
  },
  "C": {
    "X": 6,
    "Y": 0,
    "Z": 3,
  },
};

const shapeBasedOnOutcome: { [index: string]: { [index: string]: string } } = {
  "X": {
    "A": "Z",
    "B": "X",
    "C": "Y",
  },
  "Y": {
    "A": "X",
    "B": "Y",
    "C": "Z",
  },
  "Z": {
    "A": "Y",
    "B": "Z",
    "C": "X",
  },
};

const parseStrategy = (gameList: string[]) => {
  const outcome: number[] = [];
  gameList.forEach((game) => {
    const [player1, player2] = game.split(" ");
    outcome.push(shapePoint[player2] + outcomePoint[player1][player2]);
  });
  return outcome;
};

const main = () => {
  const input = Deno.readTextFileSync("./day-2/input.txt").split("\n");
  const predictedScore = parseStrategy(input).reduce((a, b) => a + b);
  console.log(`The predicted score is ${predictedScore}`);

  const actualGameList = input.map((game) => {
    const [player1, outcome] = game.split(" ");
    const actualGame = `${player1} ${shapeBasedOnOutcome[outcome][player1]}`;
    return actualGame;
  });
  const acuratePredictedScore = parseStrategy(actualGameList).reduce((a, b) =>
    a + b
  );
  console.log(`The acurate predicted score is ${acuratePredictedScore}`);
};

main();
