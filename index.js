import puppeteer from 'puppeteer';

let quantidadeDeAbasSimultaneas = 5;

let browser = await puppeteer.launch({
    headless: false        
});
const userAgent = 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';    
const url = 'https://www.pingoo.casa/torneira-para-banheiro-cascata-misturador-monocomando-alta-parana-prata';

let contadorAbaAtual = 1;
while(quantidadeDeAbasSimultaneas>0){

    const page = await browser.newPage();
    await page.setUserAgent(userAgent);
    testarHome(page,browser, contadorAbaAtual);
    
    console.log(`aba ${contadorAbaAtual} inciada`);
  
    quantidadeDeAbasSimultaneas--;
    contadorAbaAtual++;
}

async function testarHome(page,browser, contadorAbaAtual){    
    
    const numAba = contadorAbaAtual;
    const response = await page.goto(url, {waitUntil: 'networkidle2', timeout: 0});
    
    const title = await page.title();
    const status = response.status();    
    if(status!=200){
        await page.screenshot({ 
            path: `./prints/status-${status}-${Date.now()}.png`,
            type: 'png',
            fullPage: true,
        });
    }
    
    await page.close();
    (await browser.pages()).pop()    
    console.log(`Aba ${numAba}: ${status} | ${title}`)
    
    if((await browser.pages()).length==1) {
        await browser.close();
        console.log("Teste finalizado.")
    };
}