const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const calendarRouter = require('./src/domains/calendar/calendar.controller');

const admin = require('firebase-admin');
let name = "Stranger";




try {
    const serviceAccount = require('./service-account-key.json'); // Pfad prüfen!

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });

    admin.firestore().settings({
        databaseId: 'transport-manager',
        ignoreUndefinedProperties: true
    });

    const db = admin.firestore();

    app.use((req, res, next) => {
        req.db = db;
        next();
    });
    console.log("Firestore erfolgreich verbunden.");

} catch (error) {
    console.error("FEHLER: Firestore konnte nicht initialisiert werden. ", error.message);
    process.exit(1);
}



app.use(express.json());

app.use('/api/calendar', calendarRouter);


app.get('/', (req, res) => {
    res.send("Hello " + name + "!");
});

app.post('/', (req, res) => {
    if (req.body && req.body.name) {
        name = req.body.name;
    }
    res.send(name + " received!");
});

app.listen(port, () => {
    console.log('Example app listening on port ' + port);
});







//gcloud compute scp --recurse ./second layer instance-20251016-134215:~/ --zone europe-west4-b