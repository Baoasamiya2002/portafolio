import React, { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import downIcon from "../icons/chevron-down.svg";

const EmblaCarousel = (props) => {
  const { slides, filters, seeMoreLabel } = props;
  const options = { dragFree: true, align: "start", loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const [projects, setProjects] = useState(slides);
  const [activeFilter, setActiveFilter] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(filters[0].name);

  const setFilter = (filterSelected, filterIndex) => {
    setActiveFilter(filterIndex);
    setProjects(
      slides.filter((project) => project.id.startsWith(filterSelected.tag)),
    );
    setOpen(false);
    setSelectedOption(filterSelected.name);
  };

  return (
    <div className="relative mx-auto w-full min-w-0">
      <div className="mb-8 md:hidden flex">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex whitespace-nowrap flex-nowrap w-min items-center cursor-pointer border-figure border-b-4 text-2xl! py-2 px-4 font-bold!"
        >
          <span className="mr-2">{selectedOption}</span>
          <svg
            className="w-4 h-4"
            viewBox="0 -4.5 24 24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>chevron-down</title>
            <desc>Created with Sketch Beta.</desc>
            <defs></defs>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
              sketch:type="MSPage"
            >
              <g
                id="Icon-Set-Filled"
                sketch:type="MSLayerGroup"
                transform="translate(-574.000000, -1201.000000)"
                fill="#000000"
              >
                <path
                  d="M597.405,1201.63 C596.576,1200.8 595.23,1200.8 594.401,1201.63 L586.016,1210.88 L577.63,1201.63 C576.801,1200.8 575.455,1200.8 574.626,1201.63 C573.797,1202.46 573.797,1203.81 574.626,1204.64 L584.381,1215.4 C584.83,1215.85 585.429,1216.05 586.016,1216.01 C586.603,1216.05 587.201,1215.85 587.65,1215.4 L597.405,1204.64 C598.234,1203.81 598.234,1202.46 597.405,1201.63"
                  id="chevron-down"
                  sketch:type="MSShapeGroup"
                ></path>
              </g>
            </g>
          </svg>
        </button>
        {open && (
          <div className="bg-figure pentagon sm:p-2 p-1 absolute z-1">
            <ul className="bg-bg pentagon sm:px-4 px-1 py-10 gap-2">
              {filters.map((btnContent, index) => (
                <li className="pentagon_item" key={index}>
                  <button
                    type="button"
                    onClick={() => setFilter(btnContent, index)}
                    className={`cursor-pointer text-2xl! py-2 px-4 font-bold! w-full flex flex-nowrap justify-start hover:bg-figure hover:text-white
                  ${activeFilter === index ? "bg-figure text-white" : "bg-transparent"}`}
                  >
                    {btnContent.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="mb-8 md:flex hidden">
        <ul className="flex gap-2">
          {filters.map((btnContent, index) => (
            <li className="pentagon_item" key={index}>
              <button
                type="button"
                onClick={() => setFilter(btnContent, index)}
                className={`cursor-pointer border-b-5 text-2xl! py-2 px-4 font-bold! hover:bg-figure hover:text-white
                  ${activeFilter === index ? "border-figure" : "border-transparent"}`}
              >
                {btnContent.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="overflow-hidden mb-1" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom sm:h-132 h-110">
          {projects.map((project, index) => (
            <div
              className="md:flex-[0_0_60%] flex-[0_0_70%] min-w-0 pr-4"
              key={index}
            >
              <div className="w-full h-full bg-figure pentagon p-1">
                <a href={"#" + project.id.split("/").pop()}>
                  <article
                    id={project.id}
                    className="h-130 bg-figure pentagon md:flex hover:*:bg-figure! text-black hover:text-white *:transition *:duration-300 *:ease-in-out"
                  >
                    <div>
                      <img
                        src={project.data.banner.src}
                        alt={project.data.name}
                        className="h-full object-cover"
                      />
                    </div>
                    <div className="p-4 py-7 *:mb-4 bg-white pentagon h-full">
                      <div className="flex gap-0.5 flex-wrap">
                        <div className="border-2 border-gray-500 rounded-lg px-1.5 w-max">
                          <p>-</p>
                        </div>
                      </div>
                      <h3 className="text-2xl font-medium">
                        {project.data.name}
                      </h3>
                      <p className="underline">{seeMoreLabel}</p>
                    </div>
                  </article>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>      
      <div>
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  );
};

export default EmblaCarousel;
