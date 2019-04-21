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
        const defResults = data[0].shortdef;        
        const antResults = data[0].meta.ants[0];
        const synResults = data[0].meta.syns[0];

        const definition = defResults.map(item => {
            return item;
        });
        const antonyms = antResults.map(item => {
            return item;
        });
        const synonyms = synResults.map(item => {
            return item;
        });

        app.displayWords(definition, antonyms, synonyms);
    });
}


app.displayWords = function(def, ant, syn) {
    const defListHtml = def.map(item => {
        return `<li class="def-list-item"><i class="fas fa-rainbow rainbow-text"></i> ${item}</li>`;
    });
    const antListHtml = ant.map(item => {
        return `<li class="ant-list-item">${item}</li>`;
    });
    const synListHtml = syn.map(item => {
        return `<li class="syn-list-item">${item}</li>`;
    });    
    $('.definition-list').html(defListHtml);
    $('.antonym-list').html(antListHtml.slice(0,9));
    $('.synonym-list').html(synListHtml.slice(0,9));
}



app.init = function() {

    app.getSynonyms('happiness');
    $('h2.chosen-word').html('Happiness');
    
    
    // WATCHING EVENT HANDLERS ------------------

    // form submit 
    $('form').on('submit', function(event) {
        event.preventDefault();
        $('#word' + '.flip-card-inner').removeClass('flip-this-card').addClass('unflip-this-card');
        const word = $('input[type=text]').val();
        $('h2.chosen-word').html(word.charAt(0).toUpperCase() + word.slice(1));
        $('.flip-card-inner').removeClass('flip-this-card').addClass('unflip-this-card');
        app.getSynonyms(word);
    });

    // 'new word' button 
    $('.new-word-button').on('click', function() {
        $('#word' + '.flip-card-inner').addClass('flip-this-card');
        $('h2').addClass('fade');
    });

    
    $('.flip-card-front').on('click', function() {
        const id = '#' + this.id;
        console.log(id);
        $(id+'.flip-card-inner').addClass('flip-this-card');
        $(this).removeClass('flip-this-card');
    });

    $('.flip-card-back').on('click', function() {
        const id = '#' + this.id;
        console.log(id);
        $(id+'.flip-card-inner').removeClass('flip-this-card').addClass('unflip-this-card');
    });
};

app.flipCard = function() {
  
};


$(function() {

    app.init();

});