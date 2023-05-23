import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    ManyToOne,
} from "typeorm";
import Product from "./products.entity";
import Cart from "./cart.entity";

@Entity("orders")
class Order{
    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Column({type: "decimal", precision: 12, scale: 2})
    totalPrice: number | string
    
    @Column({type: "int", default: 1})
    quantity: number
    
    @ManyToOne(() => Product, (product) => product.orders)
    product: Product

    @ManyToOne(() => Cart, (cart) => cart.orders)
    cart: Cart
}

export default Order