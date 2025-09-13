import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { usersTable } from "../db/schema.ts";
import type { Request, Response } from "express";

const db = drizzle(process.env.DATABASE_URL!);

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.select().from(usersTable);
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });
  
  const token = authHeader.split(" ")[1];
  
  console.log(authHeader);
  console.log(token);
}