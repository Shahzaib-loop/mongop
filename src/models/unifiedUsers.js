module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("unified_users", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      linked_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['admin', 'gym', 'trainer', 'trainee']]
        },
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: true
    }
  )

  return User
}


//  to check constrains
//
// SELECT
//   conname,
//   conrelid::regclass AS table_from,
//   a.attname AS column_from,
//   confrelid::regclass AS table_to
// FROM
//   pg_constraint
//   JOIN pg_class ON conrelid = pg_class.oid
//   JOIN pg_attribute a ON a.attrelid = conrelid AND a.attnum = ANY(conkey)
// WHERE
//   conrelid = 'unified_users'::regclass;

//  to alter constrains
//
// ALTER TABLE unified_users DROP CONSTRAINT unified_users_linked_id_fkey;
