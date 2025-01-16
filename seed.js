const { prisma } = require("./common");
const { faker } = require("@faker-js/faker");

const seed = async () => {
  try {
    const userArr = [
      { username: faker.animal.bird() },
      { username: faker.animal.bird() },
      { username: faker.animal.bird() },
    ];
    const user = await prisma.user.createMany({ data: userArr });
    console.log(user);
    const songArr = [
      {
        name: faker.music.songName(),
        description: faker.company.catchPhrase(),
        userId: 1,
      },
      {
        name: faker.music.songName(),
        description: faker.company.catchPhrase(),
        userId: 2,
      },
      {
        name: faker.music.songName(),
        description: faker.company.catchPhrase(),
        userId: 3,
      },
      {
        name: faker.music.songName(),
        description: faker.company.catchPhrase(),
        userId: 1,
      },
      {
        name: faker.music.songName(),
        description: faker.company.catchPhrase(),
        userId: 2,
      },
    ];
    await prisma.playlist.createMany({ data: songArr });
  } catch (error) {
    console.error(error);
  }
};

seed();
