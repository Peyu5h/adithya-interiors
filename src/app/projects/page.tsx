import React from "react";
import Stairs from "~/components/animations/Pagetransition/Stairs";
import Navbar from "~/components/ui/navbar";

export default function ProjectPage() {
  return (
    <div>
      <Stairs backgroundColor={"#0e0e0e"}>
        <Navbar />
        <div className="">Project Page</div>
      </Stairs>
    </div>
  );
}
