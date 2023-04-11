// Generated by Xata Codegen 0.23.2. Please do not edit.
import { buildClient } from "@xata.io/client";
/** @typedef { import('./types').SchemaTables } SchemaTables */
/** @type { SchemaTables } */
const tables = [
  {
    name: "tasks",
    columns: [
      { name: "Description", type: "string" },
      { name: "Status", type: "string" },
      { name: "Severity", type: "string" },
      { name: "Owner", type: "string" },
      { name: "Type", type: "string" },
      { name: "Date_Created", type: "datetime" },
      { name: "Last_Updated", type: "datetime" },
      { name: "Project", type: "link", link: { table: "projects" } },
      { name: "DueDate", type: "datetime" },
    ],
  },
  {
    name: "projects",
    columns: [
      { name: "Project_Title", type: "string" },
      { name: "Project_Description", type: "string" },
      { name: "Created_Date", type: "datetime" },
      { name: "Last_Updated", type: "datetime" },
    ],
  },
];
/** @type { import('../../client/src').ClientConstructor<{}> } */
const DatabaseClient = buildClient();
const defaultOptions = {
  databaseURL:
    "https://Elijah-Sellers-s-workspace-d25an5.us-east-1.xata.sh/db/ProjectTracker",
};
/** @typedef { import('./types').DatabaseSchema } DatabaseSchema */
/** @extends DatabaseClient<DatabaseSchema> */
export class XataClient extends DatabaseClient {
  constructor(options) {
    super({ ...defaultOptions, ...options }, tables);
  }
}
let instance = undefined;
/** @type { () => XataClient } */
export const getXataClient = () => {
  if (instance) return instance;
  instance = new XataClient();
  return instance;
};
