/* eslint-disable max-lines */
'use strict';

// noinspection JSUnusedGlobalSymbols
module.exports = {
  up: (queryInterface, Sequelize) => {
    const { STRING, DATE, BOOLEAN, INTEGER } = Sequelize;
    return queryInterface
      .createTable(
        'cities',
        {
          id: {
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            type: INTEGER
          },
          name: {
            type: STRING,
            allowNull: false
          },
          active: {
            type: BOOLEAN,
            allowNull: false
          },
          created_at: {
            type: DATE,
            allowNull: false
          },
          updated_at: {
            type: DATE,
            allowNull: false
          },
          deleted_at: DATE
        },
        {
          uniqueKeys: {
            actions_unique: {
              fields: ['name']
            }
          }
        }
      )
      .then(() =>
        queryInterface
          .createTable(
            'complaint_reasons',
            {
              id: {
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
                type: INTEGER
              },
              name: {
                type: STRING,
                allowNull: false
              },
              active: {
                type: BOOLEAN,
                allowNull: false
              },
              created_at: {
                type: DATE,
                allowNull: false
              },
              updated_at: {
                type: DATE,
                allowNull: false
              },
              deleted_at: DATE
            },
            {
              uniqueKeys: {
                actions_unique: {
                  fields: ['name']
                }
              }
            }
          )
          .then(() =>
            queryInterface
              .createTable(
                'users',
                {
                  id: {
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false,
                    type: INTEGER
                  },
                  email: {
                    type: STRING,
                    allowNull: false
                  },
                  password: {
                    type: STRING,
                    allowNull: false
                  },
                  rol: {
                    type: STRING,
                    allowNull: false
                  },
                  active: {
                    type: BOOLEAN,
                    allowNull: false
                  },
                  created_at: {
                    type: DATE,
                    allowNull: false
                  },
                  updated_at: {
                    type: DATE,
                    allowNull: false
                  },
                  deleted_at: DATE
                },
                {
                  uniqueKeys: {
                    actions_unique: {
                      fields: ['email']
                    }
                  }
                }
              )
              .then(() =>
                queryInterface
                  .createTable(
                    'derivation_types',
                    {
                      id: {
                        autoIncrement: true,
                        primaryKey: true,
                        allowNull: false,
                        type: INTEGER
                      },
                      name: {
                        type: STRING,
                        allowNull: false
                      },
                      codes: {
                        type: STRING,
                        allowNull: false
                      },
                      active: {
                        type: BOOLEAN,
                        allowNull: false
                      },
                      created_at: {
                        type: DATE,
                        allowNull: false
                      },
                      updated_at: {
                        type: DATE,
                        allowNull: false
                      },
                      deleted_at: DATE
                    },
                    {
                      uniqueKeys: {
                        actions_unique: {
                          fields: ['name']
                        }
                      }
                    }
                  )
                  .then(() =>
                    queryInterface
                      .createTable(
                        'disabilities',
                        {
                          id: {
                            autoIncrement: true,
                            primaryKey: true,
                            allowNull: false,
                            type: INTEGER
                          },
                          name: {
                            type: STRING,
                            allowNull: false
                          },
                          active: {
                            type: BOOLEAN,
                            allowNull: false
                          },
                          created_at: {
                            type: DATE,
                            allowNull: false
                          },
                          updated_at: {
                            type: DATE,
                            allowNull: false
                          },
                          deleted_at: DATE
                        },
                        {
                          uniqueKeys: {
                            actions_unique: {
                              fields: ['name']
                            }
                          }
                        }
                      )
                      .then(() =>
                        queryInterface
                          .createTable(
                            'violence_types',
                            {
                              id: {
                                autoIncrement: true,
                                primaryKey: true,
                                allowNull: false,
                                type: INTEGER
                              },
                              name: {
                                type: STRING,
                                allowNull: false
                              },
                              active: {
                                type: BOOLEAN,
                                allowNull: false
                              },
                              created_at: {
                                type: DATE,
                                allowNull: false
                              },
                              updated_at: {
                                type: DATE,
                                allowNull: false
                              },
                              deleted_at: DATE
                            },
                            {
                              uniqueKeys: {
                                actions_unique: {
                                  fields: ['name']
                                }
                              }
                            }
                          )
                          .then(() =>
                            queryInterface
                              .createTable(
                                'vulnerable_populations',
                                {
                                  id: {
                                    autoIncrement: true,
                                    primaryKey: true,
                                    allowNull: false,
                                    type: INTEGER
                                  },
                                  name: {
                                    type: STRING,
                                    allowNull: false
                                  },
                                  active: {
                                    type: BOOLEAN,
                                    allowNull: false
                                  },
                                  created_at: {
                                    type: DATE,
                                    allowNull: false
                                  },
                                  updated_at: {
                                    type: DATE,
                                    allowNull: false
                                  },
                                  deleted_at: DATE
                                },
                                {
                                  uniqueKeys: {
                                    actions_unique: {
                                      fields: ['name']
                                    }
                                  }
                                }
                              )
                              .then(() =>
                                queryInterface
                                  .createTable(
                                    'representative_types',
                                    {
                                      id: {
                                        autoIncrement: true,
                                        primaryKey: true,
                                        allowNull: false,
                                        type: INTEGER
                                      },
                                      name: {
                                        type: STRING,
                                        allowNull: false
                                      },
                                      active: {
                                        type: BOOLEAN,
                                        allowNull: false
                                      },
                                      created_at: {
                                        type: DATE,
                                        allowNull: false
                                      },
                                      updated_at: {
                                        type: DATE,
                                        allowNull: false
                                      },
                                      deleted_at: DATE
                                    },
                                    {
                                      uniqueKeys: {
                                        actions_unique: {
                                          fields: ['name']
                                        }
                                      }
                                    }
                                  )
                                  .then(() =>
                                    queryInterface
                                      .createTable(
                                        'relationship_types',
                                        {
                                          id: {
                                            autoIncrement: true,
                                            primaryKey: true,
                                            allowNull: false,
                                            type: INTEGER
                                          },
                                          name: {
                                            type: STRING,
                                            allowNull: false
                                          },
                                          active: {
                                            type: BOOLEAN,
                                            allowNull: false
                                          },
                                          created_at: {
                                            type: DATE,
                                            allowNull: false
                                          },
                                          updated_at: {
                                            type: DATE,
                                            allowNull: false
                                          },
                                          deleted_at: DATE
                                        },
                                        {
                                          uniqueKeys: {
                                            actions_unique: {
                                              fields: ['name']
                                            }
                                          }
                                        }
                                      )
                                      .then(() =>
                                        queryInterface
                                          .createTable(
                                            'origin_types',
                                            {
                                              id: {
                                                autoIncrement: true,
                                                primaryKey: true,
                                                allowNull: false,
                                                type: INTEGER
                                              },
                                              name: {
                                                type: STRING,
                                                allowNull: false
                                              },
                                              active: {
                                                type: BOOLEAN,
                                                allowNull: false
                                              },
                                              created_at: {
                                                type: DATE,
                                                allowNull: false
                                              },
                                              updated_at: {
                                                type: DATE,
                                                allowNull: false
                                              },
                                              deleted_at: DATE
                                            },
                                            {
                                              uniqueKeys: {
                                                actions_unique: {
                                                  fields: ['name']
                                                }
                                              }
                                            }
                                          )
                                          .then(() =>
                                            queryInterface
                                              .createTable(
                                                'identification_types',
                                                {
                                                  id: {
                                                    autoIncrement: true,
                                                    primaryKey: true,
                                                    allowNull: false,
                                                    type: INTEGER
                                                  },
                                                  name: {
                                                    type: STRING,
                                                    allowNull: false
                                                  },
                                                  active: {
                                                    type: BOOLEAN,
                                                    allowNull: false
                                                  },
                                                  created_at: {
                                                    type: DATE,
                                                    allowNull: false
                                                  },
                                                  updated_at: {
                                                    type: DATE,
                                                    allowNull: false
                                                  },
                                                  deleted_at: DATE
                                                },
                                                {
                                                  uniqueKeys: {
                                                    actions_unique: {
                                                      fields: ['name']
                                                    }
                                                  }
                                                }
                                              )
                                              .then(() =>
                                                queryInterface
                                                  .createTable('victims', {
                                                    id: {
                                                      autoIncrement: true,
                                                      primaryKey: true,
                                                      allowNull: false,
                                                      type: INTEGER
                                                    },
                                                    identification_code: {
                                                      type: STRING,
                                                      allowNull: false
                                                    },
                                                    first_name: {
                                                      type: STRING,
                                                      allowNull: false
                                                    },
                                                    last_name: {
                                                      type: STRING,
                                                      allowNull: false
                                                    },
                                                    phone_number: {
                                                      type: STRING,
                                                      allowNull: false
                                                    },
                                                    address: {
                                                      type: STRING,
                                                      allowNull: false
                                                    },
                                                    birth_date: {
                                                      type: DATE,
                                                      allowNull: true
                                                    },
                                                    age: {
                                                      type: INTEGER,
                                                      allowNull: true
                                                    },
                                                    sex: {
                                                      type: STRING,
                                                      allowNull: true
                                                    },
                                                    sex_clarification: {
                                                      type: STRING,
                                                      allowNull: true
                                                    },
                                                    identification_type_id: {
                                                      type: INTEGER,
                                                      references: {
                                                        model: 'identification_types',
                                                        key: 'id'
                                                      },
                                                      allowNull: false
                                                    },
                                                    city_id: {
                                                      type: INTEGER,
                                                      references: {
                                                        model: 'cities',
                                                        key: 'id'
                                                      },
                                                      allowNull: false
                                                    },
                                                    created_at: {
                                                      type: DATE,
                                                      allowNull: false
                                                    },
                                                    updated_at: {
                                                      type: DATE,
                                                      allowNull: false
                                                    },
                                                    deleted_at: DATE
                                                  })
                                                  .then(() =>
                                                    queryInterface
                                                      .createTable('assistances', {
                                                        id: {
                                                          autoIncrement: true,
                                                          primaryKey: true,
                                                          allowNull: false,
                                                          type: INTEGER
                                                        },
                                                        phone_number: {
                                                          type: STRING,
                                                          allowNull: false
                                                        },
                                                        first_call: {
                                                          type: BOOLEAN,
                                                          allowNull: false
                                                        },
                                                        femicide_risk: {
                                                          type: BOOLEAN,
                                                          allowNull: false
                                                        },
                                                        code: {
                                                          type: STRING,
                                                          allowNull: false
                                                        },
                                                        summary: {
                                                          type: STRING,
                                                          allowNull: false
                                                        },
                                                        derivation_observation: {
                                                          type: STRING,
                                                          allowNull: false
                                                        },
                                                        assistance_type: {
                                                          type: STRING,
                                                          allowNull: false
                                                        },
                                                        victim_id: {
                                                          type: INTEGER,
                                                          references: {
                                                            model: 'victims',
                                                            key: 'id'
                                                          },
                                                          allowNull: false
                                                        },
                                                        user_id: {
                                                          type: INTEGER,
                                                          references: {
                                                            model: 'users',
                                                            key: 'id'
                                                          },
                                                          allowNull: false
                                                        },
                                                        datetime: {
                                                          type: DATE,
                                                          allowNull: false
                                                        },
                                                        created_at: {
                                                          type: DATE,
                                                          allowNull: false
                                                        },
                                                        updated_at: {
                                                          type: DATE,
                                                          allowNull: false
                                                        },
                                                        deleted_at: DATE
                                                      })
                                                      .then(() =>
                                                        queryInterface
                                                          .createTable('calls', {
                                                            id: {
                                                              autoIncrement: true,
                                                              primaryKey: true,
                                                              allowNull: false,
                                                              type: INTEGER
                                                            },
                                                            issue_address: {
                                                              type: STRING,
                                                              allowNull: false
                                                            },
                                                            vulnerable_population_id: {
                                                              type: INTEGER,
                                                              references: {
                                                                model: 'vulnerable_populations',
                                                                key: 'id'
                                                              },
                                                              allowNull: false
                                                            },
                                                            complaint_reason_id: {
                                                              type: INTEGER,
                                                              references: {
                                                                model: 'complaint_reasons',
                                                                key: 'id'
                                                              },
                                                              allowNull: false
                                                            },
                                                            origin_type_id: {
                                                              type: INTEGER,
                                                              references: {
                                                                model: 'origin_types',
                                                                key: 'id'
                                                              },
                                                              allowNull: false
                                                            },
                                                            assistance_id: {
                                                              type: INTEGER,
                                                              references: {
                                                                model: 'assistances',
                                                                key: 'id'
                                                              },
                                                              allowNull: false
                                                            },
                                                            created_at: {
                                                              type: DATE,
                                                              allowNull: false
                                                            },
                                                            updated_at: {
                                                              type: DATE,
                                                              allowNull: false
                                                            },
                                                            deleted_at: DATE
                                                          })
                                                          .then(() =>
                                                            queryInterface
                                                              .createTable('aggressors', {
                                                                id: {
                                                                  autoIncrement: true,
                                                                  primaryKey: true,
                                                                  allowNull: false,
                                                                  type: INTEGER
                                                                },
                                                                first_name: {
                                                                  type: STRING,
                                                                  allowNull: true
                                                                },
                                                                last_name: {
                                                                  type: STRING,
                                                                  allowNull: true
                                                                },
                                                                occupation: {
                                                                  type: STRING,
                                                                  allowNull: true
                                                                },
                                                                identification_code: {
                                                                  type: STRING,
                                                                  allowNull: true
                                                                },
                                                                address: {
                                                                  type: STRING,
                                                                  allowNull: true
                                                                },
                                                                identification_type_id: {
                                                                  type: INTEGER,
                                                                  references: {
                                                                    model: 'identification_types',
                                                                    key: 'id'
                                                                  },
                                                                  allowNull: true
                                                                },
                                                                city_id: {
                                                                  type: INTEGER,
                                                                  references: {
                                                                    model: 'cities',
                                                                    key: 'id'
                                                                  },
                                                                  allowNull: true
                                                                },
                                                                call_id: {
                                                                  type: INTEGER,
                                                                  references: {
                                                                    model: 'calls',
                                                                    key: 'id'
                                                                  },
                                                                  allowNull: false
                                                                },
                                                                created_at: {
                                                                  type: DATE,
                                                                  allowNull: false
                                                                },
                                                                updated_at: {
                                                                  type: DATE,
                                                                  allowNull: false
                                                                },
                                                                deleted_at: DATE
                                                              })
                                                              .then(() =>
                                                                queryInterface
                                                                  .createTable('disabilities_by_victim', {
                                                                    id: {
                                                                      autoIncrement: true,
                                                                      primaryKey: true,
                                                                      allowNull: false,
                                                                      type: INTEGER
                                                                    },
                                                                    disability_id: {
                                                                      type: INTEGER,
                                                                      references: {
                                                                        model: 'disabilities',
                                                                        key: 'id'
                                                                      },
                                                                      allowNull: false
                                                                    },
                                                                    victim_id: {
                                                                      type: INTEGER,
                                                                      references: {
                                                                        model: 'victims',
                                                                        key: 'id'
                                                                      },
                                                                      allowNull: false
                                                                    },
                                                                    created_at: {
                                                                      type: DATE,
                                                                      allowNull: false
                                                                    },
                                                                    updated_at: {
                                                                      type: DATE,
                                                                      allowNull: false
                                                                    },
                                                                    deleted_at: DATE
                                                                  })
                                                                  .then(() =>
                                                                    queryInterface
                                                                      .createTable('violence_types_by_call', {
                                                                        id: {
                                                                          autoIncrement: true,
                                                                          primaryKey: true,
                                                                          allowNull: false,
                                                                          type: INTEGER
                                                                        },
                                                                        violence_type_id: {
                                                                          type: INTEGER,
                                                                          references: {
                                                                            model: 'violence_types',
                                                                            key: 'id'
                                                                          },
                                                                          allowNull: false
                                                                        },
                                                                        call_id: {
                                                                          type: INTEGER,
                                                                          references: {
                                                                            model: 'calls',
                                                                            key: 'id'
                                                                          },
                                                                          allowNull: false
                                                                        },
                                                                        created_at: {
                                                                          type: DATE,
                                                                          allowNull: false
                                                                        },
                                                                        updated_at: {
                                                                          type: DATE,
                                                                          allowNull: false
                                                                        },
                                                                        deleted_at: DATE
                                                                      })
                                                                      .then(() =>
                                                                        queryInterface
                                                                          .createTable('derivation_types_by_assistance', {
                                                                            id: {
                                                                              autoIncrement: true,
                                                                              primaryKey: true,
                                                                              allowNull: false,
                                                                              type: INTEGER
                                                                            },
                                                                            derivation_type_id: {
                                                                              type: INTEGER,
                                                                              references: {
                                                                                model: 'derivation_types',
                                                                                key: 'id'
                                                                              },
                                                                              allowNull: false
                                                                            },
                                                                            assistance_id: {
                                                                              type: INTEGER,
                                                                              references: {
                                                                                model: 'assistances',
                                                                                key: 'id'
                                                                              },
                                                                              allowNull: false
                                                                            },
                                                                            created_at: {
                                                                              type: DATE,
                                                                              allowNull: false
                                                                            },
                                                                            updated_at: {
                                                                              type: DATE,
                                                                              allowNull: false
                                                                            },
                                                                            deleted_at: DATE
                                                                          })
                                                                          .then(() =>
                                                                            queryInterface.createTable(
                                                                              'representatives',
                                                                              {
                                                                                id: {
                                                                                  autoIncrement: true,
                                                                                  primaryKey: true,
                                                                                  allowNull: false,
                                                                                  type: INTEGER
                                                                                },
                                                                                first_name: {
                                                                                  type: STRING,
                                                                                  allowNull: false
                                                                                },
                                                                                last_name: {
                                                                                  type: STRING,
                                                                                  allowNull: false
                                                                                },
                                                                                representative_type_id: {
                                                                                  type: INTEGER,
                                                                                  references: {
                                                                                    model: 'representative_types',
                                                                                    key: 'id'
                                                                                  },
                                                                                  allowNull: false
                                                                                },
                                                                                relationship_type_id: {
                                                                                  type: INTEGER,
                                                                                  references: {
                                                                                    model: 'relationship_types',
                                                                                    key: 'id'
                                                                                  },
                                                                                  allowNull: false
                                                                                },
                                                                                call_id: {
                                                                                  type: INTEGER,
                                                                                  references: {
                                                                                    model: 'calls',
                                                                                    key: 'id'
                                                                                  },
                                                                                  allowNull: false
                                                                                },
                                                                                created_at: {
                                                                                  type: DATE,
                                                                                  allowNull: false
                                                                                },
                                                                                updated_at: {
                                                                                  type: DATE,
                                                                                  allowNull: false
                                                                                },
                                                                                deleted_at: DATE
                                                                              }
                                                                            )
                                                                          )
                                                                      )
                                                                  )
                                                              )
                                                          )
                                                      )
                                                  )
                                              )
                                          )
                                      )
                                  )
                              )
                          )
                      )
                  )
              )
          )
      );
  },
  down: ({ dropTable }) =>
    dropTable('representatives').then(() =>
      dropTable('aggressors').then(() =>
        dropTable('violence_types_by_call').then(() =>
          dropTable('violence_types_by_assistance').then(() =>
            dropTable('disabilities_by_victim').then(() =>
              dropTable('victims').then(() =>
                dropTable('calls').then(() =>
                  dropTable('assistances').then(() =>
                    dropTable('identification_types').then(() =>
                      dropTable('origin_types').then(() =>
                        dropTable('relationship_types').then(() =>
                          dropTable('representative_types').then(() =>
                            dropTable('vulnerable_populations').then(() =>
                              dropTable('violence_types').then(() =>
                                dropTable('cities').then(() =>
                                  dropTable('complaint_reasons').then(() =>
                                    dropTable('users').then(() =>
                                      dropTable('derivation_types').then(() => dropTable('disabilities'))
                                    )
                                  )
                                )
                              )
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
};
