import { useParams, Link } from 'react-router-dom';
import { fetchServiceBySlug } from '@/lib/serviceApi';
import { fetchPortfolioBySlug } from '@/lib/portfolioApi';
import { resolveImageUrl } from '@/lib/resolveImageUrl';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ServiceDetailSkeleton from '@/components/skeletons/ServiceDetailSkeleton';
import NotFoundPage from '@/pages/NotFoundPage';
import { useEffect, useRef, useState } from 'react';

const SCROLL_MARGIN_PX = 112;

export default function ServiceDetailPage() {
    const { slug } = useParams();

    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedPortfolios, setRelatedPortfolios] = useState([]);

    useEffect(() => {
        if (!slug) return;
        let cancelled = false;
        setLoading(true);
        setService(null);

        fetchServiceBySlug(slug)
            .then((data) => {
                if (!cancelled) setService(data);
            })
            .catch((err) => {
                console.error('Error fetching service:', err);
                if (!cancelled) setService(null);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [slug]);

    // Fetch related portfolios when service loads
    useEffect(() => {
        if (!service) return;
        const topics = Array.isArray(service.topics) ? service.topics : [];
        const relTopic = topics.find((t) => t.id === 'related-projects');
        if (!relTopic || !relTopic.body) {
            setRelatedPortfolios([]);
            return;
        }

        const slugs = Array.isArray(relTopic.body)
            ? relTopic.body
            : String(relTopic.body)
                  .split(/[,\n]/)
                  .map((s) => s.replace(/^•\s*/, '').trim())
                  .filter(Boolean);

        let cancelled = false;
        Promise.all(slugs.map((s) => fetchPortfolioBySlug(s).catch(() => null)))
            .then((results) => {
                if (!cancelled) setRelatedPortfolios(results.filter(Boolean));
            });

        return () => {
            cancelled = true;
        };
    }, [service]);

    const topics = Array.isArray(service?.topics) ? service.topics : [];
    const tags = Array.isArray(service?.tags) ? service.tags : [];

    const [activeId, setActiveId] = useState(undefined);
    const sectionRefs = useRef({});

    useEffect(() => {
        if (topics[0]?.id) setActiveId(topics[0].id);
    }, [service?.slug, topics]);

    useEffect(() => {
        if (!topics.length) return;

        const updateActive = () => {
            let found = topics[0].id;
            for (const { id } of topics) {
                const el = sectionRefs.current[id];
                if (!el) continue;
                const top = el.getBoundingClientRect().top;
                if (top <= SCROLL_MARGIN_PX + 12) {
                    found = id;
                }
            }
            setActiveId(found);
        };

        updateActive();
        window.addEventListener('scroll', updateActive, { passive: true });
        window.addEventListener('resize', updateActive);
        return () => {
            window.removeEventListener('scroll', updateActive);
            window.removeEventListener('resize', updateActive);
        };
    }, [topics]);

    const scrollToTopic = (id) => {
        const target = sectionRefs.current[id];
        if (!target) return;
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveId(id);
    };

    const parseBullets = (body) => {
        const lines = String(body ?? '').split('\n');
        const bullets = [];
        const paragraphs = [];
        let currentParagraph = [];

        lines.forEach((line) => {
            const trimmed = line.trim();
            if (trimmed.startsWith('•')) {
                if (currentParagraph.length) {
                    paragraphs.push(currentParagraph.join(' '));
                    currentParagraph = [];
                }
                bullets.push(trimmed.replace(/^•\s*/, ''));
            } else if (trimmed === '') {
                if (currentParagraph.length) {
                    paragraphs.push(currentParagraph.join(' '));
                    currentParagraph = [];
                }
            } else {
                if (!trimmed.endsWith(':')) {
                    currentParagraph.push(trimmed);
                }
            }
        });
        if (currentParagraph.length) paragraphs.push(currentParagraph.join(' '));

        return { paragraphs, bullets };
    };

    if (loading) {
        return <ServiceDetailSkeleton />;
    }

    if (!service) {
        return <NotFoundPage />;
    }

    return (
        <div className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
            <div className="max-w-7xl mt-16 md:mt-32 lg:mt-24 mx-auto">

                <div className="text-center mb-12 md:mb-20">
                    <h1 className="type-page-title mb-4 leading-tight">
                        {service.title}
                    </h1>
                    <p className="type-body max-w-2xl mx-auto px-2 leading-[1.6] md:leading-[1.8]">
                        {service.description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                        {tags.map((tag) => (
                            <Badge key={tag}>{tag}</Badge>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

                    <aside className="hidden lg:flex sticky top-28 w-[280px] shrink-0 rounded-2xl border border-white/[0.07] bg-white/3 p-6 flex-col gap-6">
                        <div>
                            <p className="type-sidebar-label mb-10">
                                Topics
                            </p>
                            <nav className="flex flex-col gap-4">
                                {topics.map(({ id, label }) => {
                                    const isActive = activeId === id;
                                    return (
                                        <button
                                            key={id}
                                            type="button"
                                            onClick={() => scrollToTopic(id)}
                                            className={`
                                                text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer md:text-base
                                                ${isActive
                                                    ? 'bg-purple-500/15 text-purple-300 border-l-2 border-purple-400 pl-[10px]'
                                                    : 'text-content-secondary hover:text-content-primary hover:bg-white/4'
                                                }
                                            `}
                                        >
                                            {label}
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>

                        <div className="mt-auto pt-40">
                            <Button href="/contact" variant="primary" className="w-full justify-center">
                                Start a project →
                            </Button>
                        </div>
                    </aside>

                    <div className="flex-1 min-w-0 relative w-full">
                        <div className="rounded-2xl border border-white/7 bg-white/2">
                            {topics.map(({ id, heading, body }, index) => {
                                const isLast = index === topics.length - 1;
                                const isRelated = id === 'related-projects';
                                const { paragraphs, bullets } = parseBullets(body);

                                return (
                                    <div
                                        key={id}
                                        id={id}
                                        ref={(el) => {
                                            sectionRefs.current[id] = el;
                                        }}
                                        style={{ scrollMarginTop: SCROLL_MARGIN_PX }}
                                        className={`px-6 py-8 md:px-10 md:py-12 ${!isLast ? 'border-b border-purple-50/20' : ''}`}
                                    >
                                        <h2 className="type-heading tracking-tight mb-5">
                                            {heading}
                                        </h2>

                                        {isRelated && relatedPortfolios.length > 0 ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                                {relatedPortfolios.map((portfolio) => {
                                                    const coverSrc = resolveImageUrl(portfolio.image);
                                                    return (
                                                        <Link
                                                            key={portfolio._id || portfolio.slug}
                                                            to={`/portfolio/${portfolio.slug}`}
                                                            className="group relative block rounded-xl overflow-hidden border border-white/[0.07] bg-white/[0.03] transition-all duration-200 hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/5"
                                                        >
                                                            <div className="relative aspect-[16/10] overflow-hidden">
                                                                <img
                                                                    src={coverSrc}
                                                                    alt={portfolio.title}
                                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                                />
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                                            </div>
                                                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                                                <h3 className="text-sm font-semibold text-white mb-1 leading-snug">
                                                                    {portfolio.title}
                                                                </h3>
                                                                {portfolio.subtitle && (
                                                                    <p className="text-xs text-white/60 line-clamp-1">
                                                                        {portfolio.subtitle}
                                                                    </p>
                                                                )}
                                                                <div className="flex flex-wrap gap-1.5 mt-2">
                                                                    {(portfolio.tags ?? []).slice(0, 3).map((tag) => (
                                                                        <span
                                                                            key={tag}
                                                                            className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/20"
                                                                        >
                                                                            {tag}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <>
                                                {paragraphs.map((para, i) => (
                                                    <p key={i} className="type-body mb-4 leading-[1.85]">
                                                        {para}
                                                    </p>
                                                ))}

                                                {bullets.length > 0 && (
                                                    <ul className="flex flex-col gap-3 mt-6">
                                                        {bullets.map((point, i) => (
                                                            <li key={i} className="flex items-start gap-3">
                                                                <span className="mt-[8px] w-[6px] h-[6px] rounded-full bg-purple-400 shrink-0" />
                                                                <span className="type-body leading-relaxed">
                                                                    {point}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
