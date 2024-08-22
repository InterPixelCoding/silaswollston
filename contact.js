const biography_arr = [
    {
        "biography_type":  "Overview",
        "biography_text": `
        Silas Wollston is a keyboard player, composer and former academic. In his music, his obsession with harmony (inspired equally by 60s jazz and Olivier Messiaen) is matched by his passion – as a former lecturer in fugue – for counterpoint. Often seen performing the works of Bach and Handel, he is equally happy exploring the music of lesser-known composers of the Renaissance and Baroque.
        `
    },
    {
        "biography_type":  "Composer",
        "biography_text": `
        Silas Wollston first experienced the immense power of music as a chorister at St Paul’s Cathedral. As a teenage composer, he received encouragement and guidance from Edwin
        Roxburgh at the Royal College of Music, London, and later he studied with Robin Holloway at the University of
        Cambridge. His obsession with harmony, initially inspired by the music of Scriabin, and subsequently by 60s jazz and Messiaen, is matched only by his love of counterpoint. His music also reflects the wide range of music that he has encountered as an early music keyboard player and as a choral director. His chamber music and arrangements have been performed by the New Music
        Players, Fretwork and the David Gordon Trio. Vocal works have been recorded by
        the choir of Queens' College, Cambridge.
        `
    },
    {
        "biography_type":  "Performer",
        "biography_text": `
        Silas Wollston was a chorister at St Paul’s Cathedral, where John Scott encouraged him to learn
        the organ; he was later an organ scholar at Trinity College, Cambridge (1990–93). After
        university he studied the harpsichord with Jill Severs in London and Frédérick Haas in Brussels.
        From 1999 to 2016 he was a member of the English Baroque Soloists and he played a major role
        in John Eliot Gardiner’s Bach Cantata cycle in 2000, as a soloist and as a continuo player. He is a
        member of the London Handel Players, the English Cornett and Sackbut Ensemble, and the 17th-
        century chamber ensemble In Echo. He plays regularly with the viol consort Fretwork and has duo
        partnerships with violinist Adrian Butterfield (Bach Sonatas on SOMM) and cornettist Gawain
        Glenton (The Myth of Venice on Delphian). Between 2011 and 2015 he worked as a choral director,
        conducting the choir of Queens' College, Cambridge.
        `
        },
        {
            "biography_type":  "Writer",
            "biography_text": `
            Silas Wollston dedicated most of his academic career to the study of Matthew Locke’s theatre
            music, initially working part-time with support from the Wingate Trust (2002–04) before embarking on a PhD at the 
            Open University (2005–09), where he was supervised by Donald Burrows and David Mateer. Between 2013 and 2017
            he was an Affiliated Lecturer at the Music Faculty, University of Cambridge, where he lectured in
            fugue, stylistic composition and ‘The Birth of the Orchestra’. He is co-editor with
            John Cunningham of the volume in the Musica Britannica series (Stainer & Bell) that includes
            Locke’s music entitled ‘The Rare Theatrical’. He has also published research on Handel’s compositional process.
            `
        },
];

const selected_works_container = document.querySelector('.selected-works-container');
const works_container = document.querySelector('.info-container:nth-child(2)')
const biography_buttons = document.querySelectorAll('.biography-specials > button');
const biography_par = document.querySelector('p.biography-text');

biography_arr.forEach( function(biography_obj, index) {
    biography_buttons[index].textContent = biography_obj.biography_type;
    biography_buttons[index].ariaLabel = index;
})

// Use innerHTML to allow HTML content, such as links, to render
biography_par.innerHTML = biography_arr[0].biography_text;
// biography_par.style.setProperty("--par-height", `${biography_par.offsetHeight}px`);

biography_buttons.forEach(button => {
    button.addEventListener("click", () => {
        const biography_obj = biography_arr[String(button.ariaLabel)];

        // Use innerHTML to set the content as HTML
        biography_par.innerHTML = biography_obj.biography_text;

        // biography_par.style.setProperty("--par-height", `${biography_par.offsetHeight}px`);
    })
})


if(get_client_width() > 700) {
    copy_text(".copy-text")
}

function work_list() {
    fetch('./website_struct.md')
    .then(data => {
        return data.text();
    })
    .then(text => {
        const output = markdown_to_json(text);
        output.forEach(page => {
            if(page.page === "About") {
                let selected_works_arr = (page.content[0].data).split("-");
                selected_works_arr.forEach (function(el, index) {
                    selected_works_arr[index] = el.replace("###", "").replace("\n", "");
                })
                
                selected_works_arr.forEach(work => {
                    const work_arr = work.split(",");
                    if(work_arr.length >= 2) {
                        const title_text = work_arr[0];
                        const year_text = work_arr[1];
                        const info_text = work_arr[2];
    
                        const work_item = create_element("div", "work-item");
                            const title = create_element("h3", "work-title");
                            title.innerHTML = `${title_text} <span>${year_text}</span>`;
                            const info = create_element("h3", "work-info");
                            info.textContent = info_text;
    
                        append_children(work_item, [title, info]);
                        selected_works_container.appendChild(work_item)
                    }

                })
            }
        })
    })
}
