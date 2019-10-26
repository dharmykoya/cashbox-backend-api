const sequelize = new Sequelize('cashbox', 'SA', 'solomon2019', {
    dialect: 'mssql',
    dialectOptions: {
      options: {
        useUTC: false,
        dateFirst: 1,
      }
    }
  })