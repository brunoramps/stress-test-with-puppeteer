import puppeteer from 'puppeteer';

let abas = 2;
let nAba = 1;

const browser = await puppeteer.launch({
    headless: true        
});
const userAgent = 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';    
const url = 'https://www.pingoo.casa/torneira-para-banheiro-cascata-misturador-monocomando-alta-parana-prata';

while(abas>0){

    const page = await browser.newPage();
    await page.setUserAgent(userAgent);
    testarHome(page,browser, nAba);
    
    console.log(`aba ${nAba} inciada`);
  
    abas--;
    nAba++;
}

async function testarHome(page,browser, nAba){    
    
    const numAba = nAba;
    const response = await page.goto(url, {waitUntil: 'networkidle2', timeout: 0});
    
    const title = await page.title();
    const status = response.status();    
    if(status!=200){
        await page.screenshot({ 
            path: `./stress-test-home/prints/erro/erro-${status}-${Date.now()}.png`,
            type: 'png',
            fullPage: true,
        });
    }
    
    await page.close();
    console.log(`Aba ${numAba}: ${status} | ${title}`)
    if(numAba==abas+1) await browser.close();
}