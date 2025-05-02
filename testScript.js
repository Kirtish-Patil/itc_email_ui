import { dummyEmails } from "./testEmails.js";
import fs from "fs";

fs.writeFile(
  "./testEmails.json",
  JSON.stringify(dummyEmails, null, 1),
  {},
  () => {}
);
