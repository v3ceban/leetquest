import PropTypes from "prop-types";
import { AuthButton } from "@/components/auth-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { ArrowRight, Brain, Target, Trophy, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Brain,
    title: "Structured Learning Path",
    description:
      "Progress through carefully curated worlds of coding challenges, from basics to advanced algorithms.",
  },
  {
    icon: Target,
    title: "Targeted Practice",
    description:
      "Focus on specific problem-solving patterns and techniques with our themed worlds.",
  },
  {
    icon: Trophy,
    title: "Track Progress",
    description:
      "Visualize your improvement with detailed statistics and activity heatmaps.",
  },
  {
    icon: Activity,
    title: "Active Learning",
    description:
      "Learn by doing with hands-on practice and immediate feedback on your solutions.",
  },
];

const FeatureCard = ({ icon: Icon, title, description, className }) => {
  return (
    <Card
      className={cn(
        "p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        className,
      )}
    >
      <Icon className="mb-4 w-12 h-12 text-primary" />
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
};
FeatureCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.string,
};

const HomePage = async () => {
  const session = await auth();

  return (
    <main>
      <section className="py-20 md:py-32">
        <div className="flex flex-col gap-12 justify-between items-center lg:flex-row">
          <div className="space-y-8">
            <h1 className="font-bold tracking-tight text-4xl/tight md:text-6xl/tight">
              Master LeetCode,
              <br />
              <span className="text-primary"> One Quest </span>
              at a Time
            </h1>
            <p className="max-w-prose text-xl text-muted-foreground">
              {
                "Transform your coding journey with LeetQuest's gamified learning experience. Navigate through themed worlds, track your progress, and level up your problem-solving skills."
              }
            </p>
            <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
              {session ? (
                <Button size="lg" asChild>
                  <Link href="/dashboard" className="group">
                    Continue Your Quest
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              ) : (
                <AuthButton size="lg" primary className="group">
                  Start Your Quest
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </AuthButton>
              )}
              <Button size="lg" variant="outline" asChild>
                <Link href="/quest">Explore Worlds</Link>
              </Button>
            </div>
          </div>
          <Image
            className="relative w-full rounded-lg shadow-2xl lg:max-w-[400px]"
            src="/img/worlds.webp"
            alt="LeetQuest Worlds Preview"
            width={400}
            height={300}
            priority
          />
        </div>
      </section>

      <section className="py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold">Why Choose LeetQuest?</h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Our platform combines structured learning with gamification to make
            your LeetCode practice more effective and enjoyable.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="overflow-hidden relative p-8 bg-gradient-to-r rounded-3xl md:p-12 from-primary/90 to-primary">
          <div className="relative z-10 mx-auto max-w-3xl text-center text-white">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Ready to Begin Your Coding Adventure?
            </h2>
            <p className="mb-8 text-lg opacity-90 md:text-xl">
              Join our community of developers and start mastering algorithms
              and data structures today.
            </p>
            {session ? (
              <Button size="lg" asChild>
                <Link href="/dashboard" className="group">
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            ) : (
              <AuthButton size="lg" className="group">
                Join LeetQuest
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </AuthButton>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
