express = require('express');
const router = express.Router();
getAppointmentsByDate = require('./calendar.repository').getAppointmentsByDate;
postAppointment = require('./calendar.repository').postAppointment;

router.get('/', (req, res) => {
  res.send('Hello from Calendar!');
});

router.get('/:startDate/:endDate', (req, res) => {
  const startDate = req.params.startDate;
  const endDate = req.params.endDate;

  getAppointmentsByDate(req.db, startDate, endDate)
    .then(appointments => {
      res.send(appointments);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post('/', (req, res) => {
  const appointmentData = req.body;
  postAppointment(req.db, appointmentData)
    .then(appointment => {
      res.send(appointment);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});


module.exports = router;