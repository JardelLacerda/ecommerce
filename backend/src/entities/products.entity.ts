import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
} from "typeorm";

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
}

export default Product