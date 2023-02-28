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

export const abilityTwo = (level: number, physicalPower: number) => {
  const stats = gods.Achilles.abilityTwo;
  const heal =
    (stats.heal[level - 1] + physicalPower * 0.1) *
    stats.maxHealsPerAbility[level - 1];
  return {
    heal,
    physicalPower: physicalPower * stats["%physicalPower"][level - 1],
    "%crowdControlReduction": stats["%crowdControlReduction"],
    "%protections": stats["%protections"][level - 1],
  };
};
