import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// the Entity defines a table or document within the database
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
