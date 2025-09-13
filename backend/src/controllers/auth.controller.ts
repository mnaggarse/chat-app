import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { usersTable } from "../db/schema.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";

const db = drizzle(process.env.DATABASE_URL!);

export const signup = async (req: Request, res: Response) => {
  const { name, username, password } = req.body;

  try {
    const userExist = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username));

    console.log(userExist);

    if (userExist.length != 0) {
      return res.status(404).json({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user: typeof usersTable.$inferInsert = {
      name,
      username,
      password: hashedPassword,
    };
    await db.insert(usersTable).values(user);

    const addedUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username));

    const token = jwt.sign(
      { userId: addedUser[0].id },
      process.env.JWT_SECRET_KEY!,
      {
        expiresIn: "1h",
      },
    );

    res.status(201).json({
      message: "User created successfully",
      user: addedUser[0],
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username));

    if (user.length == 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user[0].password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user[0].id },
      process.env.JWT_SECRET_KEY!,
      {
        expiresIn: "1h",
      },
    );

    res.status(200).json({ message: "Login successfull", user: user[0], token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
