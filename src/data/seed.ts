import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";

const tasksByStatuses = Array.from({ length: 12 }, (_, index) => ({
  date: new Date(`2021-${index + 1}-01`).toLocaleDateString("en-US", {
    month: "short",
  }),
  done: faker.number.int(100),
  pending: faker.number.int(100),
  overdue: faker.number.int(100),
}));

fs.writeFileSync(
  path.join(__dirname, "tasks-by-statuses.json"),
  JSON.stringify(tasksByStatuses, null, 2),
);

fs.writeFileSync(
  path.join(__dirname, "tasks-by-statuses.ts"),
  `export const tasksByStatuses = ${JSON.stringify(tasksByStatuses)};`,
);

const projects = [
  {
    name: "Project 1",
    color: "#F87171",
  },
  {
    name: "Project 2",
    color: "#60A5FA",
  },
  {
    name: "Project 3",
    color: "#34D399",
  },
  {
    name: "Project 4",
    color: "#93C5FD",
  },
  {
    name: "Project 5",
    color: "#FBBF24",
  },
  {
    name: "Project 6",
    color: "#A5B4FC",
  },
];

const tasksByProjects = projects.map((project) => ({
  project: project.name,
  total: faker.number.int(100),
  fill: project.color,
}));

fs.writeFileSync(
  path.join(__dirname, "tasks-by-projects.json"),
  JSON.stringify(tasksByProjects, null, 2),
);

fs.writeFileSync(
  path.join(__dirname, "tasks-by-projects.ts"),
  `export const tasksByProjects = ${JSON.stringify(tasksByProjects)};`,
);

const labels = [
  {
    name: "Bug",
    color: "#F87171",
  },
  {
    name: "Feature",
    color: "#60A5FA",
  },
  {
    name: "Documentation",
    color: "#93C5FD",
  },
  {
    name: "Design",
    color: "#FBBF24",
  },
  {
    name: "Refactor",
    color: "#A5B4FC",
  },
  {
    name: "Tests",
    color: "#6EE7B7",
  },
];

const tasksByLabels = labels.map((label) => ({
  label: label.name,
  total: faker.number.int(100),
  fill: label.color,
}));

fs.writeFileSync(
  path.join(__dirname, "tasks-by-labels.json"),
  JSON.stringify(tasksByLabels, null, 2),
);

fs.writeFileSync(
  path.join(__dirname, "tasks-by-labels.ts"),
  `export const tasksByLabels = ${JSON.stringify(tasksByLabels)};`,
);

console.log("✅ Seed data generated successfully");
