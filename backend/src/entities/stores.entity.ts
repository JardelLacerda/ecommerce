import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    JoinColumn,
    OneToOne,
    OneToMany,
} from "typeorm";
import User from "./users.entity";
import StoreProducts from "./storeProducts.entity";

@Entity("stores")
class Stores{
    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Column({type: "varchar"})
    title: string
    
    @Column({type: "text", nullable: true})
    description: string | null | undefined
    
    @Column({type: "text"})
    logo: string

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @OneToMany(() => StoreProducts, (sp) => sp.product)
    storeProducts: StoreProducts[]
}

export default Stores