const { prisma } = require("./index");
const { faker } = require("@faker-js/faker");

// const seed = async () => {
//   try {
//     const userArr = [
//       { username: faker.animal.bird() },
//       { username: faker.animal.bird() },
//       { username: faker.animal.bird() },
//     ];
//     const user = await prisma.user.createMany({ data: userArr });
//     console.log(user);
//     const songArr = [
//       {
//         name: faker.music.songName(),
//         description: faker.company.catchPhrase(),
//         userId: 1,
//       },
//       {
//         name: faker.music.songName(),
//         description: faker.company.catchPhrase(),
//         userId: 2,
//       },
//       {
//         name: faker.music.songName(),
//         description: faker.company.catchPhrase(),
//         userId: 3,
//       },
//       {
//         name: faker.music.songName(),
//         description: faker.company.catchPhrase(),
//         userId: 1,
//       },
//       {
//         name: faker.music.songName(),
//         description: faker.company.catchPhrase(),
//         userId: 2,
//       },
//     ];
//     await prisma.playlist.createMany({ data: songArr });
//   } catch (error) {
//     console.error(error);
//   }
// };
//restraunt= users
//reservations=playlist
// seed();

const seed = async () => {
  for (let i = 0; i < 3; i++) {
    const usersWithPlaylist = await prisma.user.create({
      data: {
        username: `User ${i + 1}`,
      },
    });
    const playList = [];
    for (let j = 0; j < 5; j++) {
      playList.push({
        userId: i + 1,
        name: `Playlist ${i}${j}`,
        description: `${i}${j}@foo.bar`,
      });
    }
    const playListCreated = await prisma.playlist.createMany({
      data: playList,
    });

    //   console.log(usersWithPlaylist);
    //   console.log(playListCreated);
  }
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
