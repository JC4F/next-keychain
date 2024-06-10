import { ProductTable } from "@/lib/database/types";
import { PRODUCT_STATUS } from "../product";

export const productFakes: ProductTable[] = [
  {
    id: "1",
    title: "Moc 1",
    externalProductId: "prod_QGKz1nyhdeeJc3",
    externalPriceId: "price_1PPoJ6FoKPoHr2nxmuMVfLil",
    description: "Description 1",
    mainImage:
      "https://utfs.io/f/2ae10e8b-0492-49cf-a916-c9db01459eb4-1zya8.webp",
    images: [],
    price: 100,
    quantity: 100,
    status: PRODUCT_STATUS.ACTIVE,
    created_at: new Date(),
  },
  {
    id: "2",
    title: "Moc 2",
    description: "Description 2",
    externalProductId: "prod_QGKz1nyhdeeJc3",
    externalPriceId: "price_1PPoJ6FoKPoHr2nxmuMVfLil",
    mainImage:
      "https://utfs.io/f/f96c65b1-39fa-49a3-8786-879acf12c41b-1zya9.webp",
    images: [],
    price: 100,
    quantity: 100,
    status: PRODUCT_STATUS.ACTIVE,
    created_at: new Date(),
  },
];
