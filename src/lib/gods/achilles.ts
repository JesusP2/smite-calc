import gods from "@/../public/gods.json";

export const passive = (godLevel: number, armor: boolean) => {
  if (armor) {
    const stats = gods.Achilles.passive.armor;
    return {
      ...stats,
      healthPerLevel: stats.healthPerLevel * godLevel,
      protectionsPerLevel: stats.protectionsPerLevel * godLevel,
    };
  } else {
    const stats = gods.Achilles.passive.noArmor;
    return {
      ...stats,
      "%movementSpeedPerLevel": stats["%movementSpeedPerLevel"] * godLevel,
      physicalPowerPerLevel: stats.physicalPowerPerLevel * godLevel,
    };
  }
};

export const abilityOne = (level: number, range: number) => {
  const stats = gods.Achilles.abilityOne;
  if (range > 50 || range <= 0) {
    return {
      stunDuration: 0,
      damage: 0,
      "%physicalPower": 0,
    };
  } else if (range > 20) {
    return {
      stunDuration: 1,
      damage: (stats.damage.at(level - 1) || 0) * 0.7,
      "%physicalPower": stats["%physicalPower"] * 0.7,
    };
  } else if (range > 0) {
    return {
      stunDuration: 1,
      damage: stats.damage.at(level - 1),
      "%physicalPower": stats["%physicalPower"],
    };
  }
};

const getProcs = (procs: number, max: number) => (max < procs ? max : procs);
export const abilityTwo = (
  level: number,
  physicalPower: number,
  procs: number
) => {
  const stats = gods.Achilles.abilityTwo;
  const healPerProc = stats.heal[level - 1] + physicalPower * 0.1;
  const maxHealsPerAbility =
    healPerProc * getProcs(procs, stats.maxHealsPerAbility[level - 1]);
  return {
    healPerProc,
    maxHealsPerAbility,
    physicalPower: physicalPower * stats["%physicalPower"][level - 1],
    "%crowdControlReduction": stats["%crowdControlReduction"],
    "%protections": stats["%protections"][level - 1],
  };
};
export const abilityThree = (level: number, physicalPower: number) => {
  const stats = gods.Achilles.abilityThree;
  return {
    damage: stats[0].damage[level - 1] + physicalPower * stats[0]["%physicalPower"],
  };
};

export const abilityFour = (level: number, physicalPower: number) => {
  const stats = gods.Achilles.abilityFour
  return {
    damage: stats.damage[level - 1] + physicalPower * stats["%physicalPower"]
  }
}
