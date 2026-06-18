import ServiceCard from './ServiceCard';
import { StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal';

/**
 * ServicesList — renders all services in a responsive grid.
 * Pass `preview={true}` to render only the first 3 (for homepage).
 */
export default function ServicesList({ services = [], preview = false }) {
    const items = preview ? services.slice(0, 3) : services;

    return (
        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((service) => (
                <StaggerItem key={service.slug}>
                    <ServiceCard service={service} />
                </StaggerItem>
            ))}
        </StaggerReveal>
    );
}
