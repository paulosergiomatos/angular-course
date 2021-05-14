build producao
no terminal rode o comando ng build --configuration production
sempre consulte a documentacao https://angular.io/cli/build

para configuracao do firebase e deploy manual veja a aula => https://www.youtube.com/watch?v=3DBTJWj9sI8


para carregar este proxy ao iniciar a aplicacao... utilize o comando:
npm run start primeiro pasta ..paulo-angular\requests-http\server e em um segundo terminal rode o mesmo comando npm run start na past ..paulo-angular\requests-http

os arquivos 'proxy.conf.js' e 'proxy.conf.json' são utilizados para configurar o proxy 
do angular para não ter que utilizar o cors. Pode usar um ou o outro e tem que referenciar no
package.json : como no trecho abaixo

"scripts": {
    "ng": "ng",
    "start": "ng serve --proxy-config proxy.conf.js",

para utilizar as configurações que estão no proxy.conf.js ... pathRewrite utilize o comando
npm run start ao inves do ng server 
observe as mensagens após executar o comando no terminal

********------------********
Not using the local TSLint version found for '...'
To enable code execution from the current workspace you must enable workspace library execution.

=> i fixed issue by this easy way:
=> File -> Save Workspace As...
=> by save the workspace vscode detect some libraries and work better in files



exemplo de proxy config em java script (no projeto tem o formato json)
const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://localhost:8000/',
    secure: false, // se for https => true
    logLevel: 'debug', // se utilizar o recurso do environment o compilador faz a troca quando publicar para produção
    pathRewrite: { '^/api': '' } // se vier na url o texto /api  substitui por ''
  }
];

module.exports = PROXY_CONFIG;

