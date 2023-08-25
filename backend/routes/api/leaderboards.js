const express = require('express')
const router = express.Router()

const { Player, Guild, sequelize, KillDeath, Kill, Death } = require('../../db/models');
const { Op } = require('sequelize');

router.use('/', require('../../utils/pagination'))

router.get('/', async (req, res) => {
    console.log('qeury params:', res.locals.query)

    const players = await Player.findAll({
        order: [
            ['points', 'DESC']
        ],
        limit: res.locals.query.limit,
        offset: res.locals.query.offset,
        attributes: {
            exclude: [
                'createdAt',
                'updatedAt',
                'guildId',
                'guildRank'
            ]
        }
    })

    const guilds = await Player.findAll({
        where: {
            guildId: {
                [Op.ne]: null
            }
        },
        include: [
            {
                model: Guild,
            }
        ],
        attributes: {
            include: [
                [sequelize.fn('AVG', sequelize.col('points')), 'avgPoints'],
            ]
        },
        group: 'guildId',
        order: [[sequelize.fn('AVG', sequelize.col('points')), 'DESC']],
        limit: res.locals.query.limit,
        offset: res.locals.query.offset
    })

    res.json({
        totalPlayers: await Player.count(),
        totalGuilds: await Guild.count(),
        players: players,
        guilds: guilds
    })
})

// Get Top 10 Players and Top 10 Guilds
router.get('/top', async (req, res) => {
    const players = await Player.findAll({
        order: [
            ['points', 'DESC']
        ],
        limit: 10
    })

    const guilds = await Player.findAll({
        include: [
            {
                model: Guild,
                // attributes: [
                //     'id',
                //     'name'
                // ]
            }
        ],
        attributes: {
            include: [
                [sequelize.fn('AVG', sequelize.col('points')), 'avgPoints'],
            ]
        },
        group: 'guildId',
        order: [[sequelize.fn('AVG', sequelize.col('points')), 'DESC']],
        limit: 10
    })

    res.json({
        players: players,
        guilds: guilds
    })
})

router.get('/search/:name', async (req, res) => {
    const player = await Player.findOne({
        where: {
            nickname: req.params.name
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'guildId']
        },
        include: {
            model: Guild,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
        }
    })

    let playerPos
    if (player) {
        playerPos = await Player.count({
            where: {
                points: {
                    [Op.gte]: player.points
                }
            }
        })
    }

    if (player === null) {
        const guild = await Guild.findOne({
            where: {
                name: req.params.name
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: {
                model: Player,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'guildId']
                }
            }
        })
        if (guild === null) {
            res.json({
                error: 'not-found',
                message: 'Gracz lub Gildia z taką nazwą nie istnieje'
            })
            return
        }

        const guildAvg = await Guild.findByPk(guild.id, {
            include: {
                model: Player,
                attributes: []
            },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('points')), 'avgPoints']
            ]
        })

        // console.log("GUILD", guild.dataValues.Players)
        const guildPlayers = []
        const guildLeaders = []
        const guildvLeaders = []
        const guildMasters = []

        guild.dataValues.Players.forEach((ele) => {
            switch (ele.dataValues.guildRank) {
                case 'leader': {
                    guildLeaders.push(ele.dataValues)
                    break
                }
                case 'vleader': {
                    guildvLeaders.push(ele.dataValues)
                    break
                }
                case 'master': {
                    guildMasters.push(ele.dataValues)
                    break
                }
                case 'player': {
                    guildPlayers.push(ele.dataValues)
                    break
                }
            }
            // console.log('ele--------------', ele.dataValues)
        })

        const guildPlace = await sequelize.query(`SELECT COUNT(*) as guildPlace FROM (
            SELECT *, AVG(points) as avgPoints FROM Guilds
                JOIN (Players) ON (Players.guildId = Guilds.id)
                GROUP BY guildId
                HAVING avgPoints >= ${guildAvg.dataValues.avgPoints}
                ORDER BY avgPoints DESC
            )`);

        res.json({
            isPlayer: false,
            leaderboardPos: guildPlace[0][0].guildPlace,
            ...guild.dataValues,
            Players: guildPlayers,
            Leaders: guildLeaders,
            vLeaders: guildvLeaders,
            Masters: guildMasters,
            guildAvg: guildAvg.dataValues.avgPoints
        })
        return
    }

    res.json({
        isPlayer: true,
        leaderboardPos: playerPos,
        ...player.dataValues
    })
})

