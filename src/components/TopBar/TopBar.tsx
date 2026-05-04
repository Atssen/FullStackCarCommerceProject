"use client"
import styles from "./TopBar.module.scss"
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {supabase} from "@/utils/supabase/functions/client";
import {useEffect, useState} from "react";


export function TopBar() {


    async function checkUser()
    {
        const { data, error } = await supabase.auth.getUser();
        setEmail( data.user ? data.user?.email : "NOT FOUND" );

        setLoggedIn(error===null);
    }

    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState<string>();

    useEffect(() => {
        // 1. Get session instantly (cached)
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            const user = data.session?.user;

            setLoggedIn(!!user);
            setEmail(user?.email ?? undefined);
        };

        getSession();

        // 2. Listen for auth changes (login/logout)
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                const user = session?.user;

                setLoggedIn(!!user);
                setEmail(user?.email ?? undefined);
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, [])

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()

        if (error) {
            console.error(error.message)
            return
        }

        router.push("/");
    }


    const router = useRouter();

    return (
        <>

            <div className={styles.topbar}>
                <Link href={"/"} className={styles.logo} >
                    <Image className={styles.logoImage} src={"/jaguarLogo.png"} alt={""} width={150} height={150}/>
                </Link>
                <div className={styles.links}>
                    <Link href={"#"}> New Cars </Link>
                    <Link href={"/cars"}> All Cars </Link>
                </div>

                <div className={styles.searchBar}> <p>Search for cars</p> </div>

                {loggedIn ? (
                    <>
                        <Link href={"/profile"} className={"ml-[60%]"}> { email }</Link>
                        <button className={styles.signInButton} onClick={() => handleLogout()}> Log Out </button>
                    </>
                ) : (
                    <button className={styles.signInButton} onClick={() => router.push('/login')}> Sign In </button>
                )}


                {/*<button className={`${styles.button} right-[10%]`}>*/}
                {/*    <Image src={"/shopping-bag.png"} className={styles.image} alt={""} width={32} height={32} />*/}
                {/*</button>*/}

                {/*<button className={`${styles.button} right-[5%]`}>*/}
                {/*    <Image src={"/avatar.png"} className={styles.image} alt={""} width={32} height={32} />*/}
                {/*</button>*/}

            </div>
        </>
    );
}