// import { Button } from "@/components/ui/button"
import { Button } from "@/components/ui/button";
import { routesPath } from "@/utils/route-path";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const { DASHBOARD } = routesPath;

export default function PageNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="container mx-auto flex max-w-[64rem] flex-col items-center px-4 py-16 text-center sm:py-32 md:px-8">
        <h1 className="mb-4 text-6xl font-bold sm:text-7xl md:text-8xl">404</h1>
        <h2 className="mb-8 text-2xl font-semibold sm:text-3xl md:text-4xl">
          Page Not Found
        </h2>
        <p className="mb-8 max-w-lg text-muted-foreground sm:text-lg">
          The page you are looking for does not exist or has been moved. Please
          check the URL or return to the dashboard.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link to={DASHBOARD}>Go to Dashboard</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
