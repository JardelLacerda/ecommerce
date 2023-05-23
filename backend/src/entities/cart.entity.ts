import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
} from "typeorm";

@Entity("carts")
class Cart{
    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Column({type: "decimal", precision: 12, scale: 2})
    totalPrice: number | string
}

export default Cart