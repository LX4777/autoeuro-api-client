import { AutoeuroService } from '../AutoeuroService.js';

const token = 'YOUR TOKEN HAS TO BE HERE';

const client = new AutoeuroService({
  baseURL: 'https://api.autoeuro.ru/api/v2/json',
  token: token,
  timeout: 2000, // опционально
});

const example = async () => {
  const response =  await client.getBalance().catch((err) => {
    console.error(err)
    return null
  })

  console.log(response);
}

example()