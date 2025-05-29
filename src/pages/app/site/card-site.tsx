import { FaExternalLinkAlt } from "react-icons/fa";

interface ISiteProducts {
  image: string;
  name: string;
  originalPrice: string;
  price: string;
  finalUrl: string;
}

export const ProductCard = ({
  image,
  name,
  originalPrice,
  price,
  finalUrl,
}: ISiteProducts) => {
  return (
    <div className="bg-white shadow rounded p-2 justify-center w-[201px] ">
      <div className="flex w-[170px] h-[160px] m-auto">
        <img
          src={image}
          alt={name}
          className="w-full object-cover rounded mb-4 m-auto"
        />
      </div>
      <h3 className="font-semibold text-sm mb-4 text-muted-foreground line-clamp-2">
        {name}
      </h3>
      <div className="mb-2">
        <p className="text-sm text-red-500 line-through h-[20px]">
          {originalPrice !== null && `R$ ${originalPrice}`}
        </p>

        <p className="text-xl text-green-600 font-bold">R$ {price}</p>
      </div>

      <a
        href={finalUrl}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full flex-row flex gap-x-2  justify-center items-center"
      >
        Acessar site{" "}
        <span>
          <FaExternalLinkAlt />
        </span>
      </a>
    </div>
  );
};
