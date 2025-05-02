import { atom } from "jotai";
import fs from "fs";

const configuration = fs.readFile("appsettings.json", "utf8", (err, data) => {
  JSON.parse(data);
});
const configAtom = atom({});
