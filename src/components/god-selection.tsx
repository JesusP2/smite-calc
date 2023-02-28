"use client";
import Image from "next/image";
import { pathToName } from "@/utils/misc";
import gods from "../../public/gods.json";
import type { GodsNames } from "@/utils/types";

interface Data {
  name: string;
  value: number;
  max: number;
}

function BarList({ data }: { data: Data[] }) {
  const maxBarLen = 64;
  return (
    <div className="rounded-lg shadow-xl px-8 py-4 my-4 bg-white max-w-2xl">
      <h3 className="text-xl font-semibold font-inter text-[#1e293b]">
        Offensive
      </h3>
      <div className="flex flex-col gap-y-4 my-4">
        {data.map(({ name, value, max }) => (
          <div className="flex gap-x-4 items-center">
            <h4 className="text-sm font-medium font-inter flex-none text-neutral-600 w-36">
              {name}
            </h4>
            <div
              className="h-6 w-[40%] bg-neutral-100 rounded-sm"
              style={{ width: maxBarLen + "%" }}
            >
              <div
                className="h-6 bg-sky-200 rounded-sm flex items-center pl-2"
                style={{
                  width: value > max ? "100%" : (value / max) * 100 + "%",
                }}
              >
                <p className="text-sm text-sky-700 font-medium">{value}</p>
              </div>
            </div>
            <p className="text-sm text-neutral-700">{max}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GodSelection({
  onSelect,
}: {
  onSelect: (god: GodsNames) => void;
}) {
  return (
    <div>
      <h1 className="text-2xl mb-4 mt-8 ml-2 max-sm:ml-12 font-semibold font-inter text-[#1e293b]">
        Select a god
      </h1>
      <BarList
        data={[
          {
            name: "Basic Attack",
            value: 83,
            max: 10000,
          },
          {
            name: "Power",
            value: 128,
            max: 400,
          },
          {
            name: "Attack Speed",
            value: 1.75,
            max: 2.5,
          },
          {
            name: "Lifesteal",
            value: 35,
            max: 100,
          },
          {
            name: "Flat Penetration",
            value: 40,
            max: 50,
          },
          {
            name: "% Penetration",
            value: 40,
            max: 100,
          },
          {
            name: "Crit chance",
            value: 45,
            max: 100,
          },
          {
            name: "Defense Reduction",
            value: 20,
            max: 50,
          },
          {
            name: "% Defense Reduction",
            value: 28,
            max: 100,
          },
        ]}
      />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4 mx-auto">
        {Object.entries(gods).map(([godName, god]) => (
          <div
            className="group mx-auto hover:cursor-pointer"
            key={god.icon}
            onClick={() => onSelect(godName as GodsNames)}
          >
            <div className="relative w-full">
              <div className="group-hover:w-full group-hover:h-[calc(100%-24px)] bg-gray-800 group-hover:absolute bg-opacity-50 cursor-pointer" />
              <Image
                src={god.icon}
                alt={pathToName(god.icon)}
                width={115}
                height={153}
              />
              <p className="flex justify-center font-semibold font-inter">
                {pathToName(god.icon)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// export default function GodSelection({
//   onSelect,
// }: { onSelect: (god: GodsNames) => void }) {
//   return (
//     <div>
//       <h1 className="text-2xl mb-4 mt-8 ml-2 max-sm:ml-12 font-semibold font-inter text-[#1e293b]">
//         Select a god
//       </h1>
//       <div className="">
//         {Object.entries(gods).map(([godName, god]) => (
//           <div key={god.icon}>
//             <Image
//               src={god.icon}
//               alt={pathToName(god.icon)}
//               width={100}
//               height={132}
//             />
//             <div className="flex">
//               <SkillRenderer ability={god.abilityOne} />
//               <SkillRenderer ability={god.abilityTwo} />
//               <SkillRenderer ability={god.abilityThree} />
//               <SkillRenderer ability={god.abilityFour} />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

function SkillRenderer<T extends GodsNames>({
  ability,
}: {
  ability:
    | typeof gods[T]['abilityOne']
    | typeof gods[T]['abilityTwo']
    | typeof gods[T]['abilityThree']
    | typeof gods[T]['abilityFour']
}) {
  if ("length" in ability) {
    return (
      <div>
        {ability.map((stance, idx) => {
          return (
            <Image
              src={stance.icon}
              alt={stance.name}
              width={50}
              height={50}
              key={stance.icon + idx}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <Image
        src={ability.icon}
        alt={ability.name}
        width={50}
        height={50}
        key={ability.icon}
      />
    );
  }
}
