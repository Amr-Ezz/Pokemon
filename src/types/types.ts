export interface PokemonBasic {
  name: string;
  url: string;
}
export interface PokemonSpecies {
  name: string;
  url: string;
}
export interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string; 
    url: string;
  };
  version: {
    name: string; 
    url: string;
  };
}

export interface PokemonDescription {
  id: number; 
  name: string; 
  flavor_text_entries: FlavorTextEntry[]; 
}

export interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  species: PokemonSpecies;

  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  types: Array<{
    type: {
      name: string;
    };
  }>;
  moves: Array<{
    move: {
      name: string;
    };
    version_group_details: Array<{
      level_learned_at: number;
      move_learn_method: {
        name: string;
      };
      version_group: {
        name: string;
      };
    }>;
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
    slot: number;
  }>;
  description?: string;
}
