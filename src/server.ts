import { app } from "./app";

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Express server listening on 0.0.0.0:${port}`);
});
