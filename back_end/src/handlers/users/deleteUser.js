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
    await dynamoDb.delete(params).promise();
    return createResponse(200, { message: 'User deleted successfully' });
  } catch (error) {
    return createResponse(500, { message: JSON.stringify({ message: 'Failed to delete user', error: error.message }) });
  }
};