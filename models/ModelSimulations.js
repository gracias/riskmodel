// Model ID: kjzl6hvfrbw6c6dr50y6eh16ikvajr5ifbtbdbsqr22zn5qxe2gsxsu0nm93n1o

const createModel = async () => {
  const modelDefinition = {
    "name": "ModelSimulations",
    "version": "2.0",
    "interface": false,
    "immutableFields": [],
    "implements": [],
    "accountRelation": {
      "type": "list"
    },
    "schema": {
      "type": "object",
      "$defs": {
        "DID": {
          "type": "string",
          "title": "DID",
          "pattern": "^did:[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+:[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]*:?[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]*:?[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]*$",
          "maxLength": 100
        },
        "DateTime": {
          "type": "string",
          "title": "DateTime",
          "format": "date-time",
          "maxLength": 100
        }
      },
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "properties": {
        "run_id": {
          "type": "string"
        },
        "run_num": {
          "type": "number"
        },
        "simulation_num": {
          "type": "number"
        },
        "claims": {
          "type": "number"
        },
        "total_claims_cost": {
          "type": "number"
        },
        "profit_share": {
          "type": "number"
        },
        "created_at": {
          "$ref": "#/$defs/DateTime"
        },
        "modified_at": {
          "$ref": "#/$defs/DateTime"
        },
        "account": {
          "$ref": "#/$defs/DID"
        },
        "order_num": {
          "type": "number"
        },
        "percentile": {
          "type": "number"
        }
      },
      "additionalProperties": false
    }
  };

  let result = await orbisdb.ceramic.createModel(modelDefinition);
};