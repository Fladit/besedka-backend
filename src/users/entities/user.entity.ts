import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { MaritalStatus } from "./marital_status.entity";
import { Photo } from "./photo.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role)
  role_code: Role;

  @ManyToOne(() => MaritalStatus)
  marital_status_code: MaritalStatus;

  @Column({unique: true, nullable: false})
  username: string;

  @Column({nullable: false})
  password: string;

  @Column({nullable: false})
  email: string;

  @Column({nullable: false})
  firstName: string;

  @Column({nullable: false})
  lastName: string;

  @OneToOne(() => Photo)
  @JoinColumn()
  avatar: Photo;

  @Column()
  statusTitle: string;

  @Column({type: 'timestamp', nullable: false})
  birthday: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  registrationDate: Date;

  @Column({default: false})
  isConfirmed: boolean;

  @OneToMany(() => Photo, photo => photo.user)
  photos: Photo[]
}
