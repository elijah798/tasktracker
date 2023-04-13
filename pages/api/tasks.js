import { getXataClient, tasks } from "../../src/xata";
const xata = getXataClient();

export default async function handler(req, res) {
    
    switch (req.method) {
        case "GET":
                const tasks = await xata.db.tasks.getAll();
                res.status(200).json(tasks);
        case "POST":
            console.log("Creating Task")
            const tasked = req.body;
            console.log(tasked)
            //convert date to datetime
            tasked.DueDate = new Date(tasked.DueDate);
            tasked.Date_Created = new Date();
            tasked.Last_Updated = new Date();
            const task = await xata.db.tasks.create(tasked);
            res.status(200).json(task);
            break;

        case "PUT":
            console.log("Updating Task")
            req.body.Last_Updated = new Date();           
            const updatedTask = await xata.db.tasks.update(req.body.id, req.body);
            res.status(200).json(req.body);
            break;
        case "DELETE":
            console.log("Deleting Task")
            const deletedTask = await xata.db.tasks.delete(req.body.id);
            res.redirect(200,"/dashboard");
            break;
        default:
            res.status(405).end();
            break;
    }

}