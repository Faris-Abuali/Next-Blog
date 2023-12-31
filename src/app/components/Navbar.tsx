import Link from "next/link"
import { FaGithub, FaLaptop, FaYoutube, FaLinkedin } from "react-icons/fa"
import IconLink from "./IconLink"

export default function Navbar() {
    return (
        <nav className="bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10">
            <div className="md:px-6 prose prose-xl mx-auto flex justify-between flex-col sm:flex-row">
                <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">
                    <Link href="/" className="text-white/90 no-underline hover:text-white">Faris Abuali</Link>
                </h1>
                <div className="flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-white text-4xl lg:text-5xl">
                <IconLink
                        href="https://www.youtube.com/channel/UCnyRDZ9n_X0SzMb-TGiqtXQ"
                        icon={<FaYoutube />}
                    />
                    <IconLink
                        href="https://www.linkedin.com/in/faris-abuali/"
                        icon={<FaLinkedin />}
                    />
                    <IconLink
                        href="https://github.com/Faris-Abuali"
                        icon={<FaGithub />}
                    />
                    <IconLink
                        href="https://github.com/Faris-Abuali"
                        icon={<FaLaptop />}
                    />
                </div>
            </div>
        </nav>
    )
}