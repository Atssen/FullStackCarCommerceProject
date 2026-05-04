"use client"
import styles from "./SignUp.module.scss";
import {useState} from "react";
import Image from "next/image";
import {CountryDropdown} from "react-country-region-selector";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {supabase} from "@/utils/supabase/functions/client";
import {toast} from "sonner";
import {useSignup} from "@/utils/functions/signUpStore";

export default function SignUpPage()
{
    const [showPassword, setShowPassword] = useState(false);

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [country, setCountry] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const { setData } = useSignup();

    return (
        <div className={styles.panel}>

            <div className={"mt-[2vw]"}></div>
            <h1> Create an Account </h1>
            <div className={"mt-[2vw]"}></div>

            <label htmlFor={"name"}>Name</label>
            <input id={"name"} value={name} onChange={(e) => setName(e.target.value)} />

            <label htmlFor={"surname"}>Surname</label>
            <input id={"surname"} value={surname} onChange={(e) => setSurname(e.target.value)} />

            <label htmlFor={"country"}>Country</label>
            <CountryDropdown id={"country"} value={country} onChange={(value) => setCountry(value)} className={`${styles.countryPicker}`}> </CountryDropdown>

            <label htmlFor={"email"}>E-Mail</label>
            <input type={"email"} id={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor={"password"}>Password</label>
            <div className={"flex gap-[1vw] relative"}>
                <input type={showPassword? "text" : "password"} id={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className={"absolute right-4 top-[7%]"} onClick={()=> setShowPassword(!showPassword)}>
                    <Image className={"invert scale-[90%]"} key={showPassword ? "view" : "hide"} src={showPassword ? "/view.png" : "/hide.png"} alt={""} width={32} height={32} />
                </button>
            </div>

            <div className={"mt-[2vw]"}></div>

            <button className={styles.createAccountButton} onClick={
                    async () => {
                        setLoading(true);

                        setData({
                            email,
                            password,
                            name,
                            surname,
                            country,
                        });

                        const { error:otpSignInError } = await supabase.auth.signInWithOtp({email});

                        if (otpSignInError) {
                            console.error(otpSignInError.message);
                            toast.error(otpSignInError.message);
                            setLoading(false);
                            return;
                        }

                        router.push("/verification");
                    }
                }
                disabled={loading}
            >
                {
                    loading ? <div className={styles.loader}></div>
                        :
                        "Create your account"
                }

            </button>

            <div className={"mt-[2vw]"}></div>
            <Link href={"/login"}> Login to your existing account </Link>

            <div className={"mt-[6vw]"}></div>

        </div>
    )

}