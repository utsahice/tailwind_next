import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Check if user already exists
    const [existing] = await pool.query<RowDataPacket[]>("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
    if (existing.length > 0) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into DB
    const [result]: any = await pool.query(
      "INSERT INTO users (name, email, password, role, created_at, updated_at) VALUES (?, ?, ?, 'USER', NOW(), NOW())",
      [name, email, hashedPassword]
    );

    return NextResponse.json({ success: true, userId: result.insertId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
