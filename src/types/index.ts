// Core types based on the backend API schema

export interface Category {
  id: number;
  name: string;
}

export interface Faction {
  id: number;
  name: string;
  category: Category;
}

export interface UnitAbility {
  id: number;
  name: string;
  description: string;
  unitId: number;
}

export interface WeaponAbility {
  id: number;
  name: string;
}

export interface WeaponAbilityValue {
  weaponId: number;
  abilityId: number;
  value?: string;
  ability: WeaponAbility;
}

export interface Weapon {
  id: number;
  name: string;
  weaponType: 'MELEE' | 'RANGED';
  range?: number;
  attacks: string;
  skill?: number;
  strength: string;
  ap: number;
  damage: string;
  abilities: WeaponAbilityValue[];
  units: UnitReference[];
}

export interface UnitReference {
  id: number;
  name: string;
  faction: string;
}

export interface WeaponReference {
  id: number;
  name: string;
}

export interface UnitConfiguration {
  id: number;
  unitId: number;
  modelCount: number;
  description: string;
  points: number;
}

export interface UnitOption {
  id: number;
  unitId: number;
  line: number;
  button: string;
  description: string;
}

export interface UnitComposition {
  id: number;
  unitId: number;
  line: number;
  description: string;
  minCount?: number;
  maxCount?: number;
  modelType?: string;
  isAlternative: boolean;
}

export interface Unit {
  id: number;
  name: string;
  movement?: number;
  toughness: number;
  save: number;
  wounds: number;
  leadership: number;
  oc: number;
  unitType: 'CHARACTER' | 'BATTLELINE' | 'OTHER';
  faction: Faction;
  weapons: WeaponReference[];
  unitAbilities: UnitAbility[];
  keywords: string[];
  configurations: UnitConfiguration[];
  options: UnitOption[];
  compositions: UnitComposition[];
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
}

export interface SearchMeta {
  searchParams: Record<string, any>;
  nameTerms: string[];
  count: number;
}

export interface SearchResponse<T> {
  success: boolean;
  data: T[];
  meta: SearchMeta;
}

export interface ErrorResponse {
  success: false;
  error: string;
}

// Search parameter types
export interface UnitSearchParams {
  name?: string;
  faction?: string;
  unitType?: 'CHARACTER' | 'BATTLELINE' | 'OTHER';
  keyword?: string; // Comma-separated keywords for backend
  keywords?: string[]; // Array of keywords for frontend state management
  minToughness?: number;
  maxToughness?: number;
  minWounds?: number;
  maxWounds?: number;
  minMovement?: number;
  maxMovement?: number;
}

export interface WeaponSearchParams {
  name?: string;
  weaponType?: 'MELEE' | 'RANGED';
  minRange?: number;
  maxRange?: number;
  ap?: number;
  attacks?: string;
}
