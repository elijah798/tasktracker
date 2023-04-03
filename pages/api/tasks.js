import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("TaskTracker");
    

    switch (req.method) {
        case "GET":
            const tasks = await db.collection("tasks").find({}).toArray();
            res.status(200).json(tasks);
            break;
        case "POST":
            const task = req.body;
            const result = await db.collection("tasks").insertOne(task);
            res.status(201).json(result.ops[0]);
            break;
        case "DELETE":
            const id = req.body._id;
            const deleting = await db.collection("tasks").deleteOne({ _id: id });
            res.status(200).json(deleting);
            break;
        default:
            res.status(405).json({ message: "Method not allowed" });
            break;

    }
    }

