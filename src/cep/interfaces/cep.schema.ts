import * as mongoose from 'mongoose';

export const CepSchema = new mongoose.Schema(
  {
    cep: {
      type: String,
      unique: true,
    },
    cidade: {
      type: String,
    },
  },
  { timestamps: true, collection: 'cep' },
);
