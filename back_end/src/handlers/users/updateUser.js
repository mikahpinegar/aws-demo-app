const dynamoDb = require('../../utils/dynamoDbClient');
const createResponse = require('../../utils/response');
const { validateUser } = require('../../models/userModel');

exports.handler = async (event) => {
  const { userId } = event.pathParameters;
  const userUpdates = event.body;
  const { error, value } = validateUser({ ...userUpdates, userId });

  if (error) {
    return createResponse(400, { error: error.details[0].message });
  }

  const params = {
    TableName: 'Users',
    Key: {
      userId: userId,
    },
    UpdateExpression: 'set #name = :name, email = :email, #role = :role',
    ExpressionAttributeNames: {
      '#name': 'name',
      '#role': 'role',
    },
    ExpressionAttributeValues: {
      ':name': value.name,
      ':email': value.email,
      ':role': value.role,
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await dynamoDb.update(params).promise();
    return createResponse(200, result.Attributes);
  } catch (error) {
    return createResponse(500, { message: JSON.stringify({ message: 'Failed to update user', error: error.message }) });
  }
};