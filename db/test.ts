import { Sequelize } from 'sequelize';
import sqlite3 from 'sqlite3'; // eslint-disable-line node/no-unpublished-import
import models from './model';
import { Context } from '.';

type Options = {
    printSql?: boolean;
};

async function init(options: Options = {}): Promise<Context> {
    const context: Context = {
        sequelize: null,
        models: {},
    };

    context.sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        dialectModule: sqlite3,
        logging: options.printSql ? console.log : () => {}, // eslint-disable-line no-console
        define: {
            freezeTableName: true,
        },
    });

    Object.entries(models).forEach(([modelName, modelDef]) => {
        const model = modelDef(context.sequelize);
        context.models[modelName as keyof typeof models] = model as any;
    });
    Object.values(context.models).forEach(model => {
        model.associate(context.models);
    });

    await context.sequelize.sync();
    return context;
}

async function teardown(context: Context): Promise<void> {
    await context.sequelize.close();
}

function sleep(time: number) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(null);
        }, time);
    });
}

async function useTestDb(cb: (context: Context) => Promise<void>, options: Options = {}): Promise<void> {
    const context = await init(options);
    try {
        await cb(context);
    } finally {
        await sleep(1); // Defer teardown to end of event loop so that in-flight db requests have a chance to resolve
        await teardown(context);
    }
}

export default useTestDb;
