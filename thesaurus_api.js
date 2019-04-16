const app = {};

const apiKey = '9ac261cd-f87f-47c0-aa8c-7cde65b78ac2'

let word;

app.getSynonyms = function(word) {
    $.ajax({
        url: `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}`,
        method: 'GET',
        dataType: 'json',
        data: {
            key: `${apiKey}`
        }
    }).then(function(data) {
        const antResults = data[0].meta.ants[0];
        const synResults = data[0].meta.syns[0];

        const antonyms = antResults.map(item => {
            return item;
        });
        const synonyms = synResults.map(item => {
            return item;
        });

        app.displayWords(antonyms, synonyms);
    });
}

app.displayWords = function(ant, syn) {
    const antListHtml = ant.map(item => {
        return `<li>${item}</li>`;
    }); 
    $('.antonym-list').html(antListHtml);
}

app.init = function() {

    $('form').on('submit', function(event) {
        event.preventDefault();
        const word = $('input[type=text]').val();
        app.getSynonyms(word);
    });
};


$(function() {

    app.init();

});