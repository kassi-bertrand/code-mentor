import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import Button from "@/components/ui/customButton"
import Logo from "@/assets/logo-base-256x256.png";
import LadyWorking from "@/assets/lady-working.png"

export default function Landing() {
  return (
    <div className="w-screen h-screen flex justify-center overflow-hidden overscroll-none">
      <div className="w-full max-w-screen-md px-8 flex flex-col items-center relative">
        <header className="w-full flex items-center justify-between py-8 mb-10">
          <div className="flex items-center font-medium">
            <Image
              src={Logo}
              alt="Logo"
              width={36}
              height={36}
              className="mr-2"
            />
            <span className="hidden sm:inline">CodeMentor</span >
          </div>
          <div className="flex items-center space-x-4">
            {/* <a href="<link here>" target="_blank">
              <Image src={Logo} alt="X Logo" width={18} height={18} />
            </a> */}
          </div>
        </header>

        <div className="w-full flex flex-col items-center">
          <div className="w-full md:hidden mb-4">
            <Image
              src={LadyWorking}
              alt="Decorative image"
              width={280}
              height={280}
              className="mx-auto"
            />
          </div>

          <div className="relative w-full">
            <div className="hidden md:block absolute right-0 bottom-7 z-10">
              <Image
                src={LadyWorking}
                alt="Decorative image"
                width={150}
                height={150}
              />
            </div>
            <h1 className="text-2xl font-medium text-center mt-16 relative z-0">
              A Collaborative + AI-Powered Learning Environment
            </h1>
          </div>
        </div>

        <div className="text-muted-foreground mt-4 text-center ">
          CodeMentor is a cloud-based code editing environment that integrates LLM
          capabilities to provide practice, assessment, and feedback for your coding skills.
        </div>
        <div className="mt-8 flex space-x-4">
          <Link href="/sign-up"> {/*TODO: Implement sign-up page */}
            <Button className="bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2">Get Started</Button >
          </Link>
          <a
            href="https://github.com/kassi-bertrand/code-mentor"
            target="_blank"
            className="group h-9 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            GitHub Repository
            <MoveRight className="h-4 w-4 ml-1 transition-all group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  )
}
