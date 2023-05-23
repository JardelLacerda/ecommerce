import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    OneToOne,
    JoinColumn,
} from "typeorm";
import User from "./users.entity";

@Entity("carts")
class Cart{
    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Column({type: "decimal", precision: 12, scale: 2})
    totalPrice: number | string

    @OneToOne(() => User)
    @JoinColumn()
    user: User
}

export default Cart