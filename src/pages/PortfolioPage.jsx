import { useEffect, useState } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import PortfolioCard from '@/components/portfolio/PortfolioCard';
import PortfolioCardSkeleton from '@/components/skeletons/PortfolioCardSkeleton';
import { fetchPortfolioList } from '@/lib/portfolioApi';

export default function PortfolioPage() {
    const [portfolio, setPortfolio] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        fetchPortfolioList()
            .then((data) => {
                if (!cancelled) setPortfolio(data);
            })
            .catch((e) => {
                console.error('PortfolioPage:', e);
                if (!cancelled) setPortfolio([]);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
            <div className="max-w-7xl mt-24 mx-auto">
                <SectionHeader
                    title="What We've Built"
                    subtitle="Real projects. Real impact. Built for people who think bigger."
                    centered
                />
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {loading
                        ? Array.from({ length: 6 }).map((_, i) => (
                              <PortfolioCardSkeleton key={i} variant="portfolio" />
                          ))
                        : portfolio.map((item) => (
                              <PortfolioCard key={item.slug} item={item} variant="portfolio" />
                          ))}
                </div>
            </div>
        </div>
    );
}
