// https://medium.com/infocentric/setup-a-rest-api-with-sequelize-and-express-js-fae06d08c0a7

import { Sequelize, Dialect, Options } from 'sequelize';
import pg from 'pg';
import models from './model';
import logger from '../../utils/log';
import config from '../../config/config';
interface DatabaseConfig extends Options {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    dialectModule: any; // Replace with the correct type for the pg dialect module
    logging: (sql: string) => void;
    define: {
        freezeTableName: boolean;
    };
}
export type Context = {
    sequelize: Sequelize ;
    models: {
        [key in keyof Partial<typeof models>]: ReturnType<typeof models[key]>;
    };
};

const globalContext: Context = {
 
    sequelize: null,
    models: {},
};

export async function init(port = NaN, context = globalContext): Promise<void> {
    const dbConfig: DatabaseConfig = {
        dialect: 'postgres' as Dialect,
        host: process.env.DB_HOST || 'localhost',
        port: port || Number(process.env.DB_PORT) || config.databasePort,
        database: process.env.DB_NAME || 'postgres' as string,
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || 'password',
        dialectModule: pg,
        logging: sql => logger.log('db', sql),
        define: {
            freezeTableName: true,
        },
    };

   

    context.sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

    Object.entries(models).forEach(([modelName, modelDef]) => {
        const model = modelDef(context.sequelize);
        context.models[modelName as keyof typeof models] = model as any;
    });
    // Object.values(context.models).forEach(model => {
    //     model.associate(context.models);
    // });

    await context.sequelize.authenticate();
    if (process.env.NODE_ENV !== 'production') {
        await context.sequelize.sync();
    }
}

export async function teardown(context: Context): Promise<void> {
    await context.sequelize!.close();
}

export default globalContext;
