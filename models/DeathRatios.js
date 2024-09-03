// kjzl6hvfrbw6c75siyigs10ov18nnm555xfdjwk4npg5w8so3oo39bxp358ta6u

const createModel = async () => {
  const modelDefinition = {
  "name": "DeathRatios",
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
      "age": {
        "type": "number"
      },
      "male_death": {
        "type": "number"
      }
    },
    "additionalProperties": false
  }
};
    
  let result = await orbisdb.ceramic.createModel(modelDefinition);
};
