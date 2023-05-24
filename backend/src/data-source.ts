import "reflect-metadata"
import "dotenv/config"
import path from "path";
import { DataSource, DataSourceOptions, Repository } from "typeorm";
import { Address, Cart, Order, Product, StoreProducts, Stores, User } from "./entities";

const settings = (): DataSourceOptions => {
    const entitiesPath: string = path.join(__dirname, "./entities/**.{ts,js}");
    const migrationPath: string = path.join(__dirname, "./migrations/**.{ts,js}");
    const nodeEnv: string | undefined = process.env.NODE_ENV;
  
    if (nodeEnv === "test") {
      const dbUrlTest = process.env.TEST_DATABASE_URL

      if (!dbUrlTest) throw new Error("Missing env var: 'TEST_DATABASE_URL'");

      return {
        type: "postgres",
        url: dbUrlTest,
        synchronize: true,
        entities: [entitiesPath],
      };
    }
  
    const dbUrl: string | undefined = process.env.DATABASE_URL;
  
    if (!dbUrl) throw new Error("Missing env var: 'DATABASE_URL'");
  
    return {
      type: "postgres",
      url: dbUrl,
      synchronize: false,
      logging: true,
      entities: [entitiesPath],
      migrations: [migrationPath],
    };
};
  
export const AppDataSource = new DataSource(settings());

export const userRepo: Repository<User> = AppDataSource.getRepository(User)
export const addressRepo: Repository<Address> = AppDataSource.getRepository(Address)
export const cartRepo: Repository<Cart> = AppDataSource.getRepository(Cart)
export const orderRepo: Repository<Order> = AppDataSource.getRepository(Order)
export const productsRepo: Repository<Product> = AppDataSource.getRepository(Product)
export const storesRepo: Repository<Stores> = AppDataSource.getRepository(Stores)
export const storeProductsRepo: Repository<StoreProducts> = AppDataSource.getRepository(StoreProducts)