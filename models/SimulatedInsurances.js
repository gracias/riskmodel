// kjzl6hvfrbw6c7yaose5wg24yqmztdljobiup3s3g82zwohqz92g3ra90xivd3z

const createModel = async () => {
  const modelDefinition = {
  "name": "SimulatedInsurances",
  "version": "2.0",
  "interface": false,
  "immutableFields": [],
  "implements": [],
  "accountRelation": {
    "type": "list"
  },
  "schema": {
    "type": "object",
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "properties": {
      "insurance_num": {
        "type": "number"
      },
      "age": {
        "type": "number"
      },
      "sum_assured": {
        "type": "number"
      }
    },
    "additionalProperties": false
  }
};
    
  let result = await orbisdb.ceramic.createModel(modelDefinition);
};
