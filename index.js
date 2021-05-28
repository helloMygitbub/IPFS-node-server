/**
 * @description      : 
 * @author           : A.Ramos
 * @group            : 
 * @created          : 26/05/2021 - 12:23:22
 * 
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 26/05/2021
 * - Author          : A.Ramos
 * - Modification    : 
 **/

import express from 'express'
import bodyParser from 'body-parser'
import { NFTStorage } from 'nft.storage'
import fetch from 'node-fetch'

const app = express();
const hostname = '45.77.108.15';
const port = 3000;

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEExNTU1RkE3RDIyRkIwODQxMEUzNGM0N0NGRTI3MThBNEYxNkE4Y0YiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMjA3ODI3NjY2MiwibmFtZSI6IjEifQ.16NfqixgyN0FDzX8hz0-aCtoX5MUIXj5GapqsXeUXNQ'

async function createFile(val) {
    let response = await fetch(val);
    let data = await response.blob();
    return data;
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/cid', (req, res) => {
    const data = req.body;
    const client = new NFTStorage({ token: apiKey });
    var cid;

    const content = createFile(data.url).then(async(file) => {
        cid = await client.storeBlob(file)
        console.log("cid", cid)
    }).then(async() => { await res.send(cid) })
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));