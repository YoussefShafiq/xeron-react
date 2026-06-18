import Button from '@/components/ui/Button';
import { HeroReveal, HeroItem } from '@/components/ui/ScrollReveal';

export default function HeroSection() {
    return (
        <section className="relative h-[800px] md:min-h-screen flex items-center justify-center text-center px-[24px] pt-[40px] md:pt-[112px] pb-[40px] md:pb-[80px] overflow-hidden">

            {/* Fallback ambient glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-accent/20 blur-[80px] -z-10 pointer-events-none" />

            <HeroReveal className="relative z-10 max-w-[1200px] mx-auto">
                <HeroItem>
                    <h1 className="type-hero leading-tight mb-[32px] md:mb-[80px]">
                        We Build Digital Solutions That Drive Business Growth
                    </h1>
                </HeroItem>

                <HeroItem>
                    <p className="type-lead max-w-[1200px] mx-auto mb-[40px] md:mb-[80px]">
                        XERON specializes in custom websites, mobile apps, complex systems, and stunning designs.
                    </p>
                </HeroItem>

                <HeroItem>
                    <div className="flex items-center justify-center gap-[24px] md:gap-[40px] flex-wrap">
                        <Button href="/contact" variant="primary">Start Your Project</Button>
                        <Button href="/portfolio" variant="outline">View Our Work</Button>
                    </div>
                </HeroItem>
            </HeroReveal>
        </section>
    );
}
