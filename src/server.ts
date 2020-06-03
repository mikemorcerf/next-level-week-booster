import express from 'express';

const app = express();

app.get('/users', (request, response)=>{
  return response.json([
    'Mike',
    'Samuel'
  ]);
});

app.listen(3333);