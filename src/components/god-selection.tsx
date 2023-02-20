'use client';
import Image from 'next/image';
import { pathToName } from '@/utils/misc';
import godsInfo from '../../public/gods.json';
import { IGod } from '@/utils/types';

type Idk = typeof godsInfo[0];

export default function GodSelection({
  onSelect,
}: { onSelect: (god: IGod) => void }) {
  return (
    <div>
      <h1 className="text-2xl mb-4 mt-8 ml-2 max-sm:ml-12 font-semibold font-inter text-[#1e293b]">
        Select a god
      </h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4 mx-auto">
        {godsInfo.map((god: Idk) => (
          <div
            className="group mx-auto hover:cursor-pointer"
            key={god.icon}
            onClick={() => onSelect(god)}
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
// }: { onSelect: (god: IGod) => void }) {
//   return (
//     <div>
//       <h1 className="text-2xl mb-4 mt-8 ml-2 max-sm:ml-12 font-semibold font-inter text-[#1e293b]">
//         Select a god
//       </h1>
//       <div className="">
//         {godsInfo.map((god: Idk) => (
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

function SkillRenderer({ ability }: { ability: IGod['abilityOne'] | IGod['abilityTwo'] | IGod['abilityThree'] | IGod['abilityFour'] }) {
  if ('length' in ability) {
    return (
      <div>
        {ability.map((stance, idx) => {
          return (
            <Image src={stance.icon} alt={stance.name} width={50} height={50} key={stance.icon + idx} />
          );
        })}
      </div>
    );
  } else {
    return (
      <Image src={ability.icon} alt={ability.name} width={50} height={50} key={ability.icon} />
    );
  }
}
