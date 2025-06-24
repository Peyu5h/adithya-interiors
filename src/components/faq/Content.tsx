import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is Vignam suitable for all educational levels?",
    answer: "Yes, Vignam is designed to support educators and students at all educational levels, from primary school to higher education."
  },
  {
    question: "Can I use Vignam for subjects other than math and science?",
    answer: "Absolutely! While we focus on math and science, Vignam can be adapted to create simulations for various subjects, enhancing learning across disciplines."
  },
  {
    question: "Will I encounter copyright issues with Vignam?",
    answer: "No, you will not encounter copyright issues, as the content you create with Vignam belongs to you."
  },
  {
    question: "How can I export content from Vignam?",
    answer: "You can record your simulations and save them for use in your marketing or educational materials."
  },
  {
    question: "What kind of support does Vignam offer?",
    answer: "We provide comprehensive support through our help center, including tutorials, FAQs, and customer service to assist you with any questions."
  }
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
            <p className="text-mutedGray text-[16px]">
              {faq.answer}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
