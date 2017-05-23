import 'whatwg-fetch';
import getBaseUrl from './baseUrl';

const baseUrl = getBaseUrl();

const handleUrl = url => `${baseUrl}/${url}`;

const onSucess = response => response.json();

const onError = error => console.log(error);  // eslint-disable-line no-console

const get = url => fetch(handleUrl(url)).then(onSucess, onError);

const del = (url) => {
  const request = new Request(handleUrl(url), {
    method: 'DELETE',
  });

  return fetch(request).then(onSucess, onError);
};

export const getUsers = () => get('users');

export const deleteUser = id => del(`users/${id}`);
