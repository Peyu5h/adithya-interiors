"use client";

import React, { useCallback, useEffect, useState, type JSX } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { ChevronRight } from "lucide-react";
import {
  AnimatePresence,
  MotionProps,
  Variants,
  motion,
  useAnimation,
} from "motion/react";

import { cn } from "~/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "~/components/ui/carousel";

interface Tip {
  text: string;
  image: string;
  url?: string;
}

export interface ComponentProps {
  tips?: Tip[];
  className?: string;
  autoplayInterval?: number;
  showNavigation?: boolean;
  showIndicators?: boolean;
  showProgress?: boolean;
  aspectRatio?: "video" | "square" | "wide";
  textPosition?: "top" | "bottom";
  onTipChange?: (index: number) => void;
  backgroundTips?: boolean;
  backgroundGradient?: boolean;
  shuffleTips?: boolean;
  animateText?: boolean;
}

const defaultTips: Tip[] = [
  {
    text: "Backend snippets. Shadcn style headless components.. but for your backend.",
    image:
      "https://www.cult-ui.com/_next/image?url=%2Fplaceholders%2Fcult-snips.png&w=1080&q=75",
    url: "https://www.newcult.co/backend",
  },
  {
    text: "Create your first directory app today. AI batch scripts to process 100s of urls in seconds.",
    image:
      "https://www.cult-ui.com/_next/image?url=%2Fplaceholders%2Fcult-dir.png&w=1080&q=75",
    url: "https://www.newcult.co/templates/cult-seo",
  },
  {
    text: "Cult landing page template. Framer motion, shadcn, and tailwind.",
    image:
      "https://www.cult-ui.com/_next/image?url=%2Fplaceholders%2Fcult-rune.png&w=1080&q=75",
    url: "https://www.newcult.co/templates/cult-landing-page",
  },
  {
    text: "Vector embeddings, semantic search, and chat based vector retrieval on easy mode.",
    image:
      "https://www.cult-ui.com/_next/image?url=%2Fplaceholders%2Fcult-manifest.png&w=1080&q=75",
    url: "https://www.newcult.co/templates/manifest",
  },
  {
    text: "SEO analysis app. Scraping, analysis, insights, and AI recommendations.",
    image:
      "https://www.cult-ui.com/_next/image?url=%2Fplaceholders%2Fcult-seo.png&w=1080&q=75",
    url: "https://www.newcult.co/templates/cult-seo",
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const carouselVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } },
};

const aspectRatioClasses = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[2/1]",
};

type TextScrambleProps = {
  children: string;
  duration?: number;
  speed?: number;
  characterSet?: string;
  as?: React.ElementType;
  className?: string;
  trigger?: boolean;
  onScrambleComplete?: () => void;
} & MotionProps;

const defaultChars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  characterSet = defaultChars,
  className,
  as: Element = "p",
  trigger = true,
  onScrambleComplete,
  ...props
}: TextScrambleProps) {
  const MotionComponent = motion.create(Element as keyof JSX.IntrinsicElements);
  const [displayText, setDisplayText] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const text = children;

  const scramble = useCallback(async () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const steps = duration / speed;
    let step = 0;

    const interval = setInterval(() => {
      let scrambled = "";
      const progress = step / steps;

      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          scrambled += " ";
          continue;
        }

        if (progress * text.length > i) {
          scrambled += text[i];
        } else {
          scrambled +=
            characterSet[Math.floor(Math.random() * characterSet.length)];
        }
      }

      setDisplayText(scrambled);
      step++;

      if (step > steps) {
        clearInterval(interval);
        setDisplayText(text);
        setIsAnimating(false);
        onScrambleComplete?.();
      }
    }, speed * 1000);
    return () => clearInterval(interval);
  }, [isAnimating, duration, speed, text, characterSet, onScrambleComplete]);

  useEffect(() => {
    if (!trigger) return;
    let clearScramble: (() => void) | undefined;
    scramble().then((clear) => (clearScramble = clear));
    return () => {
      if (clearScramble) clearScramble();
    };
  }, [trigger, scramble]);

  return (
    <MotionComponent className={className} {...props}>
      {displayText}
    </MotionComponent>
  );
}

