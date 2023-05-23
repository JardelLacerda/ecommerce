import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    OneToMany,
} from "typeorm";
import User from "./users.entity";

@Entity("addresses")
class Address{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: "varchar", length: 150 })
    street: string
    
    @Column({type: "varchar", length: 8})
    zipCode: string
    
    @Column({type: "varchar", length: 2})
    state: string
    
    @Column({type: "varchar", length: 8, nullable: true})
    number: string | null | undefined
    
    @Column({type: "varchar", length: 150})
    city: string

    @OneToMany(() => User, (user) => user.addresses)
    user: User[]
}

export default Address