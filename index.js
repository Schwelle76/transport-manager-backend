const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const calendarRouter = require('./src/domains/calendar/calendar.controller');

let name = "Stranger";




try {

    const admin = require('firebase-admin');

    if (!admin.apps.length) {
        if (process.env.NODE_ENV === 'production') {
            admin.initializeApp({
                credential: admin.credential.applicationDefault(),
            });
        }
        else {
            const serviceAccount = require('./service-account-key.json');
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
        }
    }



    const db = admin.firestore();
    
    db.settings({
        databaseId: 'transport-manager',
        ignoreUndefinedProperties: true
    });

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