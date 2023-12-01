import axios from 'axios';

export const fetch_apartments = async ({ queryKey }) => {
  const [_, offset, limit] = queryKey;
  try {
    const { data } = await axios.get('http://172.20.0.3:3000/', {
      params: {
        offset,
        limit
      }
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}