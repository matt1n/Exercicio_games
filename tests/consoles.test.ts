import app from "app";
import prisma from "config/database";
import httpStatus from "http-status";
import supertest from "supertest";
import createConsole from "./factories/consoles.factory";

const server = supertest(app)

beforeEach(async ()=> {
  await prisma.game.deleteMany({})
  await prisma.console.deleteMany({})
})

describe("Get /consoles", ()=>{
    it("should respond with status 200", async ()=> {
      const console = await createConsole();
      const response = await server.get("/consoles");
  
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(expect.arrayContaining([console]) )
    })
})

describe("Get /consoles", ()=>{
  it("should respond with status 404 when the console was not exist", async ()=> {
    const response = await server.get(`/consoles/0`);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  })
  it("should respond with status 200", async ()=> {
    const console = await createConsole();
    const response = await server.get(`/consoles/${console.id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(console)
  })
})

describe("Post /consoles", ()=>{
  it("should respond with status 200", async ()=> {
    const console = await createConsole();
    const response = await server.get(`/consoles/${console.id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(console)
  })
})