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

export function request({ method = 'POST', endpoint = endpoint, payload = null }) {
  const requestPromise = cy.request({
    method: method,
    url: Cypress.env(Cypress.env('run'))[endpoint],
    body: payload,
  });

  // Sem validação
  requestPromise.then((response) => {
    cy.step(JSON.stringify(response.body, null, 2));
    cy.wrap(response, { log: false }).as('response');
    console.log(`Response method ${method}`, response);
  });

  // Com validações
  return {
    validate: (...validationChecks) => {
      return requestPromise.then((response) => {
        if (validationChecks && validationChecks.length > 0) {
          validate(response, ...validationChecks);
        }
        return response;
      });
    },
  };
}

export function validate(response, ...checks) {
  if (!checks || checks.length === 0) {
    // Retorna se não houver checks de validação
    return;
  }

  checks.forEach((check) => {
    if (!check.path) {
      throw new Error('Path is required for each check.');
    }

    try {
      let foundValue;

      if (check.position !== undefined) {
        // Caso a posição seja fornecida, ajusta o findJSON para lidar com isso
        foundValue = Support.findJSON(response, check.path, check.position);
      } else {
        // Mantém o comportamento original do findJSON
        foundValue = Support.findJSON(response, check.path);
      }

      // Verificar que o valor encontrado não é null ou undefined.
      expect(foundValue, `Value at path ${check.path} is null or undefined`).not.to.be.null;

      if (check.equal !== undefined) {
        // Simplificado para verificar igualdade diretamente.
        expect(foundValue, `Value at path ${check.path} does not match expected value`).to.equal(check.equal);
      }

      // Envelopar e aliasar o valor encontrado, se necessário.
      if (check.wrap) {
        Cypress.env('storage', foundValue);
      }
    } catch (error) {
      // Tratar erros e fornecer mensagens de log informativas.
      cy.log(`Error validating check for path ${check.path}: ${error.message}`);
      throw error;
    }
  });
}
