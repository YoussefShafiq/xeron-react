import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@/components/ui/Button';
import SectionHeader from '@/components/ui/SectionHeader';
import NotFoundPage from '@/pages/NotFoundPage';
import { fetchPortfolioBySlug } from '@/lib/portfolioApi';
import { resolveImageUrl } from '@/lib/resolveImageUrl';

function phaseLeadCopy(stepSlug, item, stepName) {
    const lines = {
        'ui-screens': `For ${item.title}, we refined visual hierarchy, spacing, and component states so the experience stays consistent across every screen.`,
        wireframes: `Before visual polish, we structured flows and layout for ${item.title}—wireframes aligned the team on intent and cut rework later.`,
        prototype: `Interactive prototypes let us validate ${item.title} with stakeholders early, so build cycles focused on the right details.`,
    };
    return (
        lines[stepSlug] ||
        `Design and delivery notes for the ${stepName} phase of ${item.title}.`
    );
}

export default function PortfolioProcessSectionPage() {
    const { slug, section } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        let cancelled = false;
        setLoading(true);
        fetchPortfolioBySlug(slug)
            .then((data) => {
                if (!cancelled) setItem(data);
            })
            .catch((e) => {
                console.error('PortfolioProcessSectionPage:', e);
                if (!cancelled) setItem(null);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [slug]);

    if (loading) {
        return (
            <div className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto animate-pulse h-64 bg-white/5 rounded-2xl" />
            </div>
        );
    }

    if (!item) {
        return <NotFoundPage />;
    }

    const processSteps = Array.isArray(item.processSteps) ? item.processSteps : [];
    const stepIndex = processSteps.findIndex((s) => s.slug === section);

    if (stepIndex < 0) {
        return <NotFoundPage />;
    }

    const step = processSteps[stepIndex];

    const heroSrc = resolveImageUrl(
        item.processImages?.[stepIndex] ||
        step.image ||
        item.images?.[0] ||
        item.image
    );

    return (
        <div className="pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mt-40 mb-24">
                    <SectionHeader
                        title={step.name}
                        subtitle={item.subtitle || item.description}
                        centered
                    />
                    <Button href={`/portfolio/${item.slug}`} variant="primary">
                        View all
                    </Button>
                </div>

                <div className="gradient-border-shell gradient-border-shell--glow rounded-[20px] w-full max-w-5xl mx-auto mb-14">
                    <div className="relative w-full aspect-video min-h-[240px] md:min-h-[360px] rounded-[16px] overflow-hidden bg-white">
                        <img
                            src={heroSrc}
                            alt={`${item.title} — ${step.name}`}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="max-w-3xl mx-auto space-y-6 mb-16">
                    <p className="type-prose opacity-90">
                        {phaseLeadCopy(section, item, step.name)}
                    </p>
                    {item.description && (
                        <p className="type-prose opacity-70">
                            {item.description}
                        </p>
                    )}
                </div>
                <div className="flex flex-wrap gap-4">
                    <Button href={`/portfolio/${item.slug}`} variant="outline">
                        ← All process
                    </Button>
                </div>
            </div>
        </div>
    );
}
