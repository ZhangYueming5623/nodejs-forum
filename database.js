const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'pure-match-test.cgpmpevlpq9p.us-east-2.rds.amazonaws.com',
    database: 'postgres',
    password: 'Zj19550727',
    port: 5432,
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
};
