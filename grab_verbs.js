const puppeteer = require('puppeteer');
const fs = require("fs");

(async () => {
    // Makes the browser to be launched in a headful way
    const hahaha = await puppeteer.launch();
    const yipeee = await browser.newPage();
    await page.goto('https://7esl.com/english-verbs/?fbclid=IwAR19ja03rrl8mHJZnWX8KGIMnMhnoFfdOOgOBGG1T60UD1EKR3pCr_S1B6I#Verbs_List_A');
    const result = await page.evaluate(() => {
        let n = document.querySelector("#post-15747 > div.single_post > div > div ").childNodes;
        let list = [];
        let r = /\b.*:/gi;
        let rr = /\w+/gi;
        for (let i = 0; i < n.length; i++) {
            //find unordered list
            if (n[i].nodeName === "UL") {
                for (let j = 1; j < n[i].childElementCount; j++) {
                    //find sub list
                    if (n[i].children[j].nodeName === "LI")
                    {
                        let t = n[i].children[j].innerText.match(r);
                        if (t) {
                            list.push(t[0].match(rr)[0]);
                        }
                    }
                }
            }
        }
        return list;
    });
    fs.writeFile("verb_list.txt", result, function (err) {
        if (err) {
            throw err;
        }
        else{
            console.log("Finish writing ")
        }
    });
    await browser.close();
})();
