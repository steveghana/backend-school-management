import db from '../api/db';

import config from '../config/config';

export type Dependencies = Partial<{
    db: typeof db;
  
    config: Partial<typeof config>;
}>;

const globalDefaultDependencies: Dependencies = {
    db: db,
    config,
};

export function injectDependencies(
    dependencies: Dependencies,
    requestedDependencies: Array<keyof Dependencies>,
    defaultDependencies = globalDefaultDependencies
): Dependencies {
    if (!dependencies) {
        dependencies = {};
    }

    requestedDependencies.forEach(requestedDependency => {
        if (!dependencies[requestedDependency]) {
            (dependencies[requestedDependency] as any) = defaultDependencies[requestedDependency];
        }
    });

    return dependencies;
}

export default {
    injectDependencies,
};
