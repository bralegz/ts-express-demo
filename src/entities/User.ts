import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Vehicle } from "./Vehicle";

@Entity({
  name: "users"
}) // it will create a table called 'users'
export class User {
  @PrimaryGeneratedColumn() //It will set this column as a auto-generated Primary Key
  id: number;

  @Column({ length: 100 })
  name: string; //varchar(100)

  @Column()
  email: string; //varchar(255)

  @Column("integer")
  age: number;

  @Column()
  active: boolean;

  @OneToOne(() => Vehicle)
  @JoinColumn()
  vehicle: Vehicle; //it will add a column called vehicleId
}
