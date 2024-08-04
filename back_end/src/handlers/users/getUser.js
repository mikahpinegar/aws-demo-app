const dynamoDb = require('../../utils/dynamoDbClient');
const createResponse = require('../../utils/response');

exports.handler = async (event) => {
  const { userId } = event.pathParameters;

  const params = {
    TableName: 'Users',
    Key: {
      userId: userId,
    },
  };

  try {
    const result = await dynamoDb.get(params).promise();
    if (result.Item) {
      return createResponse(200, result.Item);
    } else {
      return createResponse(404, { error: 'User not found' });
    }
  } catch (error) {
    return createResponse(500, { message: JSON.stringify({ message: 'Failed to get user', error: error.message }) });
  }
};