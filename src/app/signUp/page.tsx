"use client"
import styles from "./SignUp.module.scss";
import {useState} from "react";
import Image from "next/image";

export default function SignUpPage()
{
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={styles.panel}>

            <h1> Create an Account </h1>

            <div className={"mt-[4vw]"}></div>

            <label htmlFor={"name"}>Name</label>
            <input id={"name"} />

            <label htmlFor={"surname"}>Surname</label>
            <input id={"surname"} />

            <label htmlFor={"country"}>Country</label>
            <input id={"country"} />

            <label htmlFor={"email"}>E-Mail</label>
            <input id={"email"} />

            <label htmlFor={"password"}>Password</label>
            <div className={"flex gap-[1vw] relative"}>
                <input type={showPassword? "text" : "password"} id={"password"} />
                <button className={"absolute right-4 top-[7%]"} onClick={()=> setShowPassword(!showPassword)}>
                    <Image className={"invert scale-[90%]"} key={showPassword ? "view" : "hide"} src={showPassword ? "/view.png" : "/hide.png"} alt={""} width={32} height={32} />
                </button>
            </div>

            <div className={"mt-[2vw]"}></div>

            <button className={styles.createAccountButton}> Create your account </button>

            <div className={"mt-[6vw]"}></div>

        </div>
    )

}