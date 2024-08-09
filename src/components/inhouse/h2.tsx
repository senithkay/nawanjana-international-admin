import React from "react";
import {cn} from '@/lib/utils'

type H2Props = {
    children: React.ReactNode;
    className?: string;
}

const H2 = ({ children, className }: H2Props) =>{
    return (
        <h2 className={cn('text-gray-500 text-2xl', className)}>{children}</h2>
    )
}

export default H2