"use client"
import styles from "./TopBar.module.scss"
import Link from "next/link";
import Image from "next/image";
import {Show, SignInButton, SignUpButton, UserButton, useUser} from "@clerk/nextjs";
import { Meilisearch } from "meilisearch";
import {useEffect, useState} from "react";


export function TopBar() {



    // const [searchResults, setSearchResults] = useState([]);
    //
    // const client = new Meilisearch({
    //     host: "https://meilisearch-production-89d8.up.railway.app",
    //     apiKey: "6Sm06lvAotaYMT0izLEsSCUOHJ7xvzHU",
    // });
    //
    // const carsIndex = client.index("cars");
    //
    // async function getSearchResults(query : string) {
    //
    //     const results = await carsIndex.search(query, {
    //         limit: 20,
    //         attributesToHighlight: ["name", "details", "tags"],
    //     });
    //
    //     console.log(results.hits);
    //
    //     // setSearchResults(results.hits);
    // }
    //
    // useEffect(() => {
    //     getSearchResults("Blue");
    // }, [])

    const devNgrok = true;

    const { isLoaded, isSignedIn } = useUser();

    if (!isLoaded && !devNgrok) {
        return (
            <div className={"mt-[7vw]"} />
        )
    }


    return (
        <>
            <div className={`${styles.topbar} h-[22vw] lg:h-[7vw]`}>
                <Link href={"/"} className={styles.logo} >
                    <Image className={styles.logoImage} src={"/jaguarLogo.png"} alt={""} width={150} height={150}/>
                </Link>
                <div className={styles.links}>
                    <Link href={"/new-cars"}> New Cars </Link>
                    <Link href={"/cars"}> All Cars </Link>
                </div>

                <div className={styles.searchBar}> <p>Search for cars</p> </div>

                {
                    !devNgrok &&
                    <>
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
                    </>

                }



                {/*<button className={`${styles.button} right-[10%]`}>*/}
                {/*    <Image src={"/shopping-bag.png"} className={styles.image} alt={""} width={32} height={32} />*/}
                {/*</button>*/}

            </div>
        </>
    );
}