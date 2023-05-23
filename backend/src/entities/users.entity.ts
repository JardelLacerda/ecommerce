import { getRounds, hashSync } from "bcryptjs";
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    BeforeInsert,
    BeforeUpdate,
    ManyToOne,
} from "typeorm";
import Address from "./address.entity";

@Entity("users")
class User{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar", length: 120 })
    name: string
    
    @Column({ type: "varchar", length: 150, unique: true })
    email: string

    @Column({ type: "varchar", length: 120 })
    password: string
    
    @Column({ type: "enum", default: "user", enum: ["user", "admin", "merchant"] })
    permission: "user" | "admin" | "merchant"

    @CreateDateColumn({ type: "date" })
    createdAt: Date | string

    @UpdateDateColumn({ type: "date" })
    updatedAt: Date | string

    @DeleteDateColumn({ type: "date", nullable: true })
    deletedAt: Date | string | null | undefined

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
      const isEncrypted: number = getRounds(this.password);

      if (!isEncrypted) {
        this.password = hashSync(this.password, 10);
      }
    }

    @ManyToOne(() => Address, (address) => address.user )
    addresses: Address
    
}

export default User