import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: false, nullable: false })
  first_name: string;

  @Column({ unique: false, nullable: false })
  last_name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ default: "USER" })
  role: string;
}