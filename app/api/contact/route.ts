import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        
        // Add timestamp
        const submission = {
            ...data,
            timestamp: new Date().toISOString(),
            id: Date.now().toString()
        };

        // Save to JSON file
        const dataDir = path.join(process.cwd(), "data");
        const contactFile = path.join(dataDir, "contacts.json");

        // Create data directory if it doesn't exist
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        // Read existing data or create new array
        let contacts = [];
        if (fs.existsSync(contactFile)) {
            const fileContent = fs.readFileSync(contactFile, "utf-8");
            contacts = JSON.parse(fileContent);
        }

        // Add new submission
        contacts.push(submission);

        // Save updated data
        fs.writeFileSync(contactFile, JSON.stringify(contacts, null, 2));

        return NextResponse.json({ success: true, message: "Contact form submitted successfully" });
    } catch (error) {
        console.error("Error saving contact form:", error);
        return NextResponse.json({ success: false, message: "Failed to submit form" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const contactFile = path.join(process.cwd(), "data", "contacts.json");
        
        if (!fs.existsSync(contactFile)) {
            return NextResponse.json([]);
        }

        const fileContent = fs.readFileSync(contactFile, "utf-8");
        const contacts = JSON.parse(fileContent);

        return NextResponse.json(contacts);
    } catch (error) {
        console.error("Error reading contacts:", error);
        return NextResponse.json({ error: "Failed to read contacts" }, { status: 500 });
    }
}
