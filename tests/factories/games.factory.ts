import { faker } from "@faker-js/faker";
import prisma from "config/database";

async function createGame(consoleId){
    return prisma.game.create({
        data: {
            title: faker.animal.insect(),
            consoleId
        }
    })
}

const gamesFactory = {createGame}

export default gamesFactory