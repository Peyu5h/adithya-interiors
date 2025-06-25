export default function Projects({ index, title, setModal }) {
  return (
    <div
      onMouseEnter={() => {
        setModal({ active: true, index });
      }}
      onMouseLeave={() => {
        setModal({ active: false, index });
      }}
      className=" hover-target flex h-32 w-full justify-between items-center px-10 py-8 border-t border-gray-200 cursor-pointer transition-opacity hover:opacity-50"
    >
      <h2 className="text-4xl font-normal transition-transform hover:-translate-x-2">
        {title}
      </h2>
      <p className="transition-transform hover:translate-x-2">
        Design & Development
      </p>
    </div>
  );
}
