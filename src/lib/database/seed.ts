import { PRODUCT_STATUS, ROLE } from "../../constants";
import db from "./db";

export const seedData = async () => {
  try {
    await db
      .insertInto("User")
      // @ts-ignore
      .values([
        {
          name: "Haaland Le",
          email: "lequan12122002@gmail.com",
          role: ROLE.ADMIN,
          emailVerified: new Date(),
          created_at: new Date(),
        },
        {
          name: "Long Nguyen",
          email: "quanlmhe163084@fpt.edu.vn",
          role: ROLE.USER,
          emailVerified: new Date(),
          created_at: new Date(),
        },
      ])
      .execute();

    await db
      .insertInto("Product")
      // @ts-ignore
      .values([
        {
          externalProductId: "prod_QGKz1nyhdeeJc3",
          externalPriceId: "price_1PPoJ6FoKPoHr2nxmuMVfLil",
          mainImage:
            "https://utfs.io/f/2ae10e8b-0492-49cf-a916-c9db01459eb4-1zya8.webp",
          images: [
            "https://utfs.io/f/2ae10e8b-0492-49cf-a916-c9db01459eb4-1zya8.webp",
            "https://utfs.io/f/f96c65b1-39fa-49a3-8786-879acf12c41b-1zya9.webp",
          ],
          title: "Test Moc 1",
          description: "Description",
          price: 12.04,
          quantity: 10,
          status: PRODUCT_STATUS.ACTIVE,
          created_at: new Date(),
        },
        {
          externalProductId: "prod_QGKzfnCE06XUFF",
          externalPriceId: "price_1PPoJYFoKPoHr2nxIMylQqid",
          mainImage:
            "https://utfs.io/f/2ae10e8b-0492-49cf-a916-c9db01459eb4-1zya8.webp",
          images: [
            "https://utfs.io/f/2ae10e8b-0492-49cf-a916-c9db01459eb4-1zya8.webp",
            "https://utfs.io/f/f96c65b1-39fa-49a3-8786-879acf12c41b-1zya9.webp",
          ],
          title: "Test Moc 2",
          description: "Description",
          price: 14.04,
          quantity: 20,
          status: PRODUCT_STATUS.ACTIVE,
          created_at: new Date(),
        },
      ])
      .execute();

    console.log("Seeding SuccessFully!");
  } catch (error) {
    console.log("Seeding fail >>>: ", error);
  }
};
