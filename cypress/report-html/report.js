// const fs = require('fs');
// const path = require('path');
// const { execSync } = require('child_process');

// function getProjectName() {
//   const currentDir = process.cwd();
//   return path.basename(currentDir);
// }

// function generateReport() {
//   const projectName = getProjectName();

//   try {
//     // Executar o script Cypress e capturar a saída
//     const output = execSync('npx cypress run --reporter json', { encoding: 'utf-8' });

//     // Extrair informações sobre os testes passados e falhados
//     const matchPassed = output.match(/Passing:\s+(\d+)/);
//     const matchFailed = output.match(/Failing:\s+(\d+)/);

//     const passedTests = matchPassed ? parseInt(matchPassed[1]) : 0;
//     const failedTests = matchFailed ? parseInt(matchFailed[1]) : 0;

//     // Gerar o relatório com as informações dos testes
//     const htmlContent = `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>${projectName}</title>
//         <style>
//           body {
//             background-color: #333;
//             color: white;
//             margin: 0;
//             font-family: Arial, sans-serif;
//           }

//           .report-container {
//             position: relative;
//             padding: 3px;
//             margin: 0;
//           }

//           .background-container {
//             position: absolute;
//             top: 0;
//             left: 0;
//             right: 0;
//             bottom: 0;
//             background: linear-gradient(130deg, #ff7a18, #af002d 41.07%, #319197 76.05%);
//             border-radius: 10px;
//             z-index: -1;
//           }

//           .title-container {
//             position: relative;
//             z-index: 2;
//             background-color: black;
//             padding: 20px;
//             border-radius: 10px;
//             text-align: center;
//             display: flex;
//             align-items: center;
//             justify-content: space-between; /* Espaço entre os elementos */
//           }

//           .title {
//             font-size: 24px;
//             font-weight: bold;
//             color: white;
//             margin: 0;
//           }

//           .test-summary {
//             display: flex;
//           }

//           .test-summary-item {
//             margin-left: 10px;
//           }
//         </style>
//       </head>
//       <body>

//         <div class="report-container">
//           <div class="background-container"></div>
//           <div class="title-container">
//             <div class="title">${projectName}</div>
//             <div class="test-summary">
//               <div class="test-summary-item">${passedTests} ✅</div>
//               <div class="test-summary-item">${failedTests} ❌</div>
//             </div>
//           </div>
//         </div>

//       </body>
//       </html>
//     `;

//     fs.writeFileSync('report.html', htmlContent);

//     console.log('Relatório gerado com sucesso: report.html');
//   } catch (error) {
//     console.error('Erro ao executar os testes Cypress:', error.message);
//   }
// }

// generateReport();

// const fs = require('fs');
// const path = require('path');
// const { exec } = require('child_process');

// function getProjectName() {
//   const currentDir = process.cwd();
//   return path.basename(currentDir);
// }

// function generateReport() {
//   const projectName = getProjectName();

//   try {
//     // Executar o script Cypress e capturar a saída
//     const command = 'npx cypress run --reporter json';
//     exec(command, (error, stdout, stderr) => {
//       if (error) {
//         console.error(`Erro ao executar os testes Cypress: ${stderr}`);
//         return;
//       }

//       // Use uma expressão regular para extrair o JSON da saída
//       const jsonRegex = /\{ "stats": [\s\S]*? \}/;
//       const match = stdout.match(jsonRegex);
//       console.log(match);

//       if (!match) {
//         console.error('Não foi possível encontrar o JSON na saída do Cypress.');
//         return;
//       }

//       const jsonStr = match[0];

//       try {
//         // Parse do JSON
//         const parsedJson = JSON.parse(jsonStr);

//         console.log('match', parsedJson);

//         console.log('Relatório gerado com sucesso: report.html');
//       } catch (jsonError) {
//         console.error('Erro ao fazer parse do JSON:', jsonError.message);
//       }
//     });
//   } catch (error) {
//     console.error('Erro ao executar os testes Cypress:', error.message);
//   }
// }

// generateReport();
