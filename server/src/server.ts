import express from 'express';

const app = express();
const port: number = 3000;

app.get('/', (req, res) => {
    return res.json([
        { hello: "Hello World" },
        { hello: "Hello World" },
        { hello: "Hello World" },
        { hello: "Hello World" },
        { hello: "Hello World" },
        { hello: "Hello World" },
        { hello: "Hello World" }
]);
});

app.listen(port, () => {
    console.log("Aplicação executando na porta", port);
});