// get player with ceratin id kills
router.get('/players/:id/kills', async (req, res) => {
    // const stats = await Player.findOne({
    //     where: {
    //         id: req.params.id
    //     },
    //     include: {
    //         model: Kill,
    //         include: {
    //             model: Player,
    //             attributes: {
    //                 exclude: [
    //                     'createdAt',
    //                     'updatedAt',
    //                     'guildRank',
    //                     'guildId'
    //                 ]
    //             },
    //         },
    //     },
    //     attributes: {
    //         exclude: [
    //             'createdAt',
    //             'updatedAt',
    //             'guildRank',
    //             'guildId'
    //         ]
    //     },
    //     order: [
    //         [Kill, 'createdAt', 'DESC']
    //     ],
    //     limit: 24
    // })
    const stats = await Kill.findAll({
        where: {
            killerId: req.params.id
        },
        include: {
            model: Player,
            attributes: {
                exclude: [
                    'createdAt',
                    'updatedAt',
                    'guildId',
                    'guildRank'
                ]
            }
        },
        order: [['createdAt', 'DESC']],
        limit: 24
    })

    // console.log(stats)

    res.json(stats)
})

router.get('/players/:id/deaths', async (req, res) => {
    // const stats = await Player.findOne({
    //     where: {
    //         id: req.params.id
    //     },
    //     include: {
    //         model: Death,
    //         include: {
    //             model: Player,
    //             attributes: {
    //                 exclude: [
    //                     'createdAt',
    //                     'updatedAt',
    //                     'guildRank',
    //                     'guildId'
    //                 ]
    //             },
    //         },
    //     },
    //     attributes: {
    //         exclude: [
    //             'createdAt',
    //             'updatedAt',
    //             'guildRank',
    //             'guildId'
    //         ]
    //     },
    //     order: [
    //         [Death, 'createdAt', 'DESC']
    //     ],
    //     limit: 24
    // })
    const stats = await Death.findAll({
        where: {
            deaderId: req.params.id
        },
        include: {
            model: Player,
            attributes: {
                exclude: [
                    'createdAt',
                    'updatedAt',
                    'guildId',
                    'guildRank'
                ]
            }
        },
        order: [['createdAt', 'DESC']],
        limit: 24
    })

    // console.log(stats)

    res.json(stats)
})

router.get('/guilds/:id/kills', async (req, res) => {
    const stats = await sequelize.query(`SELECT Kills.id, Kills.createdAt, Kills.pointsGained, Players.nickname FROM Kills JOIN Players ON Players.id = deaderId WHERE killerId IN (SELECT Players.id FROM Players JOIN Guilds ON Players.guildId = Guilds.id WHERE guildId = ${req.params.id}) ORDER BY Kills.createdAt DESC LIMIT 24;`)

    res.json(stats[0])
})

router.get('/guilds/:id/deaths', async (req, res) => {
    const stats = await sequelize.query(`SELECT Deaths.id, Deaths.createdAt, Deaths.pointsLost, Players.nickname FROM Deaths JOIN Players ON Players.id = killerId WHERE killerId IN (SELECT Players.id FROM Players JOIN Guilds ON Players.guildId = Guilds.id WHERE guildId = ${req.params.id}) ORDER BY Deaths.createdAt DESC LIMIT 24;`)

    res.json(stats[0])
})

// router.get('/guildpos', async (req, res) => {

//     const [results, metadata] = await sequelize.query(`SELECT COUNT(*) as guildPlace FROM (
//         SELECT *, AVG(points) as avgPoints FROM Guilds
//             JOIN (Players) ON (Players.guildId = Guilds.id)
//             GROUP BY guildId
//             HAVING avgPoints > 2300
//             ORDER BY avgPoints DESC
// )`);



//     res.json(results)
// })

module.exports = router;
