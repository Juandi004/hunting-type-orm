// src/creature/creature.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Creature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  lastSee: string;

  @Column()
  countLastSee: number;

  @Column({ default: false })
  extinct: boolean;
}
