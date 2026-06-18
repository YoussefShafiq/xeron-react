import Button from '@/components/ui/Button';

export default function NotFoundPage() {
    return (
        <div className="pt-32 pb-20 px-6 min-h-[60vh] flex items-center justify-center">
            <div className="text-center max-w-lg">
                <h1 className="type-page-title mb-4">404</h1>
                <p className="type-body mb-8">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Button href="/" variant="primary">
                    Back to Home
                </Button>
            </div>
        </div>
    );
}
