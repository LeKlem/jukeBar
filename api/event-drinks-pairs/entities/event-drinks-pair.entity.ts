import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Event } from '../../event/entities/event.entity';
import { Drink } from '../../drink/entities/drink.entity';

@Entity()
export class EventDrinksPair {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event)
  @JoinColumn({ name: 'idEvent' })
  idEvent: Event;

  @ManyToOne(() => Drink)
  @JoinColumn({ name: 'idDrink_1' })
  idDrink_1: Drink;

  @ManyToOne(() => Drink)
  @JoinColumn({ name: 'idDrink_2' })
  idDrink_2: Drink;

  @Column()
  price_inc_1: number;

  @Column()
  price_sub_1: number;

  @Column()
  price_inc_2: number;

  @Column()
  price_sub_2: number;

  @Column()
  min_price_1: number;

  @Column()
  min_price_2: number;
}
