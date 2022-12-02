const parseElves = (input: string[]) => {
  const parsedElves: number[] = [];
  let currentElf: number[] = [];
  input.forEach((calories) => {
    if (calories === "") {
      parsedElves.push(currentElf.reduce((a, b) => a + b));
      currentElf = [];
      return;
    }
    currentElf.push(parseInt(calories));
  });
  return parsedElves;
};

const popTopElf = (allElves: number[]) => {
  const maxCalories = Math.max(...allElves);
  const elfIndex = allElves.indexOf(maxCalories);
  console.log(
    `The elf with the most calories is ${
      elfIndex + 1
    } with ${maxCalories} calories`,
  );

  allElves.splice(elfIndex, 1);
  return maxCalories;
};

const main = () => {
  const input = Deno.readTextFileSync("input.txt").split("\n");
  const allElves = parseElves(input);

  const topElves: number[] = [];
  topElves.push(popTopElf(allElves));
  topElves.push(popTopElf(allElves));
  topElves.push(popTopElf(allElves));

  // log total of top 3 elves
  console.log(
    `The total calories of the top 3 elves is ${
      topElves.reduce((a, b) => a + b)
    }`,
  );
};

main();