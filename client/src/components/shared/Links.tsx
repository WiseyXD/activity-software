import { Link } from "@tanstack/react-router";
import { Separator } from "../ui/separator";

type TLinksProps = {
    to: string;
    title: string;
};

export default function Links({ to, title }: TLinksProps) {
    return (
        <div className="py-4">
            <Link to={to}>
                <p className="text-lg font-semibold"> {title}</p>
            </Link>
            <Separator />
        </div>
    );
}
