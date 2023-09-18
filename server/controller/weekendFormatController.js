const { raceWeekendModel, sessionModel } = require('../models/raceWeekend.model');
const { UserModel } = require('../models/user.model');

async function createRaceWeekend(req, res) {
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);

    try {
        const { raceWeekend, sessions } = req.body;
        console.log('Received Race Weekend Data:', raceWeekend);
        console.log('Received Sessions Data:', sessions);

        const existingUser = await UserModel.findOne({ _id: raceWeekend.user_id });
        if (!existingUser) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const existingRaceStartDate = await raceWeekendModel.findOne({ race_start_date: raceWeekend.race_start_date });
        const existingRaceEndDate = await raceWeekendModel.findOne({ race_end_date: raceWeekend.race_end_date });

        console.log('Existing Race Start Date:', existingRaceStartDate);
        console.log('Existing Race End Date:', existingRaceEndDate);

        if (existingRaceStartDate || existingRaceEndDate) {
            return res.status(400).json({ message: "Race on the same date's already exists" });
        }

        const savedRaceWeekend = await raceWeekendModel.create(raceWeekend);
        console.log('Saved Race Weekend:', savedRaceWeekend);

        for (const session of sessions) {
            session.race_weekend_id = savedRaceWeekend._id;
            await sessionModel.create(session);
        }

        res.status(201).json({ message: 'Race weekend and sessions created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}


async function checkRaceDates(req, res) {
    try {
        const { raceWeekend } = req.body;

        const existingRaceStartDate = await raceWeekendModel.findOne({ race_start_date: raceWeekend.race_start_date });
        const existingRaceEndDate = await raceWeekendModel.findOne({ race_end_date: raceWeekend.race_end_date });
        if (existingRaceStartDate || existingRaceEndDate) {
            return res.status(400).json({ message: "Race on the same date's already exists" });
        }

        res.status(201).json({ message: 'Good to go!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}

async function getRaceWeekends(req, res) {
    try {
        const raceWeekends = await raceWeekendModel.find();

        const result = [];

        for (const raceWeekend of raceWeekends) {
            const sessions = await sessionModel.find({ race_weekend_id: raceWeekend._id });

            const raceWeekendWithSessions = {
                raceWeekend: raceWeekend.toObject(),
                sessions: sessions.map((session) => session.toObject())
            };
            result.push(raceWeekendWithSessions);
        }

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}

async function getSavedRaceWeekends(req, res) {
    try {
        const raceWeekends = await raceWeekendModel.find({ saved: true });

        const result = [];

        for (const raceWeekend of raceWeekends) {
            const sessions = await sessionModel.find({ race_weekend_id: raceWeekend._id });

            const raceWeekendWithSessions = {
                raceWeekend: raceWeekend.toObject(),
                sessions: sessions.map((session) => session.toObject())
            };
            result.push(raceWeekendWithSessions);
        }

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}

async function updateUsedAndNewTyres(req, res) {
    try {
        const { id, set } = req.body;
        console.log(req.body);
        if (!id) {
            return res.status(400).json({ message: 'Missing id' });
        }

        const filter = { _id: id };

        try {
            set.forEach(async (item, i) => {
                const update = {
                    $set: {
                        [`sets.${i}.used`]: item.used,
                        [`sets.${i}.new`]: item.new,
                    },
                };

                const result = await raceWeekendModel.updateOne(filter, update);
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
        }

        res.status(200).json({ message: 'Tyres details updated successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}

async function deleteRaceWeekend(req, res) {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'Missing id' });
        }

        await raceWeekendModel.deleteOne({ _id: id });
        await sessionModel.deleteMany({ race_weekend_id: id })

        res.status(200).json({ message: "Race weekend deleted successfully" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}



module.exports = { createRaceWeekend, checkRaceDates, getRaceWeekends, getSavedRaceWeekends, updateUsedAndNewTyres, deleteRaceWeekend };
