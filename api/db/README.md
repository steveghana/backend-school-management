# What is this?

Here we initialize our [ORM](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping), which is [Sequelize](https://sequelize.org/).

We establish a connection to the [database](https://en.wikipedia.org/wiki/Database), and declare the [model](https://en.wikipedia.org/wiki/Relational_model).

In the development environment, when the application starts, Sequelize creates the [tables](https://en.wikipedia.org/wiki/Relational_database#Relations_or_tables) for you, if they don't exist yet.

In production, Sequelize doesn't create nor alter any tables, to avoid accidental [data loss](https://en.wikipedia.org/wiki/Data_loss).

When changing the model, please remember to author an SQL Migration, so that the production database can be updated to the latest model.
