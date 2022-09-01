"use strict";
exports.__esModule = true;
var pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'root',
    database: 'userdatabase',
    port: 5432
});
