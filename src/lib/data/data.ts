export interface LandingPageData {
  navigation: NavigationData;
  hero: HeroData;
  about: AboutData;
  services: ServicesData;
  projects: ProjectsData;
  testimonials: TestimonialsData;
  faq: FAQData;
  footer: FooterData;
  chatbot: ChatbotData;
  partners: PartnersData;
}

export interface NavigationData {
  logo: {
    text: string;
    highlight: string;
  };
  menuItems: MenuItem[];
  contactButton: {
    text: string;
  };
}

export interface MenuItem {
  name: string;
  href: string;
}

export interface HeroData {
  badge: string;
  title1: string;
  title2: string;
  subtitle?: string;
}

export interface AboutData {
  section: {
    title: string;
    subtitle: string;
    description: string;
  };
  services: ServiceItem[];
  stats: StatItem[];
  cta: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export interface ServiceItem {
  icon: string;
  secondaryIcon: string;
  title: string;
  description: string;
  position: "left" | "right";
}

export interface StatItem {
  icon: string;
  value: number;
  label: string;
  suffix: string;
}

export interface ServicesData {
  title: string;
  subtitle: string;
  description: string;
  tabs: ServiceTab[];
}

export interface ServiceTab {
  id: string;
  label: string;
  image: string;
  content: string[];
}

export interface ProjectsData {
  section: {
    title: string;
    subtitle: string;
  };
  carousel: ProjectSlide[];
  gallery: ProjectCard[];
}

export interface ProjectSlide {
  title: string;
  description: string;
  src: string;
}

export interface ProjectCard {
  id: number;
  title: string;
  location: string;
  fullLocation: string;
  thumbnail: string;
  images: string[];
  description: string;
  technologies: string[];
  completedDate: string;
  url: string;
  className: string;
}

export interface TestimonialsData {
  section: {
    title: string;
    subtitle: string;
  };
  items: TestimonialItem[];
}

export interface TestimonialItem {
  text: string;
  image: string;
  name: string;
  role: string;
}

export interface FAQData {
  section: {
    title: string;
    subtitle: string;
    description: string;
  };
  items: FAQItem[];
  contact: {
    text: string;
    email: string;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FooterData {
  company: {
    name: string;
    tagline: string;
    description: string;
  };
  navigation: {
    company: FooterNavItem[];
    contact: FooterContactItem[];
  };
  social: SocialItem[];
  legal: {
    terms: string;
    privacy: string;
    copyright: string;
  };
}

export interface FooterNavItem {
  text: string;
  href: string;
}

export interface FooterContactItem {
  type: string;
  value: string;
}

export interface SocialItem {
  platform: string;
  href: string;
  icon: string;
  label: string;
  sublabel: string;
}

export interface ChatbotData {
  title: {
    english: string;
    marathi: string;
  };
  placeholder: {
    english: string;
    marathi: string;
  };
  newChat: {
    english: string;
    marathi: string;
  };
  exampleMessages: {
    english: string[];
    marathi: string[];
  };
  context: string;
}

export interface PartnersData {
  section: {
    title: string;
    subtitle: string;
  };
  logos: string[];
}

export const landingPageData: LandingPageData = {
  navigation: {
    logo: {
      text: "ADITHYA",
      highlight: "CONSTRUCTIONS & INTERIOR WORKS",
    },
    menuItems: [
      { name: "HOME", href: "/" },
      { name: "ABOUT US", href: "/about" },
      { name: "PROJECTS", href: "/projects" },
      { name: "SERVICES", href: "/services" },
      { name: "BLOGS", href: "/blog" },
    ],
    contactButton: {
      text: "Contact Now",
    },
  },
  hero: {
    badge: "ADITHYA CONSTRUCTIONS & INTERIOR WORKS",
    title1: "Elevate Your",
    title2: "Home's Vision",
    subtitle:
      "Mumbai's One-Stop Provider for Premium Home Interior Solutions, Backed by 35+ Years of Unparalleled Trust & Expertise in Civil work, Carpentry Work and Complete Home Renovations",
  },
  about: {
    section: {
      title: "About Us",
      subtitle: "DISCOVER OUR STORY",
      description:
        "We are a passionate team of designers and architects dedicated to creating beautiful, functional spaces that inspire and elevate everyday living. With attention to detail and commitment to excellence, we transform visions into reality.",
    },
    services: [
      {
        icon: "Pen",
        secondaryIcon: "Sparkles",
        title: "Interior",
        description:
          "Transform your living spaces with our expert interior design services. We blend functionality and aesthetics to create spaces that reflect your unique style and personality.",
        position: "left",
      },
      {
        icon: "Home",
        secondaryIcon: "CheckCircle",
        title: "Exterior",
        description:
          "Make a lasting impression with stunning exterior designs that enhance curb appeal and create harmonious connections between architecture and landscape.",
        position: "left",
      },
      {
        icon: "PenTool",
        secondaryIcon: "Star",
        title: "Design",
        description:
          "Our innovative design process combines creativity with practicality, resulting in spaces that are both beautiful and functional for everyday living.",
        position: "left",
      },
      {
        icon: "PaintBucket",
        secondaryIcon: "Sparkles",
        title: "Decoration",
        description:
          "Elevate your space with our curated decoration services. From color schemes to textiles and accessories, we perfect every detail to bring your vision to life.",
        position: "right",
      },
      {
        icon: "Ruler",
        secondaryIcon: "CheckCircle",
        title: "Planning",
        description:
          "Our meticulous planning process ensures every project runs smoothly from concept to completion, with careful attention to timelines, budgets, and requirements.",
        position: "right",
      },
      {
        icon: "Building2",
        secondaryIcon: "Star",
        title: "Execution",
        description:
          "Watch your dream space come to life through our flawless execution. Our skilled team handles every aspect of implementation with precision and care.",
        position: "right",
      },
    ],
    stats: [
      { icon: "Award", value: 150, label: "Projects Completed", suffix: "+" },
      { icon: "Users", value: 1200, label: "Happy Clients", suffix: "+" },
      { icon: "Calendar", value: 12, label: "Years Experience", suffix: "" },
      {
        icon: "TrendingUp",
        value: 98,
        label: "Satisfaction Rate",
        suffix: "%",
      },
    ],
    cta: {
      title: "Ready to transform your space?",
      description: "Let's create something beautiful together.",
      buttonText: "Get Started",
    },
  },
  services: {
    title: "Why Choose Us?",
    subtitle: "One Stop Solution for All",
    description:
      "We are a Mumbai-based interior design and construction company, delivering exceptional spaces for homes, offices, and commercial projects.",
    tabs: [
      {
        id: "renovation",
        label: "Home renovation",
        image:
          "https://res.cloudinary.com/dkysrpdi6/image/upload/v1750003031/Interior_design_un5sgo.gif",
        content: [
          "Complete renovation and remodeling services",
          "Civil work, painting, electrical, and plumbing",
          "Hassle-free upgrades for homes and businesses",
          "Transparent pricing and dedicated support",
        ],
      },
      {
        id: "false_ceiling",
        label: "FALSE CEILING",
        image:
          "https://res.cloudinary.com/dkysrpdi6/image/upload/v1750003031/Interior_design_un5sgo.gif",
        content: [
          "Innovative false ceiling designs for aesthetic appeal",
          "Variety of materials including gypsum, POP, and more",
          "Expert installation for homes and commercial spaces",
          "Enhanced lighting and sound insulation solutions",
        ],
      },
      {
        id: "tiling",
        label: "Flooring & TILING",
        image:
          "https://res.cloudinary.com/dkysrpdi6/image/upload/v1750003031/Interior_design_un5sgo.gif",
        content: [
          "Professional tiling services for floors and walls",
          "Wide range of tile options including ceramic, porcelain, and natural stone",
          "Precision installation for a flawless finish",
          "Grouting and sealing for durability and easy maintenance",
        ],
      },
      {
        id: "electric_work",
        label: "ELECTRIC WORK",
        image:
          "https://res.cloudinary.com/dkysrpdi6/image/upload/v1750003031/Interior_design_un5sgo.gif",
        content: [
          "Comprehensive electrical solutions for new and renovated spaces",
          "Wiring, lighting, power outlets, and panel installations",
          "Safety compliance and energy-efficient solutions",
          "Experienced electricians for reliable service",
        ],
      },
      {
        id: "plumbing",
        label: "PLUMBING",
        image:
          "https://res.cloudinary.com/dkysrpdi6/image/upload/v1750003031/Interior_design_un5sgo.gif",
        content: [
          "Complete plumbing installations and repairs",
          "Water supply, drainage, and fixture fittings",
          "Leak detection and pipe replacement",
          "Quality workmanship for lasting solutions",
        ],
      },
      {
        id: "trolly",
        label: "Kitchen TROLLY",
        image:
          "https://res.cloudinary.com/dkysrpdi6/image/upload/v1750003031/Interior_design_un5sgo.gif",
        content: [
          "Customized kitchen trolleys for optimal storage",
          "High-quality materials for durability and style",
          "Space-saving designs for modern kitchens",
          "Seamless integration with existing kitchen layouts",
        ],
      },
      {
        id: "panelling_tv_ac",
        label: "PANELLING",
        image:
          "https://res.cloudinary.com/dkysrpdi6/image/upload/v1750003031/Interior_design_un5sgo.gif",
        content: [
          "Custom paneling solutions for TVs and ACs",
          "Elegant designs to conceal wires and enhance aesthetics",
          "Variety of materials and finishes to match your decor",
          "Integrated storage and display options",
        ],
      },
    ],
  },
  projects: {
    section: {
      title: "OUR PROJECTS",
      subtitle: "Take a look at our finest work",
    },
    carousel: [
      {
        title: "Office Interior",
        description:
          "Modern office interiors that boost productivity and reflect your brand.",
        src: "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717552/biju/images-homemaker/7-820x999_l6ybry.jpg",
      },
      {
        "title": "Modular Kitchen",
        "description": "Efficient and stylish modular kitchens designed for modern living.",
        "src": "https://res.cloudinary.com/dkb3a9r9k/image/upload/pyx-photography-6LhCo9Beqow-unsplash_ulupgc"
      },
      {
        "title": "Complete End-to-End Home Renovation",
        "description": "Seamless, comprehensive home renovation services from concept to completion.",
        "src": "https://res.cloudinary.com/dkb3a9r9k/image/upload/3d-rendering-modern-dining-room-living-room-with-luxury-decor_ji9okg"
      },
      {
        "title": "Bathroom Remodeling",
        "description": "Modern and functional bathroom remodels for a refreshing space.",
        "src": "https://res.cloudinary.com/dkb3a9r9k/image/upload/lotus-design-n-print-g51F6-WYzyU-unsplash_bzhdmt"
      },
      {
        title: "Vastu Interiors",
        description:
          "Interiors designed with Vastu principles for harmony and prosperity.",
        src: "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717565/biju/images-homemaker/Enscape_2024-03-20-16-37-41_Enscape-scene-5-850x540_p26ucs.png",
      },
      {
        title: "NRI Interior Services",
        description:
          "Specialized interior solutions for NRIs, tailored to your unique needs.",
        src: "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717508/biju/images-homemaker/5-820x999_xhuwu6.jpg",
      },
      {
        "title": "Bathroom Remodeling",
        "description": "Modern and functional bathroom remodels for a refreshing space.",
        "src": "http://googleusercontent.com/image_collection/image_retrieval/9904266841231188559"
      },
      {
        title: "Commercial Spaces",
        description:
          "Functional and stylish commercial interiors for all business needs.",
        src: "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717566/biju/images-homemaker/WhatsApp-Image-2023-06-19-at-5.32.12-PM-1-850x540_yvg45d.jpg",
      },
    ],
    gallery: [
      {
        id: 1,
        title: "Office Interior",
        location: "Andheri, Mumbai",
        fullLocation:
          "Andheri - Project At Mahindra Vicino - Malad West, Mumbai",
        thumbnail:
          "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717568/biju/images-homemaker/WhatsApp-Image-2024-11-07-at-16.20.28_d400f443-scaled-1-850x540_qmosd1.png",
        images: [
          "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717568/biju/images-homemaker/WhatsApp-Image-2024-11-07-at-16.20.28_d400f443-scaled-1-850x540_qmosd1.png",
          "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
        ],
        description:
          "Modern office interior design with advanced ergonomic solutions and contemporary aesthetics. This space combines functionality with style to create an inspiring work environment.",
        technologies: ["Interior Design", "Space Planning", "Ergonomics"],
        completedDate: "2024-03-15",
        url: "https://example.com",
        className: "md:col-span-1",
      },
      {
        id: 2,
        title: "House above the clouds",
        location: "Bandra, Mumbai",
        fullLocation: "Bandra - Sea View Apartment - Mumbai",
        thumbnail:
          "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717565/biju/images-homemaker/pexels-abhishek-3858771-6993194-850x540_sycdid.jpg",
        images: [
          "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717565/biju/images-homemaker/pexels-abhishek-3858771-6993194-850x540_sycdid.jpg",
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop",
        ],
        description:
          "Perched high above the world, this house offers breathtaking views and a unique living experience. It's a place where the sky meets home, and tranquility is a way of life.",
        technologies: ["Architecture", "Residential Design", "Luxury Living"],
        completedDate: "2024-01-20",
        url: "https://example.com",
        className: "col-span-1",
      },
      {
        id: 3,
        title: "Greens all over",
        location: "Lonavala, Pune",
        fullLocation: "Lonavala - Hillside Villa - Pune",
        thumbnail:
          "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717565/biju/images-homemaker/Enscape_2024-03-20-16-37-41_Enscape-scene-5-850x540_p26ucs.png",
        images: [
          "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717565/biju/images-homemaker/Enscape_2024-03-20-16-37-41_Enscape-scene-5-850x540_p26ucs.png",
          "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        ],
        description:
          "A house surrounded by greenery and nature's beauty. It's the perfect place to relax, unwind, and enjoy life in harmony with the natural environment.",
        technologies: [
          "Sustainable Design",
          "Landscape Architecture",
          "Green Building",
        ],
        completedDate: "2024-02-10",
        url: "https://example.com",
        className: "col-span-1",
      },
      {
        id: 4,
        title: "Rivers are serene",
        location: "Alibaug, Raigad",
        fullLocation: "Alibaug - Riverside Retreat - Raigad",
        thumbnail:
          "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751727622/biju/images-homemaker/spacejoy-PyeXkOVmG1Y-unsplash_rr8k4o.jpg",
        images: [
          "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751727622/biju/images-homemaker/spacejoy-PyeXkOVmG1Y-unsplash_rr8k4o.jpg",
          "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&h=600&fit=crop",
        ],
        description:
          "A house by the river is a place of peace and tranquility. It's the perfect place to relax, unwind, and enjoy life by the water.",
        technologies: [
          "Waterfront Design",
          "Residential Architecture",
          "Natural Integration",
        ],
        completedDate: "2024-04-05",
        url: "https://example.com",
        className: "md:col-span-2",
      },
      {
        id: 5,
        title: "Modern Living Space",
        location: "Juhu, Mumbai",
        fullLocation: "Juhu - Contemporary Loft - Mumbai",
        thumbnail:
          "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717564/biju/images-homemaker/bjgva8mlgjibf7j50o4n-scaled-1-850x540_yeqvgr.png",
        images: [
          "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751717564/biju/images-homemaker/bjgva8mlgjibf7j50o4n-scaled-1-850x540_yeqvgr.png",
          "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&h=600&fit=crop",
        ],
        description:
          "Contemporary living space with clean lines and modern amenities. This design showcases the perfect balance of comfort and style.",
        technologies: ["Modern Design", "Interior Architecture", "Smart Home"],
        completedDate: "2024-05-12",
        url: "https://example.com",
        className: "md:col-span-1",
      },
    ],
  },
  testimonials: {
    section: {
      title: "What our clients say",
      subtitle: "See what our customers have to say about us.",
    },
    items: [
      {
        text: "This ERP revolutionized our operations, streamlining finance and inventory. The cloud-based platform keeps us productive, even remotely.",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
        name: "Briana Patton",
        role: "Operations Manager",
      },
      {
        text: "Implementing this ERP was smooth and quick. The customizable, user-friendly interface made team training effortless.",
        image: "https://randomuser.me/api/portraits/men/2.jpg",
        name: "Bilal Ahmed",
        role: "IT Manager",
      },
      {
        text: "The support team is exceptional, guiding us through setup and providing ongoing assistance, ensuring our satisfaction.",
        image: "https://randomuser.me/api/portraits/women/3.jpg",
        name: "Saman Malik",
        role: "Customer Support Lead",
      },
      {
        text: "This ERP's integration enhanced our business operations and efficiency. Highly recommend for its intuitive interface.",
        image: "https://randomuser.me/api/portraits/men/4.jpg",
        name: "Omar Raza",
        role: "CEO",
      },
      {
        text: "Its robust features and quick support have transformed our workflow, making us significantly more efficient.",
        image: "https://randomuser.me/api/portraits/women/5.jpg",
        name: "Zainab Hussain",
        role: "Project Manager",
      },
      {
        text: "The smooth implementation exceeded expectations. It streamlined processes, improving overall business performance.",
        image: "https://randomuser.me/api/portraits/women/6.jpg",
        name: "Aliza Khan",
        role: "Business Analyst",
      },
      {
        text: "Our business functions improved with a user-friendly design and positive customer feedback.",
        image: "https://randomuser.me/api/portraits/men/7.jpg",
        name: "Farhan Siddiqui",
        role: "Marketing Director",
      },
      {
        text: "They delivered a solution that exceeded expectations, understanding our needs and enhancing our operations.",
        image: "https://randomuser.me/api/portraits/women/8.jpg",
        name: "Sana Sheikh",
        role: "Sales Manager",
      },
      {
        text: "Using this ERP, our online presence and conversions significantly improved, boosting business performance.",
        image: "https://randomuser.me/api/portraits/men/9.jpg",
        name: "Hassan Ali",
        role: "E-commerce Manager",
      },
    ],
  },
  faq: {
    section: {
      title: "FAQ",
      subtitle:
        "Answers to common questions about our interior design and construction services in Mumbai.",
      description: "Couldn't find your answer?",
    },
    items: [
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
    ],
    contact: {
      text: "Contact us",
      email: "info@yourcompany.com",
    },
  },
  footer: {
    company: {
      name: "ADITHYA INTERIORS",
      tagline: "CRAFTING SPACES & DREAMS",
      description: "Your one-stop solution for all interior needs.",
    },
    navigation: {
      company: [
        { text: "Home", href: "/" },
        { text: "Services", href: "/services" },
        { text: "Projects", href: "/projects" },
        { text: "Blog", href: "/blog" },
      ],
      contact: [
        { type: "email", value: "contact@adithyainteriors.com" },
        { type: "email", value: "info@adithyainteriors.com" },
      ],
    },
    social: [
      {
        platform: "Instagram",
        href: "#",
        icon: "FaInstagram",
        label: "Instagram",
        sublabel: "Follow us on",
      },
      {
        platform: "Facebook",
        href: "#",
        icon: "FaFacebook",
        label: "Facebook",
        sublabel: "Follow us on",
      },
      {
        platform: "Twitter",
        href: "#",
        icon: "FaTwitter",
        label: "Twitter",
        sublabel: "Follow us on",
      },
    ],
    legal: {
      terms: "Terms and Conditions",
      privacy: "Privacy Policy",
      copyright: "© 2024 Adithya Interiors. All rights reserved.",
    },
  },
  chatbot: {
    title: {
      english: "AI ASSISTANT",
      marathi: "एआय सहाय्यक",
    },
    placeholder: {
      english: "Ask about Adithya Interiors...",
      marathi: "एदिथ्या इंटीरियर्सबद्दल विचारा...",
    },
    newChat: {
      english: "New Chat",
      marathi: "नवीन चॅट",
    },
    exampleMessages: {
      english: [
        "How experienced are your workers?",
        "Which areas do you serve?",
        "What services do you offer?",
        "Do you work in Kandivali?",
        "Do you work in Malad?",
        "Are your workers certified?",
      ],
      marathi: [
        "तुमचे कामगार किती अनुभवी आहेत?",
        "तुम्ही कोणत्या भागात सेवा देता?",
        "तुम्ही कोणत्या सेवा देता?",
        "कांदिवलीत काम करता का?",
        "मलाडमध्ये काम करता का?",
        "तुमचे कामगार प्रमाणित आहेत का?",
      ],
    },
    context:
      "You are a smart, friendly, and highly professional chatbot for Adithya Interiors, a top-tier, Awwwards-level SaaS agency website for interior and construction design. The company specializes in local construction and interior services such as false ceiling, wardrobe, readymade and custom furniture, civil work, architectural solutions, turnkey projects, aluminium fabrication, painting, plumbing, electrical, grill fabrication, POP, and carpentry works. The business is based in Mumbai, serving areas including Kandivali, Malad, Borivali, Andheri, Jogeshwari, and Goregaon. Your goal is to help users with: - Service inquiries (e.g., 'Can you do a false ceiling in Malad?') - Local project requests (e.g., 'Best wardrobe design in Kandivali') - SEO/keyword-focused questions (e.g., 'Interior designer near me', 'Affordable interior design in Mumbai') - Company info, contact, and callback requests - Website structure, landing page, and blog navigation - Advice on how to get started, what services are offered, and how to book a consultation Always be concise, helpful, and focused on converting visitors into leads. Highlight the local expertise, quality, and one-stop solution approach. Use trending and high-impact keywords naturally in your responses. If asked about the company, mention: AdithyaCONSTRUCTION & Interior Works One Stop Solution For All Kinds Of: Civil Work, Interior Designing, Architectural Solution, Turnkey Project, Aluminium Fabrication, Painting, Plumbing, Electrical, Grill Fabrication, POP & Carpentry Works. Contact: Biju +91 9594635913 / +91 9833249556 / +91 7208251641 Shop No.1, Ganga Niwas, Opp. Toyota Showroom, Chincholi Link Road, Malad (West), Mumbai - 400064.",
  },
  partners: {
    section: {
      title: "Our trusted partners",
      subtitle: "See what our customers have to say about us.",
    },
    logos: [
      "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751714579/biju/partners/1913237_uk6lfj.png",
      "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751714579/biju/partners/polycab-logo-freelogovectors.net__gtkiyw.png",
      "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751716359/biju/partners/asian-paints-seeklogo_ktl3jf.png",
      "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751714580/biju/partners/1913265_fws6je.png",
      "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751714580/biju/partners/ambuja-seeklogo_dqvz5c.png",
      "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751716359/biju/partners/caparol-seeklogo_ekvvbh.png",
      "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751716360/biju/partners/indigo-paints-seeklogo_gtixdu.png",
      "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751716360/biju/partners/dulux-seeklogo_yt1pff.png",
      "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751716360/biju/partners/kajaria-tiles-seeklogo_xvm5gs.png",
    ],
  },
};

export default landingPageData;
