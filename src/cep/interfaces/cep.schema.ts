import * as mongoose from 'mongoose';

export const CepSchema = new mongoose.Schema(
  {
    cep: {
      type: String,
      unique: true,
    },
    city: {
      type: String,
    },
  },
  { timestamps: true, collection: 'cep' },
);
