const navigation_container = document.querySelector('nav');
const navigation_layout = [
    {pages: [
        {text: null, image: './assets/home.svg', link: './index.html'}
    ]},
    {pages: [
        {text: 'The Rare Theatrical Project', link: './trtp.html'},
        {text: 'Listen', link: './listen.html'},
        {text: 'Read', link: './read.html'},
        {text: 'Shop', link: './shop.html'}
    ]}
]

function create_element(type, class_name) {
    const el = document.createElement(type);
    el.classList.add(class_name);
    return el;
}

function create_computer_nav(navigation_container, navigation_layout, test_pages) {
    navigation_layout.forEach(item => {
        const container = create_element("div", "nav-item");
        item.pages.forEach(sub_item => {
            const page = create_element("a", "page-link");
            page.textContent = sub_item.text;
            if(test_pages) {page.href = '#'} else {page.href = sub_item.link;}
            container.appendChild(page);
            if(sub_item.text == null) {
                const image = create_element("img", "home-icon");
                image.src = sub_item.image;
                page.appendChild(image)
            }
        });
        navigation_container.appendChild(container)
    })
}

function create_mobile_nav(nav) {
    const hamburger = create_element("img", "nav-button");
    hamburger.src = './assets/hamburger.svg'
    nav.appendChild(hamburger)
}

function get_client_width() {
    return parseInt(document.body.offsetWidth)
}

function shorten_text(text_query, length) {
    const long_text = document.querySelector(text_query);
    let text_content = long_text.textContent;
    long_text.textContent = `${text_content.substring(0, length)} ...`;
}

if(get_client_width() > 700) {
    create_computer_nav(navigation_container, navigation_layout, true)
} else {create_mobile_nav(navigation_container)}

if(get_client_width() < 900) {
    shorten_text('.info-container > p', 500)
}
if (get_client_width() < 600) {
    shorten_text('.info-container > p', 380)
}