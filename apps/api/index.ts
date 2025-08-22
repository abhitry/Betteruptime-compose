import jwt from "jsonwebtoken";
require("dotenv").config();
import express from "express";
import cors from "cors";
const app = express();
import { prismaClient } from "store/client";
import { AuthInput } from "./types";
import { authmiddleware } from "./middleware";

app.use(express.json());
app.use(cors());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.post("/website", authmiddleware, async (req, res) => {
  try {
    if (!req.body.url) {
      res.status(400).json({ error: "URL is required" });
      return;
    }

    const website = await prismaClient.website.create({
      data: {
        url: req.body.url,
        timeAdded: new Date(),
        userId: req.userId!,
      },
    });

    res.json({
      id: website.id,
      url: website.url,
      userId: website.userId,
      timeAdded: website.timeAdded,
    });
  } catch (error) {
    console.error("Error creating website:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/status/:websiteId", authmiddleware, async (req, res) => {
  try {
    const website = await prismaClient.website.findFirst({
      where: {
        id: req.params.websiteId!,
        userId: req.userId!,
      },
      include: {
        ticks: {
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },
      },
    });

    if (!website) {
      res.status(404).json({
        message: "Website not found",
      });
      return;
    }

    res.json({
      url: website.url,
      id: website.id,
      userId: website.userId,
      ticks: website.ticks,
    });
  } catch (error) {
    console.error("Error fetching website status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/user/signup", async (req, res) => {
  try {
    const data = AuthInput.safeParse(req.body);
    if (!data.success) {
      res.status(400).json({ error: "Invalid input data" });
      return;
    }

    const user = await prismaClient.user.create({
      data: {
        username: data.data.username,
        password: data.data.password,
      },
    });

    res.json({
      id: user.id,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(409).json({
      message: "Username already exists",
    });
  }
});

app.post("/user/signin", async (req, res) => {
  try {
    const data = AuthInput.safeParse(req.body);
    if (!data.success) {
      res.status(400).json({ error: "Invalid input data" });
      return;
    }

    const user = await prismaClient.user.findFirst({
      where: {
        username: data.data.username,
      },
    });

    if (!user || user.password !== data.data.password) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      {
        sub: user.id,
      },
      process.env.JWT_SECRET!
    );

    res.json({
      jwt: token,
    });
  } catch (error) {
    console.error("Error signing in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/websites", authmiddleware, async (req, res) => {
  try {
    const websites = await prismaClient.website.findMany({
      where: {
        userId: req.userId,
      },
      include: {
        ticks: {
          orderBy: [
            {
              createdAt: "desc",
            },
          ],
          take: 1,
        },
      },
    });

    res.json({
      websites,
    });
  } catch (error) {
    console.error("Error fetching websites:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});