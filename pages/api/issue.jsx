import mysql2 from 'mysql2';
import nextConnect from 'next-connect';

const handler = nextConnect();

handler.post((req, res) => {
  const connection = mysql2.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'pinpon77',
    database: 'issues',
  });

  connection.connect();

  const { name, type, description } = req.body;

  if (!name || !type || !description) {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  }

  const query = `INSERT INTO bugs (name, type, description) VALUES ('${name}', '${type}', '${description}')`;

  connection.query(query, function (error, results, fields) {
    if (error) {
      console.error('Error creating bug:', error);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      console.log('Bug created successfully');
      res.status(200).json({ message: 'Bug created successfully' });
    }
  });

  connection.end();
});

export default handler;