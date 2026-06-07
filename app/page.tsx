import Loader from "@/components/Loader";
import ResponsiveApp from "@/components/ResponsiveApp";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Loader />
      <ResponsiveApp />
    </main>
  );
}
