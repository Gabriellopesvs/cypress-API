export function request({ type = type, endpoint = endpoint, body = null }) {
  if (type === 'POST') {
    return cy
      .request({
        method: 'POST',
        url: Cypress.env(Cypress.env('run'))[endpoint],
        body: body === undefined ? null : body,
      })
      .then((response) => {
        cy.step(JSON.stringify(response.body, null, 2));
        cy.wrap(response, { log: false }).as('POST');
        console.log('Response request POST', response);
      });
  }

  if (type === 'GET') {
    return cy
      .request({
        method: 'GET',
        url: Cypress.env(Cypress.env('run'))[endpoint],
      })
      .then((response) => {
        cy.step(JSON.stringify(response.body, null, 2));
        cy.wrap(response, { log: false }).as('GET');
        console.log('Response request GET', response);
      });
  }

  if (type === 'PUT') {
    return cy
      .request({
        method: 'PUT',
        url: Cypress.env(Cypress.env('run'))[endpoint],
        body: body === undefined ? null : body,
      })
      .then((response) => {
        cy.step(JSON.stringify(response.body, null, 2));
        cy.wrap(response, { log: false }).as('PUT');
        console.log('Response request PUT', response);
      });
  }

  if (type === 'DELETE') {
    return cy
      .request({
        method: 'DELETE',
        url: Cypress.env(Cypress.env('run'))[endpoint],
      })
      .then((response) => {
        cy.step(JSON.stringify(response.body, null, 2));
        cy.wrap(response, { log: false }).as('DELETE');
        console.log('Response request DELETE', response);
      });
  }
}

export function assert({ alias = alias, path = null, value = null }) {
  cy.get(`@${alias}`, { log: false }).then((res) => {
    if (path && value !== null) {
      const actualValue = Support.findJSON(res, path);
      expect(actualValue).to.equal(value);
      expect(actualValue).not.to.be.null;
      expect(actualValue).not.to.be.undefined;
    } else {
      expect(res).not.to.be.null;
      expect(res).not.to.be.undefined;
    }
  });
}

export class Support {
  static findJSON(obj, keyToFind, position = 1) {
    let result = null;
    let fullValue = null;
    let count = 0;

    function traverse(obj) {
      let value;
      if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
          value = traverse(obj[i]);
          if (value) return value;
        }
      } else if (typeof obj === 'object' && obj !== null) {
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (key === keyToFind && Array.isArray(obj[key])) {
              if (obj[key].length >= position) {
                result = obj[key][position - 1];
                fullValue = obj[key];
                throw new Error('found value');
              }
            } else if (key === keyToFind) {
              count++;
              if (count === position) {
                result = obj[key];
                throw new Error('found value');
              }
            }
            value = traverse(obj[key]);
            if (value) return value;
          }
        }
      }
    }
    try {
      traverse(obj);
    } catch (e) {
      if (e.message !== 'found value') {
        throw e;
      }
    }
    return fullValue
      ? { Object: fullValue, value: result }
      : result
      ? result
      : console.error(`Path ** ${keyToFind} ** not fround`);
  }
}
