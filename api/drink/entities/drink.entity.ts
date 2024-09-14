import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Drink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column('decimal', { precision: 6, scale: 2 })
  price: number;
}
