import { motion } from "motion/react";
import { TestimonialsColumn } from "./testimonials-columns-1";
import { TestimonialsData } from "~/lib/data/data";

interface TestimonialsProps {
  data: TestimonialsData;
}

export const Testimonials = ({ data }: TestimonialsProps) => {
  const firstColumn = data.items.slice(0, 3);
  const secondColumn = data.items.slice(3, 6);
  const thirdColumn = data.items.slice(6, 9);

  return (
    <section className="relative my-20">
      <div className="z-10 container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-[540px] flex-col items-center justify-center"
        >
          <div className="flex justify-center">
            <div className="rounded-lg border px-4 py-1">Testimonials</div>
          </div>

          <h2 className="mt-5 text-2xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            {data.section.title}
          </h2>
          <p className="mt-2 text-center opacity-75 md:mt-5">
            {data.section.subtitle}
          </p>
        </motion.div>

        <div className="mt-10 flex max-h-[740px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};
