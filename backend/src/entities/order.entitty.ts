import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
} from "typeorm";

@Entity("orders")
class Order{
    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Column({type: "decimal", precision: 12, scale: 2})
    totalPrice: number | string
    
    @Column({type: "int", default: 1})
    quantity: number
    
}

export default Order