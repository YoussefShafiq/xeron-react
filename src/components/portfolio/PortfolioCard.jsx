import { Link } from 'react-router-dom';
import Badge from '@/components/ui/Badge';
import { resolveImageUrl } from '@/lib/resolveImageUrl';

export default function PortfolioCard({ item, variant = 'default' }) {
    const sizeClass =
        variant === 'portfolio'
            ? 'w-full aspect-3/2 sm:aspect-square'
            : 'aspect-3/2';
    const badgeClass =
        variant === 'portfolio'
            ? 'hidden lg:flex flex-wrap gap-2 mt-1 opacity-70'
            : 'flex flex-wrap gap-2 mt-1 opacity-70';

    const coverSrc = resolveImageUrl(item.image);

    return (
        <Link
            to={`/portfolio/${item.slug}`}
            className={`block rounded-2xl gradient-border-shell gradient-border-shell--bl  ${sizeClass}
                transition-all duration-200 hover:-translate-y-1 hover:shadow-card group`}
        >
            <div className="relative h-full w-full min-h-0 overflow-hidden rounded-[14px]">
                <img
                    src={coverSrc}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2">
                    <h3 className="type-card-overlay-title">
                        {item.title}
                    </h3>
                    <p className="type-card-overlay-desc">
                        {item.subtitle}
                    </p>
                    <div className={badgeClass}>
                        {(item.tags.slice(0, Math.min(item.tags.length, 6)) ?? []).map((tag) => (
                            <Badge key={tag}>{tag}</Badge>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
}
