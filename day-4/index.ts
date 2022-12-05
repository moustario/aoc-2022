const parseSectionPair = (section: string[]) => {
  const overlap: number[] = [];
  section.forEach((line) => {
    const [pair1, pair2] = line.split(",");
    const [a1, b1] = pair1.split("-").map((x) => parseInt(x));
    const [a2, b2] = pair2.split("-").map((x) => parseInt(x));
    if (a1 <= a2 && b2 <= b1) {
      overlap.push(1);
    } else if (a2 <= a1 && b1 <= b2) {
      overlap.push(1);
    } else {
      overlap.push(0);
    }
  });
  return overlap;
};

const parseOverlapingSections = (sections: string[]) => {
  const overlaps: number[] = [];
  sections.forEach((line) => {
    const [pair1, pair2] = line.split(",");
    const [a1, b1] = pair1.split("-").map((x) => parseInt(x));
    const [a2, b2] = pair2.split("-").map((x) => parseInt(x));
    if (a1 <= a2 && a2 <= b1 || a1 <= b2 && b2 <= b1) {
      overlaps.push(1);
    } else if (a2 <= a1 && a1 <= b2 || a2 <= b1 && b1 <= b2) {
      overlaps.push(1);
    } else {
      overlaps.push(0);
    }
  });
  return overlaps;
};

const main = (file: string) => {
  //   const subFolder = file.split("/")[1];
  const input = Deno.readTextFileSync(file).split("\n");
  const overlapingSection = parseSectionPair(input);
  const sumOverlaped = overlapingSection.reduce((a, b) => a + b);
  console.log(`Sump of overlaped section: ${sumOverlaped}`);
  const reallyOverlapingSections = parseOverlapingSections(input);
  const sumReallyOverlaped = reallyOverlapingSections.reduce((a, b) => a + b);
  console.log(`Sump of really overlaped section: ${sumReallyOverlaped}`);
};

const inputFile = Deno.args[0];
console.log(`Input file: ${inputFile}`);
main(inputFile);
