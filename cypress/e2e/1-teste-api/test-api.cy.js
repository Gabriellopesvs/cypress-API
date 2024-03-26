import { request } from '../../support/utils.js';
import { Data as data } from '../../request-body/body.js';

describe('Doing API validation - CHAINING FUNCTION', () => {
  it('Type POST no assertion', () => {
    // Realiza apenas a requisição usando a função request
    request({ method: 'POST', endpoint: 'url_post', payload: data.body_post });
  });

  it('Type POST with assertion', () => {
    // Faz a mesma requisição usando a função request, seguida pelo encadeamento da função validate.
    request({ method: 'POST', endpoint: 'url_post', payload: data.body_post }).validate(
      { path: 'name', position: 1, equal: 'morpheus' },
      { path: 'status', equal: 201 },
      { path: 'createdAt', wrap: true }
    );
  });

  it('Type GET no assertion', () => {
    request({ method: 'GET', endpoint: 'url_get' });
  });

  it('Type GET with assertion', () => {
    request({ method: 'GET', endpoint: 'url_get' }).validate({ path: 'status', equal: 200 }, { path: 'data' });
  });

  it('Type PUT', () => {
    request({ method: 'PUT', endpoint: 'url_put', payload: data.body_put }).validate(
      { path: 'status', equal: 200 },
      { path: 'name', equal: 'morpheus' }
    );
  });

  it('Type DELETE', () => {
    request({ method: 'DELETE', endpoint: 'url_delete' }).validate({ path: 'status', equal: 204 });
  });
});
