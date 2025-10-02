/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable('articles', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true
        },
        date: {
            type: 'DATE',
            notNull: true,
            default: pgm.func('CURRENT_DATE')
        },
        content: {
            type: 'TEXT',
            notNull: true
        }
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('articles');
};
