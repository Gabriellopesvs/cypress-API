import { request, assert } from '../../support/supports';
import { Data as data } from '../../request-body/body';

// TESTE ANTERIOR

describe('Doing API validation - FUNCTION WITHOUT CHAINING', () => {
  it('POST type and assert', () => {
    request({ type: 'POST', endpoint: 'url_post', body: data.body_post });
    assert({ alias: 'POST', path: 'status', value: 201 });
    assert({ alias: 'POST', path: 'name', value: 'morpheus' });
    assert({ alias: 'POST', path: 'job', value: 'leader' });
    assert({ alias: 'POST' });
  });

  it('GET type and assert', () => {
    request({ type: 'GET', endpoint: 'url_get' });
    assert({ alias: 'GET', path: 'status', value: 200 });
    assert({ alias: 'GET', path: 'data' });
    assert({ alias: 'GET' });
  });

  it('PUT type and assert', () => {
    request({ type: 'PUT', endpoint: 'url_put', body: data.body_put });
    assert({ alias: 'PUT', path: 'status', value: 200 });
    assert({ alias: 'PUT', path: 'name', value: 'morpheus' });
    assert({ alias: 'PUT', path: 'job', value: 'zion resident' });
    assert({ alias: 'PUT' });
  });

  it('DELETE type and assert', () => {
    request({ type: 'DELETE', endpoint: 'url_delete' });
    assert({ alias: 'DELETE', path: 'status', value: 204 });
  });
});
