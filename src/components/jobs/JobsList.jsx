import SectionHeader from '@/components/ui/SectionHeader';
import JobCard from '@/components/jobs/JobCard';
import { StaggerReveal, StaggerItem } from '@/components/ui/ScrollReveal';
import { jobs } from '@/data/jobs';

export default function JobsList() {
    return (
        <div className="pt-32 pb-20 px-6">
            <div className="max-w-7xl mt-24 mx-auto">
                <SectionHeader
                    title="Join the Team"
                    subtitle="We're always looking for people who care about craft, move fast, and want their work to matter."
                    centered
                />

                {jobs.length > 0 ? (
                    <StaggerReveal className="mt-16 flex flex-col gap-5">
                        {jobs.map((job) => (
                            <StaggerItem key={job.slug}>
                                <JobCard job={job} />
                            </StaggerItem>
                        ))}
                    </StaggerReveal>
                ) : (
                    <StaggerReveal className="mt-16">
                        <div className="text-center py-20 bg-bg-card border border-bg-border rounded-2xl">
                            <p className="type-body text-center">
                                No open positions right now — check back soon.
                            </p>
                        </div>
                    </StaggerReveal>
                )}
            </div>
        </div>
    );
}
