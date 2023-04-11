import { getXataClient, tasks } from "../../src/xata";
const xata = getXataClient();

export default async function handler(req, res) {
    
    switch (req.method) {
        case "GET":
                const tasks = await xata.db.tasks.getAll();
                res.status(200).json(tasks);
        case "POST":
            const task = await xata.db.tasks.create(req.body);
            res.status(200).json(task);
            break;
        default:
            res.status(405).end();
            break;
    }

}