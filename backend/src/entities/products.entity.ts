import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    OneToMany,
} from "typeorm";
import StoreProducts from "./storeProducts.entity";

@Entity("products")
class Product{
    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Column({type: "varchar", length: 150})
    name: string
    
    @Column({type: "text", nullable: true})
    description: string
    
    @Column({type: "text", nullable: true})
    image: string
    
    @Column({type: "decimal", precision: 12, scale: 2})
    price: number | string

    @OneToMany(() => StoreProducts, (sp) => sp.product)
    storeProducts: StoreProducts
}

export default Product