import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // Demo credentials
        const demoUsers = [
            { email: "admin@glazedgloss.com", password: "admin123", role: "admin", name: "Admin User" },
            { email: "user@example.com", password: "user123", role: "user", name: "Demo User" }
        ];

        // Check demo users first
        const demoUser = demoUsers.find(u => u.email === email && u.password === password);
        if (demoUser) {
            return NextResponse.json({
                success: true,
                token: `demo-token-${Date.now()}`,
                user: { email: demoUser.email, name: demoUser.name, role: demoUser.role }
            });
        }

        // Check registered users
        const usersFile = path.join(process.cwd(), "data", "users.json");
        if (fs.existsSync(usersFile)) {
            const fileContent = fs.readFileSync(usersFile, "utf-8");
            const users = JSON.parse(fileContent);
            
            const user = users.find((u: any) => u.email === email && u.password === password);
            if (user) {
                return NextResponse.json({
                    success: true,
                    token: `token-${Date.now()}`,
                    user: { email: user.email, name: user.name, role: user.role || "user" }
                });
            }
        }

        return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ success: false, message: "Login failed" }, { status: 500 });
    }
}
