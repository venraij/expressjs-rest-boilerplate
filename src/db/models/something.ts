import { Table, Column, Model, PrimaryKey, IsUUID, AllowNull, HasMany, Unique } from 'sequelize-typescript';

@Table({
  paranoid: true,
  defaultScope: {
    attributes: {
      exclude: [
        'createdAt',
        'updatedAt',
        'deletedAt',
      ],
    },
  },
})
export class Something extends Model<Something> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string;

  @AllowNull(false)
  @Column
  alsoSomething: string

  @AllowNull(false)
  @Unique(true)
  @Column
  something: string
}
