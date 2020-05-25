import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, ObjectID, ObjectIdColumn } from 'typeorm'

@Entity('notifications')
class Notification {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  content: string;

  @Column('uuid')
  recipient_id:string;

  @Column({default: false})
  read: boolean;

  // @ManyToOne(() => User)
  // @JoinColumn({ name: 'provider_id' })
  // provider: User;

  // @Column('timestamp with time zone')
  // date: Date;


  // @Column()
  // user_id: string;

  // @ManyToOne(() => User)
  // @JoinColumn({ name: 'user_id' })
  // user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Notification;
