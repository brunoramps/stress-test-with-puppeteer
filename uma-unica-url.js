import puppeteer from 'puppeteer';

let browsers = 40;
let nBrowser = 1;
while(browsers>0){

    testarHome();
    
    console.log(`browser ${nBrowser} inciado`);
  
    browsers--;
    nBrowser++;
}

async function testarHome(){
    const userAgent = 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';    
    //const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1';    
    const url = 'https://www.pingoo.casa/';
    //const url = 'https://www.pingoo.casa/teste';
    //const url = 'https://www.pingoo.casa/pagina/sobre-a-empresa/';
    
    const browser = await puppeteer.launch({
        headless: true        
    });
    
    const page = await browser.newPage();
    
    await page.setUserAgent(userAgent);
    
    const response = await page.goto(url, {waitUntil: 'networkidle2', timeout: 0});
    
    const title = await page.title();
    const status = response.status();
    const date = new Date();
    if(status===500){
        await page.screenshot({ 
            path: `./stress-test-home/prints/erro/erro-500-${date.getMilliseconds()}.png`,
            type: 'png',
            fullPage: true,
        });
    }else{
        await page.screenshot({ 
            path: `./stress-test-home/prints/success/success-200-${date.getMilliseconds()}.png`,
            type: 'png',
            fullPage: true,
        });      
    }
    
    console.log(title, status)
    
    await browser.close();
}