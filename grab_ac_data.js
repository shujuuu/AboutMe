let autocoml = require('autocompl');
let firebase = require("firebase");
let fs = require("fs");

let verbs_list = fs.readFileSync("./verb_list.txt", 'utf8');
verbs_list = verbs_list.split(",");
let question_words = ["how", "what", "where", "when", "why"];
let adv_verbs = ["can", "do"];

let firebaseConfig = {
    apiKey: "AIzaSyA8HPBmzyUaI7IfjLfXShc1qzjuQzc8BEw",
    authDomain: "aboutme-f30b6.firebaseapp.com",
    databaseURL: "https://aboutme-f30b6.firebaseio.com",
    projectId: "aboutme-f30b6",
    storageBucket: "aboutme-f30b6.appspot.com",
    messagingSenderId: "92114102053",
    appId: "1:92114102053:web:4739ac7581e2b698891ccc"
};
firebase.initializeApp(firebaseConfig);
let ref = firebase.app().database().ref();

//We don't want to fuck with call back hells, so let's just create a promise functions
function get_ac_result(question, adv, verb){
    let query = question + " " + adv + " i " + verb;
    return new Promise((resolve, reject) => {
        autocoml(query, (err, suggestions) => {
            if (err){
                reject(err);
            }
            else{
                resolve(suggestions);
            }
        });
    });
}


function filter_suggestions(query, suggestions){
    let result = [];
    for (let suggestion in suggestions){
        suggestion = suggestions[suggestion];
        if (suggestion.length > 0){
            let suggestion_list = suggestion.split(" ");
            let query_list = query.split(" ");
            let throw_away = false;
            for (let i=0; i<3; i++){
                if (suggestion_list[i] !== query_list[i]){
                    throw_away  = true;
                    break
                }
            }
            if (!throw_away){
                result.push(suggestion);
            }
        }
    }
    return result;
}


async function get_ac_result_async(){
    for (let i=0; i<verbs_list.length; i++){
        let verb = verbs_list[i];
        let result = {};
        for (let question in question_words){
            question = question_words[question];
            result[question] = {};
            for (let adv in adv_verbs) {
                adv = adv_verbs[adv];
                let suggestions = await get_ac_result(question, adv, verb);
                let query = question + " " + adv + " i";
                suggestions = filter_suggestions(query, suggestions);
                result[question][adv] = suggestions;
            }
        }
        let new_path = verb + "/";
        let new_ref = firebase.database().ref(new_path);
        await new_ref.set(result);
        console.log("Finished writing results for " + verb);
    }
}



get_ac_result_async();















// autocoml('Batman and', function done(error, suggestions) {
//     console.log(suggestions);
// });



