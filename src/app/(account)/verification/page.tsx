"use client"

import styles from "@/src/app/(account)/signUp/SignUp.module.scss";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {supabase} from "@/utils/supabase/functions/client";
import {toast} from "sonner";
import {useSignup} from "@/utils/functions/signUpStore";

export default function VerificationPage(){

    type User = {
        id: string;
        name: string;
        surname: string;
        country: string;
        email: string;
        password: string;
    }

    const { data } = useSignup();

    const [code, setCode] = useState("");

    const router = useRouter();

    return (
        <div className={styles.panel}>

            <div className={"mt-[2vw]"}></div>
            <h1> Verify Your Account </h1>
            <div className={"mt-[2vw]"}></div>

            <label htmlFor={"code"}>Enter Verification Code</label>
            <input id={"code"} value={code} onChange={(e) => setCode(e.target.value)} />

            <div className={"mt-[2vw]"}></div>

            <button className={styles.createAccountButton} onClick={
                async () => {
                    if (!data) return;

                    const { data:verifiedData, error:otpError } = await supabase.auth.verifyOtp({
                        email: data.email,
                        token: code,
                        type: "email",
                    });


                    if (otpError) {
                        console.error(otpError.message);
                        toast.error(otpError.message);
                        return;
                    }

                    if (!verifiedData.user) return;

                    await supabase.auth.updateUser({
                        password: data.password
                    });

                    const { error:createAccountError } = await supabase
                        .from("accounts")
                        .insert({
                            id: verifiedData.user.id,
                            name: data.name,
                            surname: data.surname,
                            country: data.country,
                        })

                    if (createAccountError) {
                        console.error(createAccountError.message);
                        toast.error(createAccountError.message);
                        return;
                    }

                    router.push(`/profile`);
                }
            }
            >
                Send Confirmation Mail
            </button>

        </div>
    )
}