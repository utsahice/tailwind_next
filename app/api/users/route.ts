import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface User {
    id: string;
    name: string;
    email: string;
    company?: string;
    role: string;
    createdAt: string;
}

export async function GET() {
    try {
        const usersFile = path.join(process.cwd(), "data", "users.json");
        
        if (!fs.existsSync(usersFile)) {
            return NextResponse.json([]);
        }

        const fileContent = fs.readFileSync(usersFile, "utf-8");
        const users: User[] = JSON.parse(fileContent);

        // Remove passwords from response
        const safeUsers = users.map(({ password, ...user }: any) => user);

        return NextResponse.json(safeUsers);
    } catch (error) {
        console.error("Error reading users:", error);
        return NextResponse.json({ error: "Failed to read users" }, { status: 500 });
    }
}
