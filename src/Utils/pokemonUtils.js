const typesColors = {
  grass: "#6efd00",
  fire: "#dd584f",
  water: "#6fbbff",
  bug: "#f8d5a3",
  normal: "#b1b1b1",
  poison: "#5acd02",
  electric: "#ffc212",
  ground: "#ffb66d",
  rock: "#d5d5d4",
  fairy: "#e455fd",
  dragon: "#2166ad",
  psychic: "#c1c346",
  flying: "#bbb1b1",
  fighting: "#cfbb93",
  ice: "#68afff",
};
export const firstLetterCapital = (name) =>
  name.charAt(0).toUpperCase() + name.slice(1);
export const formatStatName = (name) => {
  if (name.toLowerCase() === "hp") return "HP";
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const separeteTypes = (types) => {
  return types.map(({ type }) => ({
    name: firstLetterCapital(type.name),
    color: typesColors[type.name.toLowerCase()] || "#000",
  }));
};
