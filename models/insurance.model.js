import { DataTypes } from '@sequelize/core';
import { sequelize } from '../utils/dbConfig.js';


export const User = sequelize.define(
  'User',
  {
    // Model attributes are defined here
    resourceAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
  }

);

