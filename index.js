const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
/////////////// connection string //////////////////
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.avnz3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        //client connect
        await client.connect();
        const inventoryCollection = client.db('spices-den-db').collection('inventory-items');

        app.get('/inventory', async (req, res) => {
            const query = {};
            const cursor = inventoryCollection.find(query);
            const inventories = await cursor.toArray();
            res.send(inventories);
        })
        app.get('/inventory/:_id', async (req, res) => {
            const _id = req.params._id;
            const query = { _id: ObjectId(_id) };
            const inventory = await inventoryCollection.findOne(query);


            res.send(inventory);
        })
        app.get('/manageInventory', async (req, res) => {
            const query = {};
            const cursor = inventoryCollection.find(query);
            const AllInventories = await cursor.toArray();
            res.send(AllInventories);
        })
        app.post('/myItems', async (req, res) => {
            const newItem = req.body;
            const result = await inventoryCollection.insertOne(newItem);
            res.send(result);
        })
    }
    finally {

    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('spices den server')
})
// listening //
app.listen(port, () => {
    console.log('hi i am listening');
})