import React from 'react';
import { render } from '@testing-library/react';
import { getPosts } from './App';

import axios from 'axios';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// test('qui est esse', async () => {
//   const data = await getPosts();
//   expect(data).toBe('qui est esse');
// });
// test('the getPosts fails with an error', async () => {
//   expect.assertions(1);
//   try {
//     await getPosts();
//   } catch (e) {
//     expect(e).toMatch('error');
//   }
// });

// test('api call', async () => {
//   expect.assertions(1);
//   const response = await functions.getPosts();
//   expect(reponse).toEqual();
// });
jest.mock('axios');
describe('getPosts', () => {
  it('fetches successfully data from an API', async () => {
    const data = {
      data: {
        hits: [
          {
            objectID: '1',
            title: 'a'
          },
          {
            objectID: '2',
            title: 'b'
          }
        ]
      }
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(getPosts()).resolves.toEqual(data);
    expect(axios.get).toHaveBeenCalledWith(apiUrl);
  });
});

it('fetches erroneously data from an API', async () => {
  const errorMessage = 'Network Error';
  axios.get.mockImplementationOnce(() =>
    Promise.reject(new Error(errorMessage))
  );
});
