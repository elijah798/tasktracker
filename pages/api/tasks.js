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

        case "PUT":
            console.log("Updating Task")           
            const updatedTask = await xata.db.tasks.update(req.body.id, req.body);
            res.status(200).json(req.body);
            break;
        case "DELETE":
            console.log("Deleting Task")
            const deletedTask = await xata.db.tasks.delete(req.body.id);
            res.status(200).json(req.body);
            break;
        default:
            res.status(405).end();
            break;
    }

}