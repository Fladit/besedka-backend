import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MaritalStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
