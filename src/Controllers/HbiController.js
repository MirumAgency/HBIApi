const { users, report, modules } = require('../Database/dbHbi');
const { genRanHex } = require('../Config/generateToken');

const insertUser = async (req, res) => {
    const { name, idLearner } = req.body;
    if (!name) return res.status(403).json({ message: 'The name is required' });
    if (!idLearner) return res.status(403).json({ message: 'The idLearner is required' });
    try {
        const tokenGenerate = genRanHex(6);

        const user = await users.findOne({
            where: { idLearner },
        });
        if (user) {
            const updateUser = await users.update({
                token: tokenGenerate
            }, {
                where: {
                    idLearner: idLearner
                }
            });
        } else {
            await users.create({
                name,
                idLearner,
                token: tokenGenerate,
            });
        }
        res.status(200).json({ token: tokenGenerate });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err });
    }
}

const completionModule = async (req, res) => {
    try {
        const { name, code } = req.body;
        const module = await modules.create({
            name,
            code,
        });
        res.status(200).json({ response: module });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

const loginUser = async (req, res) => {
    try {
        const { token } = req.body;
        const user = await users.findOne({
            where: {
                token: token
            },
            attributes: ['idUser', 'idLearner', 'name'],
        })
        if (user) {
            await users.update({
                token: ''
            }, {
                where: {
                    token: token
                }
            });

            res.status(200).json({ message: 'success', user: user });
        } else {
            res.status(403).json({ message: 'You token is invalid' });
        }

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

const insertReport = async (req, res) => {
    try {
        const { date, result, idUser, idModule } = req.body;
        const user = await users.findByPk(idUser);
        if (!user) return res.json('The user do not exist');
        const module = await modules.findByPk(idModule);
        if (!module) return res.json('The module do not exist');
        const reportUser = await report.create({
            date: date,
            result: result,
            userIdUser: idUser,
            moduleIdModule: idModule,
        });


        res.status(200).json({ response: reportUser });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}
const getReport = async (req, res) => {
    try {
        const { idLearner, idModule } = req.params;

        const reportUser = await users.findOne({
            where: {
                idLearner: idLearner
            },
            attributes: [],
            include: [{
                model: report,
                where: {
                    moduleIdModule: idModule
                }
            }]
        })
        res.status(200).json(reportUser);
    } catch (err) {
        res.status(500).json({ error: err });
    };
};

const getReportsByUser = async (req, res) => {
    try {
        const { idLearner } = req.params;
        const reports = await users.findAll({
            where: {
                idLearner: idLearner
            },
            include: [{
                model: report,
                attributes: ['userIdUser', 'result', 'date', 'moduleIdModule'],
            }],
            attributes: ['name', 'idLearner'],
        });
        res.status(200).json(reports);
    } catch (err) {
        res.status(500).json({ error: err });
    };
};

module.exports = {
    insertUser,
    completionModule,
    loginUser,
    insertReport,
    getReport,
    getReportsByUser
}