export function Component({
  onTipChange,
  className,
  tips = defaultTips,
  showProgress = true,
  aspectRatio = "video",
  showNavigation = false,
  showIndicators = true,
  backgroundTips = false,
  textPosition = "bottom",
  autoplayInterval = 4500,
  backgroundGradient = false,
  shuffleTips = false,
  animateText = true,
}: ComponentProps) {
  const [progress, setProgress] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const controls = useAnimation();
  const [displayTips] = useState(() =>
    shuffleTips ? shuffleArray(tips) : tips,
  );

  const autoplay = Autoplay({
    delay: autoplayInterval,
    stopOnInteraction: false,
  });

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());
    setDirection(
      api.scrollSnapList().indexOf(api.selectedScrollSnap()) - current,
    );

    const onSelect = () => {
      const newIndex = api.selectedScrollSnap();
      setCurrent(newIndex);
      setDirection(api.scrollSnapList().indexOf(newIndex) - current);
      onTipChange?.(newIndex);
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, current, onTipChange]);

  useEffect(() => {
    if (!showProgress) return;

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = 2;
        return Math.min(oldProgress + diff, 100);
      });
    }, autoplayInterval / 50);

    return () => {
      clearInterval(timer);
    };
  }, [showProgress, autoplayInterval]);

  useEffect(() => {
    if (progress === 100) {
      controls.start({ scaleX: 0 }).then(() => {
        setProgress(0);
        controls.set({ scaleX: 1 });
      });
    } else {
      controls.start({ scaleX: progress / 100 });
    }
  }, [progress, controls]);

  const handleSelect = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "bg-muted mx-auto w-full max-w-7xl rounded-lg shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]",
        className,
      )}
    >
      <div className="w-full overflow-hidden rounded-lg">
        <Carousel
          setApi={setApi}
          plugins={[autoplay]}
          className="relative w-full"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            <AnimatePresence initial={false} custom={direction}>
              {(displayTips || []).map((tip, index) => (
                <CarouselItem key={index}>
                  <motion.div
                    variants={carouselVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={direction}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className={`relative ${aspectRatioClasses[aspectRatio]} w-full overflow-hidden`}
                  >
                    <Image
                      src={tip.image}
                      alt={`Visual representation for tip: ${tip.text}`}
                      fill
                      className="object-cover"
                      priority
                    />
                    {backgroundGradient && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    )}

                    {backgroundTips ? (
                      <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        className={`absolute ${
                          textPosition === "top" ? "top-0" : "bottom-0"
                        } right-0 left-0 p-4 sm:p-6 md:p-8`}
                      >
                        {displayTips[current]?.url ? (
                          <a
                            href={displayTips[current]?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <p className="text-center text-base leading-relaxed font-medium tracking-tight text-white sm:text-lg md:text-left md:text-xl lg:text-2xl lg:font-bold">
                              {tip.text}
                            </p>
                          </a>
                        ) : (
                          <p className="text-center text-base leading-relaxed font-medium tracking-tight text-white sm:text-lg md:text-left md:text-xl lg:text-2xl lg:font-bold">
                            {tip.text}
                          </p>
                        )}
                      </motion.div>
                    ) : null}
                  </motion.div>
                </CarouselItem>
              ))}
            </AnimatePresence>
          </CarouselContent>
        </Carousel>
        <div
          className={cn(
            "bg-muted p-4",
            showIndicators && !backgroundTips ? "lg:px-4 lg:py-2" : "",
          )}
        >
          <div
            className={cn(
              "flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0",
              showIndicators && !backgroundTips
                ? "items-start gap-3 space-y-2 sm:flex-col"
                : "",
            )}
          >
            {showIndicators && (
              <div className="flex w-full space-x-2 overflow-x-auto pb-2 sm:w-auto sm:pb-0">
                {(displayTips || []).map((_, index) => (
                  <motion.button
                    key={index}
                    className={`h-1 w-8 flex-shrink-0 rounded-full ${
                      index === current ? "bg-accent" : "bg-muted"
                    }`}
                    initial={false}
                    animate={{
                      backgroundColor:
                        index === current ? "#3D3D3E" : "#FFFEF8",
                    }}
                    transition={{ duration: 0.5 }}
                    onClick={() => handleSelect(index)}
                    aria-label={`Go to tip ${index + 1}`}
                  />
                ))}
              </div>
            )}
            <div className="text-primary flex items-center space-x-2 whitespace-nowrap">
              {backgroundTips ? (
                <span className="text-sm font-medium">
                  Tip {current + 1}/{displayTips?.length || 0}
                </span>
              ) : (
                <div className="flex flex-col">
                  {displayTips[current]?.url ? (
                    <a
                      href={displayTips[current]?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium tracking-tight lg:text-2xl xl:font-semibold"
                    >
                      {animateText ? (
                        <TextScramble
                          key={displayTips[current]?.text}
                          duration={1.2}
                          characterSet=". "
                        >
                          {displayTips[current]?.text || ""}
                        </TextScramble>
                      ) : (
                        displayTips[current]?.text
                      )}
                    </a>
                  ) : (
                    <span className="text-base font-medium tracking-tight lg:text-2xl xl:font-semibold">
                      {animateText ? (
                        <TextScramble
                          key={displayTips[current]?.text}
                          duration={1.2}
                          characterSet=". "
                        >
                          {displayTips[current]?.text || ""}
                        </TextScramble>
                      ) : (
                        displayTips[current]?.text
                      )}
                    </span>
                  )}
                </div>
              )}
              {backgroundTips && <ChevronRight className="h-4 w-4" />}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

Component.displayName = "Component";
