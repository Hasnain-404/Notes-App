import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import axios from "axios";

export default function AuthComponents() {
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            axios.post("https://notes-app-87nm.onrender.com/user/save-user", {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.primaryEmailAddress?.emailAddress,
            }, {
                withCredentials: true
            })
                .then((response) => console.log("User saved:", response.data))
                .catch((error) => console.error("Error saving user:", error));
        }

    }, [user]);

    return (
        <div>
            <header>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </header>
        </div>
    );
}
