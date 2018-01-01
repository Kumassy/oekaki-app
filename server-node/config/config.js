module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "db",
    "dialect": "mysql",
    "define": {
      "charset": "utf8",
      "collate": "utf8_general_ci",
      "timestamps": true
    }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "db",
    "dialect": "mysql",
    "define": {
      "charset": "utf8",
      "collate": "utf8_general_ci",
      "timestamps": true
    }
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "define": {
      "charset": "utf8",
      "collate": "utf8_general_ci",
      "timestamps": true
    }
  }
}
