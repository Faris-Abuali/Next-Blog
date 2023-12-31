import Link from 'next/link'

type Props = {
    href: string
    icon: React.ReactNode
}

const IconLink = (props: Props) => {
    return (
        <Link
            className="text-white/90 hover:text-white"
            href={props.href}
        >
            {props.icon}
        </Link>
    )
}

export default IconLink