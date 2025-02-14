const express = require("express");
const router = express.Router();
module.exports = router;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/users", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      include: { playlists: true },
    });
    if (users) {
      console.log(users);
      res.status(200).json(users);
    } else {
      res.status(200).json("nothing found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// router.get("/users/:id", async (req, res, next) => {
//   const { id } = req.params;
//   console.log(req.user);
//   const includeUsers = req.user ? { where: { userId: req.user.id } } : false;
//   try {
//     const user = await prisma.user.findUnique({
//       where: { id: +id },
//       include: { users: includeUsers },
//     });
//     if (user) {
//       res.json(user);
//     } else {
//       next({ status: 404, message: `User id ${id} not found.` });
//     }
//   } catch (e) {
//     next(e);
//   }
// });

router.get("/users/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: +id },
      include: { playlists: true },
    });
    if (user) {
      res.json(user);
    } else {
      next({ status: 404, message: `User id ${id} not found.` });
    }
  } catch (e) {
    next(e);
  }
});

router.post("/users/:id/playlist", async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const playlist = await prisma.playlist.create({
      data: {
        name,
        description,
        userId: +id,
      },
    });
    res.status(201).json(playlist);
  } catch (e) {
    next(e);
  }
});
