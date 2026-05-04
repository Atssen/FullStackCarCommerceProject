"use client"
import {createContext, ReactNode, useContext, useState} from "react";

type SignupData = {
    email: string;
    password: string;
    name: string;
    surname: string;
    country: string;
};

type SignupContextType = {
    data: SignupData | null;
    setData: React.Dispatch<React.SetStateAction<SignupData | null>>;
};

const SignupContext = createContext<SignupContextType | null>(null);

export const SignupProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<SignupData | null>(null);

    return (
        <SignupContext.Provider value={{ data, setData }}>
            {children}
        </SignupContext.Provider>
    );
};

export const useSignup = () => {
    const context = useContext(SignupContext);

    if (!context) {
        throw new Error("useSignup must be used within a SignupProvider");
    }

    return context;
};