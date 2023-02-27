import godsInfo from '../../public/gods.json';

export type IGod = typeof godsInfo[0]

export type GodAbilityArgs = {
  level: number;
}
