import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

function StoryImage({ alt }) {
    return (
        <div className="gradient-border-shell gradient-border-shell--glow rounded-[20px] w-full max-w-full mx-auto lg:max-w-none">
            <div className="relative w-full h-full aspect-16/10 md:aspect-video min-h-[220px] md:min-h-[320px] rounded-[16px] overflow-hidden bg-white">
                <img
                    src="/ImagePlaceholder.png"
                    alt={alt}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
        </div>
    );
}

export default function AboutPage() {
    return (
        <div className="pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">

                <div className="max-w-7xl mt-24 mb-24 text-center">
                    <SectionHeader
                        title="The Minds Behind XERON"
                        subtitle="We started as college friends with a shared obsession — technology that actually moves people. That hasn't changed."
                    />
                    <ScrollReveal className="mt-8">
                        <Button href="/contact" variant="primary">Work With Us</Button>
                    </ScrollReveal>
                </div>

                {/* <ScrollReveal className="hidden md:block relative w-full aspect-16/7 rounded-2xl overflow-hidden border border-bg-border mb-24">
                    <img
                        src="/ImagePlaceholder.png"
                        alt="XERON Team"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </ScrollReveal> */}

                <div className="flex flex-col gap-[80px]">

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[40px] md:gap-[56px] lg:gap-[80px] items-stretch">
                        <ScrollReveal direction="left" className="col-span-1 order-1 lg:order-0">
                            <StoryImage alt="Who We Are" />
                        </ScrollReveal>
                        <ScrollReveal direction="right" delay={0.1} className="col-span-1 lg:col-span-2 order-2 lg:order-0 flex flex-col gap-[28px] md:gap-[40px] lg:gap-[54px]">
                            <p className="type-prose">
                                XERON is a full-service digital agency built for startups and entrepreneurs.
                                We design, develop, and brand — websites, mobile apps, and visual identities
                                that make growing businesses impossible to ignore.
                            </p>
                            <p className="type-prose">
                                Born from a college idea in 2022, we turned a friendship and a passion for
                                technology into something real. Today, every project we take on carries that
                                same energy — focused, intentional, and always built to last.
                            </p>
                            {/* <p className="type-prose">
                                Born from a college idea in 2022, we turned a friendship and a passion for
                                technology into something real. Today, every project we take on carries that
                                same energy — focused, intentional, and always built to last.
                            </p> */}
                        </ScrollReveal>
                    </div>

                    {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-[40px] md:gap-[56px] lg:gap-[80px] items-stretch">
                        <ScrollReveal direction="right" className="col-span-1 order-1 lg:order-2">
                            <div className="gradient-border-shell gradient-border-shell--glow rounded-[20px] w-full max-w-full mx-auto lg:max-w-none">
                                <div className="relative w-full h-full aspect-16/10 md:aspect-video min-h-[220px] md:min-h-[320px] rounded-[16px] overflow-hidden bg-white">
                                    <img
                                        src="/ImagePlaceholder.png"
                                        alt="Who We Are"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal direction="left" delay={0.1} className="col-span-1 lg:col-span-2 order-2 lg:order-1 flex flex-col gap-[28px] md:gap-[40px] lg:gap-[54px]">
                            <p className="type-prose">
                                XERON is a full-service digital agency built for startups and entrepreneurs.
                                We design, develop, and brand — websites, mobile apps, and visual identities
                                that make growing businesses impossible to ignore.
                            </p>
                            <p className="type-prose">
                                Born from a college idea in 2022, we turned a friendship and a passion for
                                technology into something real. Today, every project we take on carries that
                                same energy — focused, intentional, and always built to last.
                            </p>
                            <p className="type-prose">
                                Born from a college idea in 2022, we turned a friendship and a passion for
                                technology into something real. Today, every project we take on carries that
                                same energy — focused, intentional, and always built to last.
                            </p>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[40px] md:gap-[56px] lg:gap-[80px] items-stretch">
                        <ScrollReveal direction="left" className="col-span-1 order-1 lg:order-0">
                            <StoryImage alt="Who We Are" />
                        </ScrollReveal>
                        <ScrollReveal direction="right" delay={0.1} className="col-span-1 lg:col-span-2 order-2 lg:order-0 flex flex-col gap-[28px] md:gap-[40px] lg:gap-[54px]">
                            <p className="type-prose">
                                XERON is a full-service digital agency built for startups and entrepreneurs.
                                We design, develop, and brand — websites, mobile apps, and visual identities
                                that make growing businesses impossible to ignore.
                            </p>
                            <p className="type-prose">
                                Born from a college idea in 2022, we turned a friendship and a passion for
                                technology into something real. Today, every project we take on carries that
                                same energy — focused, intentional, and always built to last.
                            </p>
                            <p className="type-prose">
                                Born from a college idea in 2022, we turned a friendship and a passion for
                                technology into something real. Today, every project we take on carries that
                                same energy — focused, intentional, and always built to last.
                            </p>
                        </ScrollReveal>
                    </div> */}

                </div>

                {/* <ScrollReveal className="block md:hidden mt-24">
                    <div className="relative w-full aspect-16/7 rounded-2xl overflow-hidden border border-bg-border">
                        <img
                            src="/ImagePlaceholder.png"
                            alt="XERON Team"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                </ScrollReveal> */}
            </div>
        </div>
    );
}
