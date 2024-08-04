const dynamoDb = require('../../utils/dynamoDbClient');
const createResponse = require('../../utils/response');
const { validateUser } = require('../../models/userModel');

exports.handler = async (event) => {
  const user = JSON.parse(event.body);

  const { error, value } = validateUser(user);

  if (error) {
    return createResponse(400, { error: error.details[0].message });
  }

  const params = {
    TableName: 'Users',
    Item: value,
  };

  try {
    await dynamoDb.put(params).promise();
    return createResponse(200, { message: 'User created successfully' });
  } catch (error) {
    return createResponse(500, { message: JSON.stringify({ message: 'Failed to create user', error: error.message }) });
  }
};