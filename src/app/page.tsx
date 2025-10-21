import OnHoverExpand from "@/components/on_hover_expand";
import { on_hover_data } from "@/data/on_hover_data";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container px-4 md:px-0 mx-auto space-y-8">
      {/* Horizontal orientation example */}

        <OnHoverExpand 
          data={on_hover_data}
          orientation="horizontal"
          className="w-full"
        />

      

        <OnHoverExpand 
          data={on_hover_data}
          orientation="vertical"
          className="w-full"
          cardWidth="300px"
          cardHeight="5vh"
          expandedSize="25vh"
          collapsedSize="5vh"
        />

    </div>
  );
}
