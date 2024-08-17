'use client';


import PersistentDrawerLeft from "@/components/appbar";

export default function AppLayOut({ children }: { children: React.ReactNode }) {



    return (
        <PersistentDrawerLeft>
            {children}
        </PersistentDrawerLeft>
    );
}