'use strict'

$(document).ready(function() {
    function Image(animal) {
        this.title = animal.title;
        this.image_url = animal.image_url;
        this.description = animal.description;
        this.keyword = animal.keyword;
        this.horns = animal.horns;
        Image.all.push(this);
    }

    Image.all = []
    console.log(Image.all);



    // for (let i = 0; i < Image.all.length; i++) {
    //     if (uiniqueKey.includes(Image.all[i].keyword)) {
    //         continue;
    //     } else {
    //         uiniqueKey.push(Image.all[i].keyword);
    //     }

    // }
    Image.prototype.render = function() {
        let $animalClone = $("#photo-template").clone();
        $animalClone.find("h2").text(this.title);
        $animalClone.find("img").attr("src", this.image_url);
        $animalClone.find("p").text(this.description);
        $animalClone.attr("id", this.title);
        $animalClone.removeAttr('id');
        $animalClone.attr('class', this.keyword);
        $('main').append($animalClone);
    };

    const readJson = () => {
        $.ajax("data/page-1.json", { method: "GET", dataType: "JSON" }).then(data => {
            data.forEach(animalItem => {
                let animal = new Image(animalItem);
                animal.render();
                animal.list();
                renderSelection();
            });
        });
    };
    readJson();

    let uiniqueKey = [];
    Image.prototype.list = function() {

        if (!uiniqueKey.includes(this.keyword)) {
            uiniqueKey.push(this.keyword)
                // console.log(this);
            let $newOption = $('<option></option>');
            $('select').append($newOption);
            $($newOption).text(this.keyword);
            $($newOption).attr('value', this.keyword);
        }
        // $('select').attr('id', this.keyword);
    }
    console.log(uiniqueKey);

    // $('main section').each(function() {
    //    
    //     if (selection === $(this).attr('class')) {
    //         $(this).show();
    //         console.log($(this));
    //     }


    // })

    // }

    const renderSelection = () =>
        $('select').change(function() {
            $('main section').each(function() {
                if ($(this).attr('class') === $('select').val()) {
                    $(this).show();
                }
                if ($(this).attr('class') !== $('select').val()) {
                    $(this).hide();
                }
            })
        })
    renderSelection();
    // $('select').on('click', function() {
    //     let selection = $(this).val();
    //     console.log(selection);
    //     if (selection === 'default') {
    //         $('main').show();
    //     } else {
    //         $('main').hide();
    //         // let valueOfOption = $(this).children("optiosn:selected").val();
    //         // console.log(valueOfOption);
    //         $('.' + selection).show();
    //     }
    // })






})