import { EntitySchemaColumnOptions } from 'typeorm';

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
