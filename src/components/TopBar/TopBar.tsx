"use client"
import styles from "./TopBar.module.scss"
import Link from "next/link";
import Image from "next/image";
import {Show, SignInButton, SignUpButton, UserButton, useUser} from "@clerk/nextjs";
import { Meilisearch } from "meilisearch";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {HamburgerButton} from "@/src/components/HamburgerButton/HamburgerButton";


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


    const { isLoaded, isSignedIn } = useUser();

    const [isOpen, setIsOpen] = useState(false);



    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);



    if (!isLoaded) {
        return (
            <div className={"mt-[7vw]"} />
        )
    }



    return (
        <div className={"top-0 fixed lg:static z-10 h-[100vh] lg:h-auto"}>
            <div className={`${styles.topbar} h-[22vw] lg:h-[7vw] ${isOpen && "border-b border-[#5a5a5a]"} lg:border-0 pointer-events-auto`}>

                <Link href={"/"} className={`${styles.logo} aspect-[1/1.4] h-[28vw] lg:h-[14vw]`} onClick={() => (isOpen && setIsOpen(!isOpen))}>
                    <Image className={styles.logoImage} src={"/jaguarLogo.png"} alt={""} width={150} height={150}/>
                </Link>
                <div className={`${styles.links} hidden lg:flex`}>
                    <Link href={"/new-cars"}> New Cars </Link>
                    <Link href={"/cars"}> All Cars </Link>
                </div>

                <div className={`${styles.searchBar} hidden lg:flex`}> <p>Search for cars</p> </div>

                <div className={"hidden lg:flex items-center"}>
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
                </div>

                <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} />


                {/*<button className={`${styles.button} right-[10%]`}>*/}
                {/*    <Image src={"/shopping-bag.png"} className={styles.image} alt={""} width={32} height={32} />*/}
                {/*</button>*/}
            </div>

            <div className={`
                ${styles.linkGroup}
                fixed
                top-[22vw]
                left-0
                w-full
                ${!isOpen ? "h-0" : "h-[calc(100vh-22vw)]"}
                flex
                lg:hidden
                flex-col
                items-center
                justify-start
                gap-[11vw]
                bg-[#0e0e0e]
                z-20 `
            }>
                <div className="mt-[2vw]" />
                <Link href="/new-cars" onClick={() => setIsOpen(!isOpen)} className={`${styles.linkStyle}`}> New Cars </Link>
                <Link href="/cars"     onClick={() => setIsOpen(!isOpen)} className={`${styles.linkStyle}`}> All Cars </Link>

                <Show when="signed-out">
                    <div className={styles.signButtonsContainer}>
                        <SignInButton mode="modal">
                            <button className={`${styles.signButton}`}>
                                Sign In
                            </button>
                        </SignInButton>

                        <SignUpButton mode="modal">
                            <button className={`${styles.signButton}`}>
                                Sign Up
                            </button>
                        </SignUpButton>
                    </div>
                </Show>

                <Show when="signed-in">
                    <div className="absolute top-[60vh] scale-[3]">
                        <UserButton
                            appearance={{
                                elements: {
                                    userButtonPopoverCard: "!left-1/2 !-translate-x-1/2",
                                    userButtonAvatarBox:
                                        "!shadow-none hover:!shadow-none hover:!bg-transparent focus:!bg-transparent",
                                },
                            }}
                        />
                    </div>
                </Show>
            </div>

        </div>
    );
}