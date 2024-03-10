import * as fs from 'fs';

function savePost(le_title: any, le_content: any) {
    const leData = {
        title: le_title,
        content: le_content
    }

    const real_data = JSON.stringify(leData);

    const polite_title = le_title.toLowerCase().replace(/ /g, '-');

    fs.writeFile(`${process.cwd()}/src/content/${polite_title}.json`, real_data, (error) => {
        if (error) {
            // logging the error
            console.error(error);
            throw error;
        }
        console.log(`${polite_title}.json has been saved yo.`);
    });
}


// part stolen from script tag originally

const password = document.getElementById("password");
const password_btn = document.getElementById("password-btn");

const account = document.getElementById("account-page");
const editor = document.getElementById("editor-page");

const error_boy = document.getElementById("error");

const post_btn = document.getElementById("post-btn");
const post_title = document.getElementById("title");
const post_content = document.getElementById("content");

post_btn.addEventListener("click", function () {
    console.log('savin...');
    savePost(post_title.value, post_content.value);
});

password_btn?.addEventListener("click", function () {
    checkPassword(password?.value);
});

password.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        checkPassword(password?.value);
    }
});

function checkPassword(lePass) {
    if (lePass == "directeur") {
        account.style.display = "none";
        editor.style.display = "block";
    } else {
        error_boy.innerText = " Mauvais mot de passe!";
    }
}