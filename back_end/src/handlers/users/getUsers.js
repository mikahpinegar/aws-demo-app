const dynamoDb = require('../../utils/dynamoDbClient');
const createResponse = require('../../utils/response');

exports.handler = async (event) => {
  const params = {
    TableName: 'Users'
  };

  try {
    const data = await dynamoDb.scan(params).promise();
    return createResponse(200, data.Items);
  } catch (error) {
    return createResponse(500, { message: 'Failed to get users', error: error.message });
  }
};