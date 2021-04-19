import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MaritalStatus {
  @PrimaryGeneratedColumn()
  code: number;

  @Column()
  name: string;
}
