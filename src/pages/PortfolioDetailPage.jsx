import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@/components/ui/Button';
import SectionHeader from '@/components/ui/SectionHeader';
import NotFoundPage from '@/pages/NotFoundPage';
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal';
import { fetchPortfolioBySlug } from '@/lib/portfolioApi';
import { resolveImageUrl } from '@/lib/resolveImageUrl';

export default function PortfolioDetailPage() {
    const { slug } = useParams();
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
                console.error('PortfolioDetailPage:', e);
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
                <div className="max-w-7xl mx-auto animate-pulse">
                    <div className="h-12 bg-white/5 rounded-lg max-w-md mx-auto mb-24" />
                    <div className="h-64 bg-white/5 rounded-2xl" />
                </div>
            </div>
        );
    }

    if (!item) {
        return <NotFoundPage />;
    }

    const processSteps = Array.isArray(item.processSteps) ? item.processSteps : [];

    const problemImgSrc = '/ImagePlaceholder.png';
    const solutionImgSrc = '/ImagePlaceholder.png';
    const demoUrl = item.demo_url || item.demoUrl;

    return (
        <div className="pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">

                <div className="text-center my-24">
                    <SectionHeader
                        title={item.title}
                        subtitle={item.subtitle || item.description}
                        tags={Array.isArray(item.tags) ? item.tags : []}
                        centered
                        href={demoUrl}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-[40px] md:gap-[56px] lg:gap-[80px] items-stretch mb-20">

                    <ScrollReveal direction="left" className="col-span-1 order-1 lg:order-0">
                        <div className="gradient-border-shell gradient-border-shell--glow rounded-[20px] w-full max-w-full mx-auto lg:max-w-none">
                            <div className="relative w-full h-full aspect-16/10 md:aspect-video min-h-[220px] md:min-h-[320px] rounded-[16px] overflow-hidden bg-white">
                                <img
                                    src={problemImgSrc}
                                    alt={`${item.title} — problem`}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal direction="right" delay={0.1} className="col-span-1 lg:col-span-2 order-2 lg:order-0 flex flex-col gap-[28px] md:gap-[32px]">
                        <h2 className="type-heading">
                            The Problem Statement
                        </h2>
                        {(item.problem ?? []).map((para, i) => (
                            <p key={i} className="type-prose opacity-70">
                                {para}
                            </p>
                        ))}
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-[40px] md:gap-[56px] lg:gap-[80px] items-stretch mb-24">

                    <ScrollReveal direction="left" delay={0.1} className="col-span-1 lg:col-span-2 order-2 lg:order-0 flex flex-col gap-[28px] md:gap-[32px]">
                        <h2 className="type-heading">
                            The Solution
                        </h2>
                        {(item.solution ?? []).map((para, i) => (
                            <p key={i} className="type-prose opacity-70">
                                {para}
                            </p>
                        ))}
                    </ScrollReveal>

                    <ScrollReveal direction="right" className="col-span-1 order-1 lg:order-0">
                        <div className="gradient-border-shell gradient-border-shell--glow rounded-[20px] w-full max-w-full mx-auto lg:max-w-none">
                            <div className="relative w-full h-full aspect-16/10 md:aspect-video min-h-[220px] md:min-h-[320px] rounded-[16px] overflow-hidden bg-white">
                                <img
                                    src={solutionImgSrc}
                                    alt={`${item.title} — solution`}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                <div hidden={processSteps.length === 0}>
                    <ScrollReveal className="text-center mb-12">
                        <h2 className="type-process-banner">
                            Gallery
                        </h2>
                    </ScrollReveal>

                    <StaggerReveal className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 mb-20">
                        {processSteps.map((step, i) => (
                            <StaggerItem key={`${step.slug}-${i}`}>
                                <div className="group">
                                    <div className="relative gradient-border-shell gradient-border-shell--glow rounded-[20px] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                                        <div className="relative w-full aspect-4/3 rounded-[16px] overflow-hidden bg-white">

                                            <img
                                                src={resolveImageUrl(step.image || item.image)}
                                                alt={`${item.title} — ${step.name}`}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />

                                            <div className="absolute inset-0 bg-linear-to-b from-transparent to-purple-1000/80 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 flex items-end p-1.5 sm:p-2 md:p-4">
                                                <div className="w-full text-purple-50">
                                                    <h3 className="type-process-step-thumb text-purple-50">
                                                        {step.name}
                                                    </h3>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerReveal>
                </div>

                <ScrollReveal>
                    <Button href="/portfolio" variant="outline">
                        ← Back to Portfolio
                    </Button>
                </ScrollReveal>

            </div>
        </div>
    );
}
