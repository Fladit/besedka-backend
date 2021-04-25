import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { MaritalStatus } from "./marital-status.entity";
import { Photo } from "./photo.entity";
import { IsBoolean, IsDate, IsEmail, IsString, MaxLength, MinLength } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role)
  role: Role;

  @ManyToOne(() => MaritalStatus)
  maritalStatus: MaritalStatus;

  @Column({unique: true, length: 16})
  username: string;

  @Column()
  password: string;

  @Column({unique: true, length: 320})
  email: string;

  @Column({length: 16})
  firstName: string;

  @Column({length: 32})
  lastName: string;

  @OneToOne(() => Photo)
  @JoinColumn()
  avatar: Photo;

  @Column({length: 512, nullable: true})
  statusTitle: string;

  @Column({type: 'timestamp'})
  birthDay: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  registrationDate: Date;

  @Column({default: false})
  isConfirmed: boolean;

  @Column({default: false})
  isBanned: boolean;

  @Column({length: 128, nullable: true})
  banReason: string;

  @OneToMany(() => Photo, photo => photo.user)
  photos: Photo[]
}
