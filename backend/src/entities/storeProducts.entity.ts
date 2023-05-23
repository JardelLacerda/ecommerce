import { 
    Entity, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
} from "typeorm";
import Product from "./products.entity";
import Stores from "./stores.entity";

@Entity("store_products")
class StoreProducts{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => Product, (product) => product.storeProducts)
    product: Product

    @ManyToOne(() => Stores, (stores) => stores.storeProducts)
    store: Stores
}

export default StoreProducts