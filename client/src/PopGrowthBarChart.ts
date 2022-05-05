import { addBarGraph } from "./BarGraph";

const data2021 = [
  {
    region: "Northeast",
    population: 57159838,
    growth: 17.2,
  },
  {
    region: "Midwest",
    population: 68841444,
    growth: 20.7,
  },
  {
    region: "West",
    population: 78667134,
    growth: 38.3,
  },
  {
    region: "South",
    population: 127235329,
    growth: 38.3,
  },
];

const data2020 = [
  {
    region: "Northeast",
    population: 57525633,
    growth: 17.4,
  },
  {
    region: "Midwest",
    population: 68935174,
    growth: 20.8,
  },
  {
    region: "West",
    population: 7863266,
    growth: 23.7,
  },
  {
    region: "South",
    population: 126409007,
    growth: 38.1,
  },
];

const scene = document.querySelector("a-scene")!;

const maxPopulation2021 = Math.max(...data2021.map((d) => d.population));
const maxPopulation2020 = Math.max(...data2020.map((d) => d.population));
const maxGrowth2021 = Math.max(...data2021.map((d) => d.growth));
const maxGrowth2020 = Math.max(...data2020.map((d) => d.growth));

let i = 0;
i = 0;
for (const region of data2021) {
  addBarGraph(scene, `${region.region} 2021`, region.growth, 100, "green", {
    x: -10 + i * 2.5,
    y: 0,
    z: -12,
  });
  i += 1;
}

i = 0;
for (const region of data2021) {
  addBarGraph(
    scene,
    `${region.region} 2021`,
    region.population,
    maxPopulation2021,
    "red",
    { x: -10 + i * 2.5, y: 0, z: -15 }
  );
  i += 1;
}

i = 0;
for (const region of data2020) {
  addBarGraph(
    scene,
    `${region.region} 2020`,
    region.population,
    maxPopulation2020,
    "red",
    { x: 0 + i * 2.5, y: 0, z: -15 }
  );
  i += 1;
}

i = 0;
for (const region of data2020) {
  addBarGraph(scene, `${region.region} 2020`, region.growth, 100, "green", {
    x: 0 + i * 2.5,
    y: 0,
    z: -12,
  });
  i += 1;
}
