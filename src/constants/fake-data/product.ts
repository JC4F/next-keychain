import { ProductTable } from "@/lib/database/types";
import { GeneratedAlways } from "kysely";

export const productFakes: ProductTable[] = [
  {
    id: "1" as unknown as GeneratedAlways<string>,
    title: "Moc 1",
    description: "Description 1",
    mainImage:
      "https://utfs.io/f/2ae10e8b-0492-49cf-a916-c9db01459eb4-1zya8.webp",
    images: [],
    price: 100,
    created_at: new Date(),
  },
  {
    id: "2" as unknown as GeneratedAlways<string>,
    title: "Moc 2",
    description: "Description 2",
    mainImage:
      "https://utfs.io/f/f96c65b1-39fa-49a3-8786-879acf12c41b-1zya9.webp",
    images: [],
    price: 100,
    created_at: new Date(),
  },
];
