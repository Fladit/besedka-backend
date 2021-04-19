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
  role_code: Role;

  @ManyToOne(() => MaritalStatus)
  marital_status_code: MaritalStatus;

  @Column({unique: true, nullable: false})
  @IsString()
  @MinLength(3)
  @MaxLength(16)
  username: string;

  @Column({nullable: false})
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  password: string;

  @Column({nullable: false})
  @IsEmail()
  @MaxLength(320)
  email: string;

  @Column({nullable: false})
  @IsString()
  @MinLength(2)
  @MaxLength(16)
  firstName: string;

  @Column({nullable: false})
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  lastName: string;

  @OneToOne(() => Photo)
  @JoinColumn()
  avatar: Photo;

  @Column()
  @IsString()
  @MaxLength(512)
  statusTitle: string;

  @Column({type: 'timestamp', nullable: false})
  @IsDate()
  birthday: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  registrationDate: Date;

  @Column({default: false})
  @IsBoolean()
  isConfirmed: boolean;

  @Column({default: false})
  @IsBoolean()
  isBanned: boolean;

  @Column()
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  banReason: string;

  @OneToMany(() => Photo, photo => photo.user)
  photos: Photo[]
}
