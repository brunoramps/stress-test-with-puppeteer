import { stressTest } from './scripts/stressTest.js'

let quantidadeDeAbasSimultaneas = 10;
const url = 'https://www.pingoo.casa/torneira-para-banheiro-cascata-misturador-monocomando-alta-parana-prata';
const userAgentChrome = 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
const verChromeExecutando = false;

stressTest(quantidadeDeAbasSimultaneas, url, userAgentChrome, verChromeExecutando);