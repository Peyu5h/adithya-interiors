import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

const faqs = [
  {
    question: "What areas do you serve in Mumbai?",
    answer:
      "We provide interior design and construction services across Mumbai, including Malad, Kandivali, Andheri, Borivali, and nearby suburbs.",
  },
  {
    question: "Do you handle both residential and commercial projects?",
    answer:
      "Yes, we specialize in residential, commercial, and office interiors, as well as renovation and turnkey construction projects.",
  },
  {
    question: "Can you manage end-to-end execution, including civil work?",
    answer:
      "Absolutely. We offer complete solutions from design to execution, including civil work, carpentry, electrical, plumbing, and painting.",
  },
  {
    question: "How do you ensure project timelines and quality?",
    answer:
      "We use detailed project planning, quality materials, and experienced teams to ensure timely delivery and high-quality results.",
  },
  {
    question: "How do I get a quote or start my project?",
    answer:
      "Contact us for a free consultation. We'll discuss your requirements, visit your site, and provide a detailed proposal and estimate.",
  },
];

export function AccordionFAQ() {
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
