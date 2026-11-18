import espresso from "@/assets/espresso.asset.json";
import cappuccino from "@/assets/cappuccino.asset.json";
import icedLatte from "@/assets/iced-latte.asset.json";
import coldBrew from "@/assets/cold-brew.asset.json";
import chocolate from "@/assets/chocolate.asset.json";
import tea from "@/assets/tea.asset.json";
import cake from "@/assets/cake.asset.json";
import brownie from "@/assets/brownie.asset.json";
import croissant from "@/assets/croissant.asset.json";
import bread from "@/assets/cheese-bread.asset.json";

export const categories = [
  "Todos",
  "Cafés quentes",
  "Cafés gelados",
  "Outras bebidas",
  "Doces e sobremesas",
  "Salgados",
] as const;
export type Category = (typeof categories)[number];
export const socialLinks = {
  // Provisional Instagram link: replace it with the café's real profile.
  instagram: "https://www.instagram.com/cafecentral.exemplo/",
  telegram: "https://t.me/botWillTestN8N_bot",
};
export const products = [
  {
    name: "Espresso da casa",
    description: "Intenso, aromático e com uma crema perfeita.",
    price: 7.5,
    category: "Cafés quentes",
    image: espresso.url,
  },
  {
    name: "Cappuccino clássico",
    description: "Espresso, leite cremoso e um toque de carinho.",
    price: 12,
    category: "Cafés quentes",
    image: cappuccino.url,
  },
  {
    name: "Latte gelado",
    description: "Café, leite e gelo. Leve e refrescante.",
    price: 14,
    category: "Cafés gelados",
    image: icedLatte.url,
  },
  {
    name: "Cold brew",
    description: "Extraído a frio, suave e naturalmente adocicado.",
    price: 13,
    category: "Cafés gelados",
    image: coldBrew.url,
  },
  {
    name: "Chocolate quente",
    description: "Chocolate de verdade, cremoso e aconchegante.",
    price: 14,
    category: "Outras bebidas",
    image: chocolate.url,
  },
  {
    name: "Chá da tarde",
    description: "Uma infusão delicada para desacelerar o dia.",
    price: 9,
    category: "Outras bebidas",
    image: tea.url,
  },
  {
    name: "Bolo de chocolate",
    description: "Massa fofinha e uma generosa cobertura.",
    price: 16,
    category: "Doces e sobremesas",
    image: cake.url,
  },
  {
    name: "Brownie artesanal",
    description: "Casquinha crocante e chocolate a cada pedaço.",
    price: 12,
    category: "Doces e sobremesas",
    image: brownie.url,
  },
  {
    name: "Croissant de manteiga",
    description: "Dourado, delicado e feito para acompanhar seu café.",
    price: 11,
    category: "Salgados",
    image: croissant.url,
  },
  {
    name: "Pão rústico da casa",
    description: "Fermentação lenta, casca crocante e miolo macio.",
    price: 10,
    category: "Salgados",
    image: bread.url,
  },
] satisfies {
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
}[];
export function filterProducts(category: Category) {
  return category === "Todos"
    ? products
    : products.filter((product) => product.category === category);
}
export function validateContact(values: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  return (
    values.name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) &&
    values.phone.replace(/\D/g, "").length >= 10 &&
    values.phone.replace(/\D/g, "").length <= 13 &&
    values.message.trim().length >= 5
  );
}
