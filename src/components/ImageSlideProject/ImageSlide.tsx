import Projects from "./Projects";

export default function ImageSlide() {
  const projects = [
    {
      title1: "Jomor",
      title2: "Design",
      src: "/images/c2montreal.png",
    },
    {
      title1: "La",
      title2: "Grange",
      src: "/images/officestudio.png",
    },
    {
      title1: "Deux Huit",
      title2: "Huit",
      src: "/images/locomotive.png",
    },
    {
      title1: "Nothing",
      title2: "Design Studio",
      src: "/images/silencio.png",
    },
    {
      title1: "Mambo",
      title2: "Mambo",
      src: "/images/locomotive.png",
    },
  ];

  return (
    <main className="h-screen flex items-center justify-center">
      <div className="w-[70%] mt-20 mb-32">
        {projects.map((project, index) => {
          return <Projects key={index} project={project} />;
        })}
      </div>
    </main>
  );
}
