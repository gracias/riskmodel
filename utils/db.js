import { sequelize } from "./dbConfig.js";

export const synchronize = async () => {
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');
}

export const connectToDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

export const disconnectDb = async () => {
    try {
        await sequelize.close();
        console.log('Connection has been closed successfully.');
      } catch (error) {
        console.error('Unable to disconnect from the database:', error);
      }
}