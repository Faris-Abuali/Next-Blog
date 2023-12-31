import Link from "next/link"
import getFormattedDate from "@/lib/getFormattedDate"

type Props = {
    post: Meta
}

export default function ListItem({ post }: Props) {
    const { id, title, date } = post
    const formattedDate = getFormattedDate(date)

    return (
        <li className="mt-7 text-2xl dark:text-white/90 bg-cyan-50 p-5 rounded-lg shadow-sm pointer border-2 border-slate-300">
            <Link
                className="underline hover:text-black/70 dark:hover:text-white"
                href={`/posts/${id}`}
            >
                {title}
            </Link>
            <br />
            <p className="text-sm mt-1">{formattedDate}</p>
        </li>
    )
}