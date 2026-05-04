"use client"

import {supabase} from "@/utils/supabase/functions/client";
import {useEffect, useState} from "react";
import {toast} from "sonner";

export default function ProfilePage() {

    type User = {
        id: string;
        name: string;
        surname: string;
        country: string;
        email: string;
        password: string;
    }

    async function fetchData() {
        setLoading(true);

        const { data:sessionUserData, error:sessionUserError } = await supabase.auth.getUser();

        if (sessionUserError) {
            console.error(sessionUserError.message);
            toast.error(sessionUserError.message);
            setUser(null);
            setLoading(false);
            return;
        }

        const { data:account, error:accountAccessError } = await supabase
            .from("accounts")
            .select("*")
            .eq("id", sessionUserData.user.id)
            .single();

        if (accountAccessError) {
            console.error(accountAccessError.message);
            toast.error(accountAccessError.message);
            setUser(null);
            setLoading(false);
            return;
        }

        setUser(account);

        setLoading(false);
    }

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {
        fetchData();
    }, []);


    return(
        <>
            {
                loading ? (
                    <div className={"m-auto flex flex-col items-center justify-center gap-2"}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                ) :
                (
                    <>
                        <div>{user?.name}</div>
                        <div>{user?.surname}</div>
                        <div>{user?.country}</div>
                    </>
                )
            }
        </>
    )
}