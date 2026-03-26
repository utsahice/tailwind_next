interface StatProps {
    blok: {
        number: string;
        label: string;
        _uid: string;
        component: string;
    };
}

export default function Stat({ blok }: StatProps) {
    return (
        <div className="text-center">
            <div className="text-3xl md:text-4xl font-ivy text-yello mb-2">
                {blok.number}
            </div>
            <div className="text-sm font-termina uppercase tracking-wide">
                {blok.label}
            </div>
        </div>
    );
}