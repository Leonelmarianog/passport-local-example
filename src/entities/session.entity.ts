import { ISession } from 'connect-typeorm';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity()
export class Session implements ISession {
  @Index()
  @Column('bigint')
  public readonly expiredAt!: number;

  @PrimaryColumn('varchar', { length: 255 })
  public readonly id!: string;

  @Column('text')
  public readonly json!: string;
}
