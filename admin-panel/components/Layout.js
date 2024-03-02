import { useState } from "react";
import { useRouter } from "next/router";
import Nav from "@/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react";
import Logo from "./Logo";
import Link from "next/link";


export default function Layout({ children }) {
    const [showNav, setShowNav] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    const handleFormSubmit = (event) => {
        event.preventDefault();
        signIn('credentials', { email, password });
    };

    if (!session) {
        return (
            <div className={"bg-bgGray w-screen h-screen flex items-center"}>
                <div className="w-full text-center">
                    <form onSubmit={handleFormSubmit}>
                        <div className="flex justify-center mb-4">
                            <Logo />
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="mb-4">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="bg-white p-2 rounded-lg px-4 w-64"
                                    value={email} onChange={handleEmailChange}
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="bg-white p-2 rounded-lg px-4 w-64"
                                    value={password} onChange={handlePasswordChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-white p-2 rounded-lg px-4 w-64"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                    <Link href={'/signup'}>
                        Sign up
                    </Link>
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => signIn("google")}
                            className="bg-white p-2 rounded-lg px-4"
                        >
                            Sign in with Google
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-bgGray min-h-screen">
            <div className="block md:hidden flex items-center p-4">
                <button onClick={() => setShowNav(true)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <div className="flex grow justify-center mr-6">
                    <Logo />
                </div>
            </div>
            <div className="flex">
                <Nav show={showNav} />
                <div className="flex-grow p-4">{children}</div>
            </div>
        </div>
    );
}
