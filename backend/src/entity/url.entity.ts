import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("")
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  urlCode: string;

  @Column()
  original_url: string;

  @Column()
  shorten_url: string;
}