import { supabase } from "@/utils/supabase/functions/client";

type Account = {
    name: string;
    surname: string;
    country: string;
    email: string;
    password: string;
};

export async function createAccount(
    {
        name,
        surname,
        country,
        email,
        password,
    }: Account)
{

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
                surname,
                country,
            },
        },
    });

    if (error) {
        console.error("Signup error:", error);
        return;
    }

    return data;
}