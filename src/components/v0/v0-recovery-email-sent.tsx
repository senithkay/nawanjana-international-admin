
import { JSX, SVGProps } from "react"
import Link from "next/link";

export function V0RecoveryEmailSent() {
    return (
        <div className="mx-auto max-w-sm space-y-6 py-12">
            <div className="space-y-2 text-center">
                <MailIcon className="mx-auto h-12 w-12 text-gray-500 dark:text-gray-400" />
                <h1 className="text-3xl font-bold">Recovery Email Sent</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    {'We\'ve sent a password recovery email to your registered email address. Please check your inbox and\n' +
                        '                    follow the\n' +
                        '                    instructions to reset your password.'}
                </p>
            </div>
            <Link
                href="/auth/signin"
                className="inline-flex w-full justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300"
                prefetch={false}
            >
                Back to Login
            </Link>
        </div>
    )
}

function MailIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="16" x="2" y="4" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
    )
}
