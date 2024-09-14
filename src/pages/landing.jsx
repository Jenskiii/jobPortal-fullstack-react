import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import companiesData from "../data/companies.json";
import faqData from "../data/faq.json";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className="text-center">
        {/* title */}
        <h1 className="gradient-title | flex flex-col items-center justify-center text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4">
          Find Your Dream Job{" "}
          <span className="flex items-center gap-2 sm:gap-6">
            and get{" "}
            <img
              src="/logo.png"
              alt="hirrd logo"
              className="h-14 sm:h-24 lg: h32"
            />
          </span>
        </h1>

        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore thousands of job listings or find the perceft candidate
        </p>
      </section>

      {/* BUTTONS */}
      <div className="flex gap-6 justify-center">
        <Link to="/jobs">
          <Button variant="blue" size="xl">
            Find Jobs
          </Button>
        </Link>
        <Link to="/post-job">
          <Button variant="destructive" size="xl">
            Post a Job
          </Button>
        </Link>
      </div>

      {/* CAROUSEL */}
      <Carousel
        className="w-full py-10"
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}>
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companiesData.map(({ name, id, path }) => {
            return (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                <img
                  src={path}
                  alt={`companie logo of ${name}`}
                  className="h-9 sm:h-14 object-contain"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* BANNER */}
      <img
        src="/banner.jpeg"
        alt="man with glasses holding a mobile phone while jumping"
        className="w-full"
      />

      {/* CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* card 1 */}
        <Card>
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>
        {/* card 2 */}
        <Card>
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Postjobs, manage applications, and find the best candidates.</p>
          </CardContent>
        </Card>
      </section>

      {/* accordion */}

      <Accordion type="single" collapsible>
        {faqData.map((faq, index) => {
          return (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </main>
  );
};

export default LandingPage;
