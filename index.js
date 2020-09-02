const {PubSub} = require('@google-cloud/pubsub');
const pubsub = new PubSub();

exports.publish = async (req, res) => {
  // const topic_name = 'mytopic2';
  const topic_name = process.env.TOPIC;
  received_message = Buffer.from(req.data, 'base64').toString();
  parsed_message = JSON.parse(received_message);

  console.log(`Publishing message to topic ${topic_name}`);

  // References an existing topic
  const topic = pubsub.topic(topic_name);

  const messageObject = {
    data: {
      message: "Received a message from Cloud Function, and the file name is " + parsed_message.name,
    },
  };
  const messageBuffer = Buffer.from(JSON.stringify(messageObject), 'utf8');

  // Publishes a message
  try {
    await topic.publish(messageBuffer);
    console.log('Message published');
  } catch (err) {
    console.error(err);
    console.log("Error!" + err);
    return Promise.reject(err);
  }
};