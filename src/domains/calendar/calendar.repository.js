



async function getAppointmentsByDate(db, startDate, endDate) {
    const termineRef = db.collection('Appointments');

    console.log(`Fetching appointments from ${startDate} to ${endDate}`);

    try {

        const snapshot = await termineRef
            .where('date', '>=', startDate)
            .where('date', '<=', endDate)
            .orderBy('date', 'asc')
            .get();


        if (snapshot.empty) {
            return [];
        }

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function postAppointment(db, appointment) {

const termineRef = db.collection('Appointments');

try {
    if (!appointment.date || !appointment.startTime || !appointment.endTime || !appointment.location || !appointment.clientId) {
        throw new Error('Missing required fields: date, startTime, endTime, location, clientId');
    }

    await termineRef.add(appointment);

    return true;

} catch (err) {
    console.error("Error adding appointment: ", err);
    throw err;
}

}

module.exports = {
    getAppointmentsByDate,
    postAppointment
};