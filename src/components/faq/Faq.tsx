import { AccordionFAQ } from "./Content";

const Faq = () => {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:py-24 xl:pe-4 xl:ps-0">
      <div className="flex flex-col md:flex-row md:gap-24">
        <div className="md:w-1/2">
          <h3 className="text-2xl font-medium tracking-[-0.2px] md:text-[40px] md:leading-[42px] md:tracking-[-1px]">
            FAQ
          </h3>
          <p className="text-foreground3 mb-6 mt-4 max-w-lg text-balance text-xl font-medium md:mb-9">
            Let&apos;s help you with some of your frequently asked questions.
          </p>
          <div className="hidden w-max flex-col md:flex">
            <span className="text-mutedGray text-lg font-medium">
              Couldn&apos;t find your answer?
            </span>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=vignam.edu@gmail.com&su=Question about your service"
              className="text-purple cursor-pointer font-medium hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact us
            </a>
          </div>
        </div>

        <div className="mt-0 md:mt-12 md:w-1/2">
          <AccordionFAQ />
        </div>
      </div>
    </section>
  );
};

export default Faq;
