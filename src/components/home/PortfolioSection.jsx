import SectionHeader from '@/components/ui/SectionHeader';
import PortfolioCard from '@/components/portfolio/PortfolioCard';
import Button from '@/components/ui/Button';
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal';

export default function PortfolioSection({ portfolios = [] }) {
    const preview = portfolios.slice(0, 3);

    return (
        <section className="py-20 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <SectionHeader
                    title="What We've Built"
                    subtitle="Real projects. Real Impact. Built for people who think bigger."
                    centered
                />

                <StaggerReveal className="mt-16 grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                    {preview.map((item) => (
                        <StaggerItem key={item.slug}>
                            <PortfolioCard item={item} variant="portfolio" />
                        </StaggerItem>
                    ))}
                </StaggerReveal>

                <ScrollReveal className="flex justify-center mt-12">
                    <Button href="/portfolio" variant="primary">See more</Button>
                </ScrollReveal>
            </div>
        </section>
    );
}
