import app from "app";
import prisma from "config/database";
import httpStatus from "http-status";
import supertest from "supertest";
import createConsole from "./factories/consoles.factory";
import gamesFactory from "./factories/games.factory";

const server = supertest(app);
beforeEach(async ()=> {
  await prisma.game.deleteMany({})
  await prisma.console.deleteMany({})
})

describe("Get /games", ()=>{
  it("should respond with status 200", async ()=> {
    const console = await createConsole();
    await gamesFactory.createGame(console.id);
    const response = await server.get("/games");

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
         id: expect.any(Number),
         title: expect.any(String),
         consoleId: expect.any(Number),
         Console: expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
         })
      })
    ]))
  });
});
describe("Get /games/:id", ()=>{
  it("should respond with status 404 when the game doesn't exist", async ()=> {
    const response = await server.get("/games/0");
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });
  it("should respond with status 200 when the game", async ()=> {
    const console = await createConsole();
    const game = await gamesFactory.createGame(console.id);
    const response = await server.get(`/games/${game.id}`);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
         id: expect.any(Number),
         title: expect.any(String),
         consoleId: expect.any(Number),
      })
    )
  });
})
describe("Post /games", ()=>{
  it("should respond with status 200 when the game was created", async ()=> {
    const console = await createConsole()
    const game = await gamesFactory.createGame(console.id)
    const response = await server.get(`/games/${game.id}`)
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(expect.objectContaining(game))
  });
})