import { useEffect, useState } from 'react';
import ServicesSection from '@/components/home/ServicesSection';
import PortfolioSection from '@/components/home/PortfolioSection';
import HomeCardsSkeleton from '@/components/skeletons/HomeCardsSkeleton';
import { fetchHome } from '@/lib/homeApi';
import { fetchPortfolioList } from '@/lib/portfolioApi';
import { fetchServiceList } from '@/lib/serviceApi';

export default function HomeDataSections() {
    const [portfolios, setPortfolios] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setLoading(true);
            try {
                const home = await fetchHome();
                if (cancelled) return;

                if (home) {
                    setPortfolios(home.portfolios);
                    setServices(home.services);
                } else {
                    const [portfolioList, serviceList] = await Promise.all([
                        fetchPortfolioList(),
                        fetchServiceList(),
                    ]);
                    if (!cancelled) {
                        setPortfolios(portfolioList);
                        setServices(serviceList);
                    }
                }
            } catch (e) {
                console.error('HomeDataSections:', e);
                if (!cancelled) {
                    setPortfolios([]);
                    setServices([]);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, []);

    if (loading) {
        return <HomeCardsSkeleton />;
    }

    return (
        <>
            <ServicesSection services={services} />
            <PortfolioSection portfolios={portfolios} />
        </>
    );
}
