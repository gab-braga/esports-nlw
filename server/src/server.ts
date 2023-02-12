import express from 'express';
import { PrismaClient } from '@prisma/client';
import { convertHoursStringToMinutes } from './utils/convertHoursStringToMinutes';
import { convertMinutesToHoursString } from './utils/convertMinutesToHoursString';
import cors from 'cors';

const app = express();
const port: number = 3000;
const prisma = new PrismaClient();

// app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

// HTTP methods / API RESTful / HTTP Codes

app.get('/', (req, res) => {
    return res.status(200).json([
        { hello: "Hello World!" }
    ]);
});

app.get('/games', async (req, res) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: { ads: true}
            }
        }
    });
    return res.status(200).json(games);
});

app.post('/games/:id/ads', async (req, res) => {
    const gameId = req.params.id;
    const data = req.body;
    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: data.name,
            yearPlaying: data.yearPlaying,
            discord: data.discord,
            weekDays: data.weekDays.join(','),
            hourStart: convertHoursStringToMinutes(data.hourStart),
            hourEnd: convertHoursStringToMinutes(data.hourEnd),
            useVoiceChannel: data.useVoiceChannel
        }
    })
    return res.status(201).json(ad);
});

app.get('/games/:id/ads', async (req, res) => {
    const gameId = req.params.id;
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearPlaying: true,
            hourStart: true,
            hourEnd: true
        },
        where: { gameId },
        orderBy: { createdAt: 'desc' }
    });
    return res.status(200).json(ads.map((ad: any) => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHoursString(ad.hourStart),
            hourEnd: convertMinutesToHoursString(ad.hourEnd)
        }
    }));
});

app.get('/ads/:id/discord', async (req, res) => {
    const adId = req.params.id;
    try {
        const ad = await prisma.ad.findUniqueOrThrow({
            select: {
                discord: true
            },
            where: {
                id: adId
            }
        });
        return res.status(200).json(ad);
    }
    catch(error) {
        return res.status(400).json(error);
    }
});

app.listen(port, () => {
    console.log("Aplicação executando na porta", port);
});