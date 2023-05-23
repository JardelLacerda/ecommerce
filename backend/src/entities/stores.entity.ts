import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
} from "typeorm";

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
}

export default Stores