import Image from 'next/image'
import Link from 'next/link'

const pill =
    "text-center px-4 py-[13.5px] bg-button-dark border-[0.5px] rounded-[55px] border-button-dark-border";

type Props = {
    className?: string;
}

const Logo = ({ className="" }: Props) => {
    return (
        <Link
            href="/"
            aria-label="Rocket VPN — главная"
            className={`${pill} flex min-w-[127px] items-center gap-1 xl:px-[27px] xl:py-[11px] ${className}`}
        >
            <Image src="/icons/logo.svg" alt="logo" width={18} height={18} className="xl:w-[24px]" />
            <span className="text-[14px] xl:text-[17px] font-medium">RocketVPN</span>
        </Link>
    )
}

export default Logo