const app = {};

const apiKey = '9ac261cd-f87f-47c0-aa8c-7cde65b78ac2'

app.getSynonyms = function(word) {
    $.ajax({
        url: `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}`,
        method: 'GET',
        dataType: 'json',
        data: {
            key: `${apiKey}`
        }
    }).then(function(data) {
        // if the response is just an array, return a rejected promise
        
        if (data[0].shortdef) {
            const defResults = data[0].shortdef;        
            const antResults = data[0].meta.ants[0] || [];
            const synResults = data[0].meta.syns[0] || [];

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

            // flip all the cards over to reset them 
            $('#word.flip-card-inner').addClass('flip-this-card').removeClass('unflip-this-card');

            // unfade the font on the other cards 
            $('h2').removeClass('fade').addClass('unfade');
            $('.word-list').removeClass('fade').addClass('unfade');
            $('.fa-arrow-circle-right').removeClass('hide');

        } else {
            function test() {
                return new Promise((resolve, reject) => {
                return reject('rejected')
              });
            };
            
            test()
            .catch(error => {
                console.error('Error: Word Not Found');
                $('.no-result').removeClass('hide');
            });
        }

    });
}

// displays words on the back of the def, syn, and ant cards
app.displayWords = function(def, ant, syn) {
    
    const defListHtml = def.map(item => {
        return `<li class="def-list-item"><i class="fas fa-rainbow rainbow-text"></i> ${item}</li>`;
    });
    $('.definition-list').html(defListHtml);


    if (ant.length < 1 && syn.length < 1) {
        app.noAntonyms(ant);
        app.noSynonyms(syn);
    } else if (ant.length < 1 && syn.length >= 1) {
        app.noAntonyms(ant);
        app.synonyms(syn);
    } else if (syn.length < 1 && ant.length >= 1) {
        app.noSynonyms(syn);
        app.antonyms(ant);
    } else {
        app.synonyms(syn);
        app.antonyms(ant);
    }

    app.SynonymEventListener();
    
}

app.synonyms = function(syn) {
    const synListHtml = syn.map(item => {
        return `<li class="syn-list-item">${item}</li>`;
    });
    $('.synonym-list').html(synListHtml.slice(0,12));
}

app.antonyms = function(ant) {
    const antListHtml = ant.map(item => {
        return `<li class="ant-list-item">${item}</li>`;
    });
    $('.antonym-list').html(antListHtml.slice(0,12));
}

app.noSynonyms = function(syn) {
    const synListHtml = '<li class="syn-list-item">Sorry, no synonyms here!</li>';
    $('.synonym-list').html(synListHtml);
}

app.noAntonyms = function(ant) {
    const antListHtml = '<li class="ant-list-item">Sorry, no antonyms here!</li>';
    $('.antonym-list').html(antListHtml);
}

// if time, add functionality to click on antonym or synonym to make it the new word input for app.getSynonyms
app.SynonymEventListener = function() {
    $('.ant-list-item, .syn-list-item').on('click', function() {
        console.log(this);
    });
};


app.setUpEventListeners = function() {

    // listeners include: 
    // 1. flipping cards by clicking arrows
    // 2. submitting form
    // 3. clicking new word button
    // ---------------------------------------------------

    // 1. clicking on the front and back arrows to flip the cards
    $('.front-arrow').on('click', function() {
        let id = this.id;
        let thisCard = '#' + id + '.flip-card-inner';
        $(thisCard).addClass('flip-this-card').removeClass('unflip-this-card');
    });    

    $('.back-arrow').on('click', function() {
        let id = this.id;
        let thisCard = '#' + id + '.flip-card-inner';
        $(thisCard).removeClass('flip-this-card').addClass('unflip-this-card');
    });

    // 2. when a valid word is entered, submitting the form flips the word card over, identifies a chosen word, and unfades the h2's from all the cards
    $('form').on('submit', function(event) {
        event.preventDefault();
        $('.no-result').addClass('hide');
        const word = $('input[type=text]').val();

        // add chosen word to front or the 'word' card
        $('h2.chosen-word').html(word.charAt(0).toUpperCase() + word.slice(1));


        // // flip all the cards over to reset them 
        // $('#word.flip-card-inner').addClass('flip-this-card').removeClass('unflip-this-card');

        // // unfade the font on the other cards 
        // $('h2').removeClass('fade').addClass('unfade');
        // $('.word-list').removeClass('fade').addClass('unfade');
        // $('.fa-arrow-circle-right').removeClass('hide');

        // call the API function to get antonyms and synonyms
        app.getSynonyms(word);
    });

    // 3. clicking the 'new word' button flips all the cards to their fronts and fades out the h2's
    $('.new-word-button').on('click', function() {
        $('.flip-card-inner').removeClass('flip-this-card').addClass('unflip-this-card');

        // fade out the font on the other cards until the new word is submitted
        $('h2, .word-list').addClass('fade').removeClass('unfade');
        $('.fa-arrow-circle-right').addClass('hide');
    });
   
};


app.init = function() {

    app.setUpEventListeners();

};


$(function() {

    app.init();

});