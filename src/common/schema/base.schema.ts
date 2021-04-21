import { EntitySchema } from 'typeorm';
import { EntitySchemaOptions } from 'typeorm/entity-schema/EntitySchemaOptions';
import { BaseEntity } from '../entity/base.entity';

export class BaseSchema<T = BaseEntity> extends EntitySchema<T> {
  constructor(options: EntitySchemaOptions<T>) {
    super({
      ...options,
      columns: {
        id: {
          type: Number,
          primary: true,
          generated: true,
        },
        ...options.columns,
        createdAt: {
          type: 'timestamp with time zone',
          name: 'created_at',
          createDate: true,
        },
        updatedAt: {
          type: 'timestamp with time zone',
          name: 'updated_at',
          updateDate: true,
        },
        deletedAt: {
          type: 'timestamp with time zone',
          name: 'deleted_at',
          deleteDate: true,
        },
      },
    });
  }
}

/* import { EntitySchemaColumnOptions } from 'typeorm';

export const BaseSchema = {
  id: {
    type: Number,
    primary: true,
    generated: true,
  } as EntitySchemaColumnOptions,
  createdAt: {
    type: 'timestamp with time zone',
    name: 'created_at',
    createDate: true,
  } as EntitySchemaColumnOptions,
  updatedAt: {
    type: 'timestamp with time zone',
    name: 'updated_at',
    updateDate: true,
  } as EntitySchemaColumnOptions,
  deletedAt: {
    type: 'timestamp with time zone',
    name: 'deleted_at',
    deleteDate: true,
  } as EntitySchemaColumnOptions,
};
 */
