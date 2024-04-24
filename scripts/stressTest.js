import puppeteer from 'puppeteer';

export async function stressTest(quantidadeDeAbasSimultaneas, url, userAgentChrome, verChromeExecutando) {

    //Defina headless: false, se quiser assistir o browser executando o teste (CONSOME MAIS RECURSOS).
    let browser = await puppeteer.launch({
        headless: !verChromeExecutando,
        args: ['--no-startup-window', '--no-first-run'],
        waitForInitialPage: false
    });

    const userAgent = userAgentChrome;

    let contadorAbaAtual = 1;
    while (quantidadeDeAbasSimultaneas > 0) {

        const page = await browser.newPage();
        await page.setUserAgent(userAgent);

        startTest(url, page, browser, contadorAbaAtual);
        console.log(`aba ${contadorAbaAtual} inciada`);

        quantidadeDeAbasSimultaneas--;
        contadorAbaAtual++;
    }

}

async function startTest(url, page, browser, contadorAbaAtual) {

    const numAba = contadorAbaAtual;
    const response = await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

    const title = await page.title();

    const status = response.status();
    if (status != 200) {
        await page.screenshot({
            path: `./prints/status-${status}-${Date.now()}.png`,
            type: 'png',
            fullPage: true,
        });
    }

    await page.close();
    (await browser.pages()).pop()
    console.log(`Aba ${numAba}: ${status} | ${title}`)

    await verificaFimDoTeste(browser);
    
}

async function verificaFimDoTeste(browser){
    if ((await browser.pages()).length == 0) {
        await browser.close();
        console.log("Teste finalizado.")
    };
}