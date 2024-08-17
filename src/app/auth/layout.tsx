import React from "react";

export default function AppLayOut({ children }: { children: React.ReactNode }) {

    return (
        <div className={'h-[80vh] flex justify-center items-center'}>
            {children}
        </div>
    );
}