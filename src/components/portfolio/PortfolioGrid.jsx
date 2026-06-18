import PortfolioCard from './PortfolioCard';
import { StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal';

/**
 * PortfolioGrid — pass `items` from fetchPortfolioList() (or a slice).
 * Pass `preview={true}` to render only the first 4.
 * Pass `variant="portfolio"` for card sizing used on the portfolio page.
 */
export default function PortfolioGrid({ items = [], preview = false, variant = 'default' }) {
    const list = preview ? items.slice(0, 4) : items;

    return (
        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {list.map((item) => (
                <StaggerItem key={item.slug}>
                    <PortfolioCard item={item} variant={variant} />
                </StaggerItem>
            ))}
        </StaggerReveal>
    );
}
