"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import {
  Pen,
  PaintBucket,
  Home,
  Ruler,
  PenTool,
  Building2,
  Award,
  Users,
  Calendar,
  CheckCircle,
  Sparkles,
  Star,
  ArrowRight,
  Zap,
  TrendingUp,
  ArrowRightIcon,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "framer-motion";
import { Button } from "./ui/button";
import Image from "next/image";
import { AboutData } from "~/lib/data/data";

interface AboutUsSectionProps {
  data: AboutData;
}

export default function AboutUsSection({ data }: AboutUsSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Pen":
        return <Pen className="h-6 w-6" />;
      case "Home":
        return <Home className="h-6 w-6" />;
      case "PenTool":
        return <PenTool className="h-6 w-6" />;
      case "PaintBucket":
        return <PaintBucket className="h-6 w-6" />;
      case "Ruler":
        return <Ruler className="h-6 w-6" />;
      case "Building2":
        return <Building2 className="h-6 w-6" />;
      default:
        return <Pen className="h-6 w-6" />;
    }
  };

  const getSecondaryIcon = (iconName: string) => {
    switch (iconName) {
      case "Sparkles":
        return (
          <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-[#A9BBC8]" />
        );
      case "CheckCircle":
        return (
          <CheckCircle className="absolute -top-1 -right-1 h-4 w-4 text-[#A9BBC8]" />
        );
      case "Star":
        return (
          <Star className="absolute -top-1 -right-1 h-4 w-4 text-[#A9BBC8]" />
        );
      default:
        return (
          <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-[#A9BBC8]" />
        );
    }
  };

  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case "Award":
        return <Award />;
      case "Users":
        return <Users />;
      case "Calendar":
        return <Calendar />;
      case "TrendingUp":
        return <TrendingUp />;
      default:
        return <Award />;
    }
  };

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#F2F2EB] to-[#F8F8F2] px-4 py-24 text-[#202e44]"
    >
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-20 left-10 h-64 w-64 rounded-full bg-[#88734C]/5 blur-3xl"
        style={{ y: y1, rotate: rotate1 }}
      />
      <motion.div
        className="absolute right-10 bottom-20 h-80 w-80 rounded-full bg-[#A9BBC8]/5 blur-3xl"
        style={{ y: y2, rotate: rotate2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 h-4 w-4 rounded-full bg-[#88734C]/30"
        animate={{
          y: [0, -15, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute right-1/4 bottom-1/3 h-6 w-6 rounded-full bg-[#A9BBC8]/30"
        animate={{
          y: [0, 20, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="relative z-10 container mx-auto max-w-6xl"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div
          className="mb-6 flex flex-col items-center"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.span
            className="mb-2 flex items-center gap-2 font-medium text-[#88734C]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Zap className="h-4 w-4" />
            {data.section.subtitle}
          </motion.span>
          <h2 className="mb-4 text-center text-4xl font-light md:text-5xl">
            {data.section.title}
          </h2>
          <motion.div
            className="h-1 w-24 bg-[#88734C]"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          ></motion.div>
        </motion.div>

        <motion.p
          className="mx-auto mb-16 max-w-2xl text-center text-[#202e44]/80"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {data.section.description}
        </motion.p>

        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-16">
            {data.services
              .filter((service) => service.position === "left")
              .map((service, index) => (
                <ServiceItem
                  key={`left-${index}`}
                  icon={getIcon(service.icon)}
                  secondaryIcon={getSecondaryIcon(service.secondaryIcon)}
                  title={service.title}
                  description={service.description}
                  delay={index * 0.2}
                  direction="left"
                />
              ))}
          </div>

          {/* Center Image */}
          <div className="order-first mb-8 flex items-center justify-center md:order-none md:mb-0">
            <motion.div
              className="relative w-full max-w-xs"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div
                className="overflow-hidden rounded-md shadow-xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <Image
                  height={3027}
                  width={3027}
                  src="https://images.unsplash.com/photo-1747582411588-f9b4acabe995?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Modern House"
                  className="h-full w-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-[#202e44]/50 to-transparent p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  <Button
                    size={"lg"}
                    effect="expandIcon"
                    icon={ArrowRightIcon}
                    iconPlacement="right"
                    variant={"outline"}
                  >
                    View Portfolio
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div
                className="absolute inset-0 z-[-1] -m-3 rounded-md border-4 border-[#A9BBC8]"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              ></motion.div>

              <motion.div
                className="absolute -top-4 -right-8 h-16 w-16 rounded-full bg-[#88734C]/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                style={{ y: y1 }}
              ></motion.div>
              <motion.div
                className="absolute -bottom-6 -left-10 h-20 w-20 rounded-full bg-[#A9BBC8]/15"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
                style={{ y: y2 }}
              ></motion.div>

              <motion.div
                className="absolute -top-10 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#88734C]"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              ></motion.div>
              <motion.div
                className="absolute -bottom-12 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#A9BBC8]"
                animate={{
                  y: [0, 10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              ></motion.div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-16">
            {data.services
              .filter((service) => service.position === "right")
              .map((service, index) => (
                <ServiceItem
                  key={`right-${index}`}
                  icon={getIcon(service.icon)}
                  secondaryIcon={getSecondaryIcon(service.secondaryIcon)}
                  title={service.title}
                  description={service.description}
                  delay={index * 0.2}
                  direction="right"
                />
              ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          animate={isStatsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {data.stats.map((stat, index) => (
            <StatCounter
              key={index}
              icon={getStatIcon(stat.icon)}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-20 flex flex-col items-center justify-between gap-6 rounded-xl bg-[#202e44] p-8 text-white md:flex-row"
          initial={{ opacity: 0, y: 30 }}
          animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex-1">
            <h3 className="mb-2 text-2xl font-medium">{data.cta.title}</h3>
            <p className="text-white/80">{data.cta.description}</p>
          </div>
          <motion.button
            className="flex items-center gap-2 rounded-lg bg-[#88734C] px-6 py-3 font-medium text-white transition-colors hover:bg-[#88734C]/90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {data.cta.buttonText} <ArrowRight className="h-4 w-4" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

interface ServiceItemProps {
  icon: React.ReactNode;
  secondaryIcon?: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  direction: "left" | "right";
}

function ServiceItem({
  icon,
  secondaryIcon,
  title,
  description,
  delay,
  direction,
}: ServiceItemProps) {
  return (
    <motion.div
      className="group flex flex-col"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="mb-3 flex items-center gap-3"
        initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        <motion.div
          className="relative rounded-lg bg-[#88734C]/10 p-3 text-[#88734C] transition-colors duration-300 group-hover:bg-[#88734C]/20"
          whileHover={{
            rotate: [0, -10, 10, -5, 0],
            transition: { duration: 0.5 },
          }}
        >
          {icon}
          {secondaryIcon}
        </motion.div>
        <h3 className="text-xl font-medium text-[#202e44] transition-colors duration-300 group-hover:text-[#88734C]">
          {title}
        </h3>
      </motion.div>
      <motion.p
        className="pl-12 text-sm leading-relaxed text-[#202e44]/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.4 }}
      >
        {description}
      </motion.p>
      <motion.div
        className="mt-3 flex items-center pl-12 text-xs font-medium text-[#88734C] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
      >
        <span className="flex items-center gap-1">
          Learn more <ArrowRight className="h-3 w-3" />
        </span>
      </motion.div>
    </motion.div>
  );
}

interface StatCounterProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
  delay: number;
}

function StatCounter({ icon, value, label, suffix, delay }: StatCounterProps) {
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: false });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 10,
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value);
      setHasAnimated(true);
    } else if (!isInView && hasAnimated) {
      springValue.set(0);
      setHasAnimated(false);
    }
  }, [isInView, value, springValue, hasAnimated]);

  const displayValue = useTransform(springValue, (latest) =>
    Math.floor(latest),
  );

  return (
    <motion.div
      className="group flex flex-col items-center rounded-xl bg-white/50 p-6 text-center backdrop-blur-sm transition-colors duration-300 hover:bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#202e44]/5 text-[#88734C] transition-colors duration-300 group-hover:bg-[#88734C]/10"
        whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
      >
        {icon}
      </motion.div>
      <motion.div
        ref={countRef}
        className="flex items-center text-3xl font-bold text-[#202e44]"
      >
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </motion.div>
      <p className="mt-1 text-sm text-[#202e44]/70">{label}</p>
      <motion.div className="mt-3 h-0.5 w-10 bg-[#88734C] transition-all duration-300 group-hover:w-16" />
    </motion.div>
  );
}
