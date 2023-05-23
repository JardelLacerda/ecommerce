import { getRounds, hashSync } from "bcryptjs";
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    BeforeInsert,
    BeforeUpdate
} from "typeorm";

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
    
    @Column({ type: "enum", default: "user" })
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

}

export default User