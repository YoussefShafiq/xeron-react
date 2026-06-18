import HeroSection from '@/components/home/HeroSection';
import WhoWeAreSection from '@/components/home/WhoWeAreSection';
import HomeDataSections from '@/components/home/HomeDataSections';
import ContactSection from '@/components/home/ContactSection';

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <WhoWeAreSection />
            <HomeDataSections />
            <ContactSection />
        </>
    );
}
