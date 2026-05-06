"use client"
import styles from "./TopBar.module.scss"
import Link from "next/link";
import Image from "next/image";
import {Show, SignInButton, SignUpButton, UserButton, useUser} from "@clerk/nextjs";


export function TopBar() {

    const { isLoaded, isSignedIn } = useUser();

    if (!isLoaded) {
        return (
            <div className={"mt-[7vw]"} />
        )
    }


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

                <Show when="signed-out">
                    <div className={styles.signButtonsContainer}>
                        <SignInButton mode="modal">
                            <button className={`${styles.signButton} right-[5%]`}>
                                Sign In
                            </button>
                        </SignInButton>

                        <SignUpButton mode="modal">
                            <button className={`${styles.signButton} right-[14%]`}>
                                Sign Up
                            </button>
                        </SignUpButton>
                    </div>
                </Show>
                <Show when="signed-in">
                    <div className="absolute right-[5%] scale-150">
                        <UserButton
                            appearance={{
                                elements: {
                                    userButtonAvatarBox:
                                        "!shadow-none hover:!shadow-none hover:!bg-transparent focus:!bg-transparent",
                                },
                            }}
                        />
                    </div>
                </Show>


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