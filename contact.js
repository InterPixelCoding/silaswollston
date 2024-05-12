const biography_arr = [
    {
        "biography_type":  "Overview",
        "biography_text": `
        Silas Wollston is a versatile musician, who has combined performance, composition and academic
                            writing in a varied career. He is currently working mainly as a performer on harpsichord and organ,
                            while reviving his love of composition, which he intends to make more central to his working life.
        `
    },
    {
        "biography_type":  "Composer",
        "biography_text": `
        Silas Wollston developed his musical skills as a chorister at St Paul’s Cathedral and his first
        compositions were sacred choral works. He subsequently studied composition with Edwin
        Roxburgh at the Royal College of Music, London, and with Robin Holloway at the University of
        Cambridge. His chamber works and arrangements have been performed by the New Music
        Players, the viol consort Fretwork and the David Gordon Trio. Vocal works have been recorded by
        the choir of Queens' College, Cambridge, which he directed between 2011 and 2015. He has
        received commissions from the Battersea Choral Society and as part of William Whitehead’s
        Orgelbüchlein project.
        `
    },
    {
        "biography_type":  "Performer",
        "biography_text": `
        Silas Wollston was a chorister at St Paul’s Cathedral, where John Scott encouraged him to learn
        the organ; he subsequently took up the organ scholarship at Trinity College, Cambridge. After
        university he studied the harpsichord with Jill Severs in London and Frédérick Haas in Brussels.
        From 1999 to 2016 he was a member of the English Baroque Soloists and he played a major role
        in John Eliot Gardiner’s Bach Cantata cycle in 2000, as a soloist and as a continuo player. He is a
        member of the London Handel Players, the English Cornett and Sackbut Ensemble, and the 17th-
        century chamber ensemble In Echo. He plays regularly with the viol consort Fretwork and has duo
        partnerships with violinist Adrian Butterfield (Bach Sonatas on SOMM) and cornettist Gawain
        Glenton (The Myth of Venice on Delphian). He also has much experience as a choral director,
        working as Director of Music at Queens' College, Cambridge, between 2011 and 2015 (recordings
        on Orchid Classics).
        `
    },
    {
        "biography_type":  "Academic",
        "biography_text": `
        Silas Wollston has dedicated most of his academic career to the study of Matthew Locke’s theatre
        music, initially with support from the Wingate Trust (2002–04) and then with a studentship at the
        Open University (2005–09), where his PhD thesis ‘The instrumentation of English violin-band
        music, 1660–1685’ was supervised by Donald Burrows and David Mateer. Between 2013 and 2017
        he was an Affiliated Lecturer at the Music Faculty, University of Cambridge, where he lectured in
        fugue, stylistic composition and a historical course, ‘The Birth of the Orchestra’. He is co-editor with
        John Cunningham of the volume in the Musica Britannica series (Stainer &amp; Bell) that includes
        Locke’s music from the manuscript entitled ‘The Rare Theatrical’. He is also a council member of
        the Handel Institute and has published research on Handel’s compositional process.
        `
    },
];

const biography_buttons = document.querySelectorAll('.biography-specials > button');
const biography_par = document.querySelector('.biography-text > p');
const biography_heading = document.querySelector('.biography-text > h3');

biography_arr.forEach( function(biography_obj, index) {
    biography_buttons[index].textContent = biography_obj.biography_type;
    biography_buttons[index].ariaLabel = index;
})

biography_par.textContent = biography_arr[0].biography_text;

biography_buttons.forEach(button => {
    button.addEventListener("click", () => {
        const biography_obj = biography_arr[String(button.ariaLabel)];
        biography_par.textContent = biography_obj.biography_text;
        if(biography_obj.biography_type !== "Overview") {
            biography_heading.textContent = "Biography - " + biography_obj.biography_type;
        } else {
            biography_heading.textContent = "Overview"
        }
    })
})