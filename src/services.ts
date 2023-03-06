import fs from "node:fs/promises";
import path from "node:path";

const PATH = path.join(process.cwd(), "users.json");

const readFile = async () => {
  const users = await fs.readFile(PATH);
  return JSON.parse(users.toString());
};

const writeFile = async (data: object) => {
  await fs.writeFile(PATH, JSON.stringify(data));
};

const validateUser = (user: { name: string; age: string }) => {
  const errors = [];
  const { name, age } = user;

  if (!name) errors.push({ name: "this field is required" });
  if (!age) errors.push({ age: "this field is required" });
  if (errors.length) return errors;

  if (name.length < 2)
    errors.push({ name: { min_length: "min length 2 characters" } });
  if (+age <= 0) errors.push({ age: { min_age: "The person shout be born" } });
  return errors;
};

export { readFile, validateUser, writeFile };
