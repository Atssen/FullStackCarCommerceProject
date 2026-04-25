"use client"
import styles from "./login.module.scss";
import {useState} from "react";
import Image from "next/image";
import {CountryDropdown} from "react-country-region-selector";
import {createAccount} from "@/utils/supabase/functions/createAccount";
import Link from "next/link";

export default function LoginPage()
{
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className={styles.panel}>

            <div className={"mt-[2vw]"}></div>
            <h1> Login to Your Account </h1>
            <div className={"mt-[2vw]"}></div>

            <label htmlFor={"email"}>E-Mail</label>
            <input type={"email"} id={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor={"password"}>Password</label>
            <div className={"relative"}>
                <input type={showPassword? "text" : "password"} id={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className={"absolute right-[1vw] bottom-[2.4vw] h-[2.3vw] w-[2vw]"} onClick={()=> setShowPassword(!showPassword)}>
                    <Image className={"invert opacity-75"} key={showPassword ? "view" : "hide"} src={showPassword ? "/view.png" : "/hide.png"} alt={""} width={32} height={32} />
                </button>
            </div>

            <button className={styles.createAccountButton} onClick={
                async () => {
                    const res = await fetch("/api/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: email,
                            password: password,
                        }),
                    });

                    const data = await res.json();
                    console.log(data);
                }
            }
            >
                Log In
            </button>

            <div className={"mt-[2vw]"}></div>

            <Link href={"/signUp"}> Create a new account </Link>

            <div className={"mt-[6vw]"}></div>

        </div>
    )

}