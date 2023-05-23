import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    OneToOne,
    JoinColumn,
    OneToMany,
} from "typeorm";
import User from "./users.entity";
import Order from "./order.entitty";

@Entity("carts")
class Cart{
    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Column({type: "decimal", precision: 12, scale: 2})
    totalPrice: number | string

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @OneToMany(() => Order, (order) => order.product)
    orders: Order[]
}

export default Cart