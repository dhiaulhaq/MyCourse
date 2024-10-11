import { useParams, useLocation } from "react-router-dom";

export default function GenerateResultPage() {
  //   const { generate } = useParams();
  const location = useLocation();
  const generate = location.state?.generate;

  const link = `https://www.youtube.com/embed/${generate}`;

  return (
    <>
      <div className="px-4 sm:ml-64">
        <iframe
          className="w-full h-64 my-5 rounded-lg md:h-96"
          src={generate}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
}
