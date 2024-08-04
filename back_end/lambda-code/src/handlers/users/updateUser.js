const dynamoDb = require('../../utils/dynamoDbClient');
const createResponse = require('../../utils/response');
const { validateUser } = require('../../models/userModel');

exports.handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2)); // Log the received event
  
  const { userId } = event.pathParameters;
  let userUpdates;

  try {
    userUpdates = JSON.parse(event.body); // Parse the event body
  } catch (parseError) {
    console.error('Failed to parse event body:', parseError);
    return createResponse(400, { error: 'Invalid request body' });
  }

  console.log('Parsed user updates:', JSON.stringify(userUpdates, null, 2)); // Log the parsed user updates

  const { error, value } = validateUser({ ...userUpdates, userId });

  if (error) {
    console.error('Validation error:', error);
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
    console.log('Update result:', JSON.stringify(result, null, 2)); // Log the update result
    return createResponse(200, result.Attributes);
  } catch (error) {
    console.error('Failed to update user:', error);
    return createResponse(500, { message: 'Failed to update user', error: error.message });
  }
};