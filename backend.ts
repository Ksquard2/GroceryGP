import express from 'express';
import { CosmosClient } from '@azure/cosomos';
import cors from 'cors';

const app = express();
const port = 3000;

const endpoint = "https://ahmedkk2.documents.azure.com:443/"
const key = "tUnavcUg7DXEQWN4z6bAjC27i6w4kLtTl8kTkzPy30ngrIIuu9UD08gS1RXzrAtxdR1i51JdXwRQACDb7jI2SQ=="
const databaseId = 'cosmicworks';
const contaierId = 'Inventory';

app.use(cors());

const client = new CosmosClient({endpoint, key})

app.get('/data', async (req,res) =>{
    try{
        const container = client.database(databaseId).container(contaierId)
        const { resources: items } = await container.items.readAll().fetchAll();
        res.json(items);
    } catch(err){
        console.log(err);
        res.status(500).send("error fetching data");
    }
});

app.listen(port,'172.20.2.9',() => {
    console.log(`server is runnning locally on https://172.20.2.9:${port}`)
})