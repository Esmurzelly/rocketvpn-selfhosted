import Image from "next/image";
import Link from "next/link";

type Props = {
    href: string;
    children: React.ReactNode;
    className?: string;
    iconBoolean: boolean
};

const ButtonLink = ({ href, children, className = "", iconBoolean = true }: Props) => {
    return (<Link
        href={href}
        className={`flex w-fit items-center justify-center gap-[6px] rounded-button border-[0.5px] border-button-orange-border bg-button-orange text-[12px] xl:text-[16px] transition hover:brightness-110 ${className}`}
    >
        {iconBoolean ? <Image src="/icons/rocket.svg" alt="" width={12} height={12} /> : ""}
        {children}
    </Link>)
}

export default ButtonLink