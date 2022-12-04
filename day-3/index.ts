import { writeJson } from "https://deno.land/x/jsonfile/mod.ts";

const priorityList = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const getDuplicates = (rucksacks: string[][]) => {
  const duplicate: number[] = [];
  rucksacks.forEach((rucksack) => {
    const [firstCompartment, secondCompartment] = rucksack;
    for (let i = 0; i < firstCompartment.length; i++) {
      for (let j = 0; j < secondCompartment.length; j++) {
        if (firstCompartment[i] === secondCompartment[j]) {
          duplicate.push(priorityList.indexOf(firstCompartment[i]) + 1);
          return;
        }
      }
    }
  });
  return duplicate;
};

const parseRucksacks = (input: string[]) => {
  const rucksacks: string[][] = [];
  input.forEach((line) => {
    const halfLine = line.length / 2;
    const [firstCompartment, secondCompartment] = [
      line.substring(0, halfLine),
      line.substring(halfLine),
    ];
    rucksacks.push([firstCompartment, secondCompartment]);
  });
  return rucksacks;
};

const parseGroups = (input: string[]) => {
  const groups: string[] = [];
  for (let i = 0; i < input.length; i += 3) {
    const noDuplicateSack1 = [...new Set(input[i].split(""))].join("");
    const noDuplicateSack2 = [...new Set(input[i + 1].split(""))].join("");
    const noDuplicateSack3 = [...new Set(input[i + 2].split(""))].join("");
    groups.push(
      noDuplicateSack1 + noDuplicateSack2 + noDuplicateSack3,
    );
  }
  return groups;
};

const count = (str: string, letter: string) => {
  return str.split(letter).length - 1;
};

const main = (file: string) => {
  const subFolder = file.split("/")[1];
  const input = Deno.readTextFileSync(file).split("\n");
  const rucksacks = parseRucksacks(input);
  const duplicates = getDuplicates(rucksacks);
  const duplicatesLetters = duplicates.map((letter) =>
    priorityList[letter - 1]
  );
  const duplicatesDetails = duplicatesLetters.map((letter) => {
    const index = input.findIndex((line) => line.includes(letter));
    return {
      letter,
      index,
      line: input[index],
      priority: duplicates[index],
    };
  });
  writeJson(subFolder + "/" + "duplicatesDetails.txt", duplicatesDetails, {
    spaces: 2,
  });
  const prioritySum = duplicates.reduce((a, b) => a + b, 0);
  console.log("Sum of the priority of duplicates found", prioritySum);

  // Part 2
  const rucksackByGroupNoDuplicate = parseGroups(input);
  writeJson(
    subFolder + "/" + "rucksackByGroup.txt",
    rucksackByGroupNoDuplicate,
    {
      spaces: 2,
    },
  );
  const badgeByGroup = rucksackByGroupNoDuplicate.map((rucksack) => {
    for (let i = 0; i < rucksack.length; i++) {
      if (count(rucksack, rucksack[i]) === 3) {
        return rucksack[i];
      }
    }
  }) as string[];
  writeJson(subFolder + "/" + "badgeByGroup.txt", badgeByGroup, { spaces: 2 });
  const badgePrioritySum = badgeByGroup.map((badge) =>
    priorityList.indexOf(badge) + 1
  ).reduce((a, b) => a + b);
  console.log("Sum of the priority of badges found", badgePrioritySum);
};

const inputFile = Deno.args[0];
console.log(`Input file: ${inputFile}`);
main(inputFile);
