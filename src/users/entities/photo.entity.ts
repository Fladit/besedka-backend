import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.photos)
  user: User;

  @Column({nullable: false})
  name: string;

  @Column({type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;
}
