import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    JoinColumn,
    OneToOne,
} from "typeorm";
import User from "./users.entity";

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
}

export default Stores