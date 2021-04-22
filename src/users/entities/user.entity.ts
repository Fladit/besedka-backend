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

  @Column({unique: true, nullable: false, length: 16})
  username: string;

  @Column({nullable: false})
  password: string;

  @Column({nullable: false, unique: true, length: 320})
  email: string;

  @Column({nullable: false, length: 16})
  firstName: string;

  @Column({nullable: false, length: 32})
  lastName: string;

  @OneToOne(() => Photo)
  @JoinColumn()
  avatar: Photo;

  @Column({length: 512})
  statusTitle: string;

  @Column({type: 'timestamp', nullable: false})
  birthday: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  registrationDate: Date;

  @Column({default: false})
  isConfirmed: boolean;

  @Column({default: false})
  isBanned: boolean;

  @Column({length: 128})
  banReason: string;

  @OneToMany(() => Photo, photo => photo.user)
  photos: Photo[]
}
