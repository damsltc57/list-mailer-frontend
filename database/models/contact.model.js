import { DataTypes, Model } from '@sequelize/core';
import {
  AllowNull,
  Attribute,
  Default,
  DeletedAt,
  PrimaryKey,
  Table
} from '@sequelize/core/decorators-legacy';

@Table({
  tableName: 'Contact'
})
export class ContactModel extends Model {
  @Attribute(DataTypes.UUIDV4)
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  id;

  @Attribute(DataTypes.STRING)
  name;

  @DeletedAt
  @AllowNull
  deletedAt;
}
