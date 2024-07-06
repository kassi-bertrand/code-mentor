import { SignUp } from "@clerk/nextjs"

export default function Page(){
    return (
        <SignUp/>
    );
}

// TODO: Make a custom sign up
// Resources
//  - https://clerk.com/docs/references/nextjs/custom-signup-signin-pages
//  - https://clerk.com/docs/custom-flows/overview
//  - https://clerk.com/blog/building-custom-user-profile-with-clerk