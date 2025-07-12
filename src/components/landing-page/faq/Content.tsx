import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { FAQItem } from "~/lib/data/data";

interface AccordionFAQProps {
  faqs: FAQItem[];
}

export function AccordionFAQ({ faqs }: AccordionFAQProps) {
  return (
    <Accordion type="single" collapsible className="w-full text-start">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index + 1}`}>
          <AccordionTrigger className="text-start text-lg md:text-xl">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-mutedGray text-[16px]">{faq.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
