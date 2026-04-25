import { NextResponse } from "next/server";
import {supabase} from "@/utils/supabase/functions/client";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password required" },
                { status: 400 }
            );
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 401 }
            );
        }

        const userInfo = {
            id: data.user?.id,
            email: data.user?.email,
            created_at: data.user?.created_at,
            session: data.session, // optional if you want token info
        };

        return NextResponse.json({ user: userInfo });
    } catch (err) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}