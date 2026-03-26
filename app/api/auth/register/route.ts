import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        
        // Create user object
        const user = {
            id: Date.now().toString(),
            name: data.name,
            email: data.email,
            password: data.password, // In production, hash this!
            company: data.company || "",
            role: "user",
            createdAt: new Date().toISOString()
        };

        // Save to JSON file
        const dataDir = path.join(process.cwd(), "data");
        const usersFile = path.join(dataDir, "users.json");

        // Create data directory if it doesn't exist
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        // Read existing users or create new array
        let users = [];
        if (fs.existsSync(usersFile)) {
            const fileContent = fs.readFileSync(usersFile, "utf-8");
            users = JSON.parse(fileContent);
        }

        // Check if email already exists
        if (users.some((u: any) => u.email === data.email)) {
            return NextResponse.json({ success: false, message: "Email already registered" }, { status: 400 });
        }

        // Add new user
        users.push(user);

        // Save updated data
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

        return NextResponse.json({ success: true, message: "Registration successful" });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ success: false, message: "Registration failed" }, { status: 500 });
    }
}
