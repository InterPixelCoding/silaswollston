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
    const classes = class_name.split(", ");
    classes.forEach(cls => {
        el.classList.add(cls.replace(/_/g, "-"));
    });
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

function create_mobile_nav(navigation_container, navigation_layout) {
    const hamburger = create_element("img", "nav-button");
    hamburger.src = './assets/hamburger.svg';
    hamburger.classList.add('image-shadow')
    navigation_container.appendChild(hamburger);

    const navigation = create_element("div", "mobile-navigation, default-component");
    navigation_container.appendChild(navigation);

    const exit = create_element("img", "exit-button");
    exit.src = './assets/exit.svg'
    navigation.appendChild(exit)

        const nav_items = navigation_layout[1].pages;
        nav_items.forEach(item => {
            const nav_item = create_element("a", "page-link");
            nav_item.href = item.link;
            nav_item.textContent = item.text;
            navigation.appendChild(nav_item)
        })

    hamburger.addEventListener("click", () => {navigation.classList.add('active')})
    exit.addEventListener("click", () => {navigation.classList.remove('active')})
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
} else {
    navigation_container.classList.add('mobile-view')
    create_mobile_nav(navigation_container, navigation_layout);
}

if(get_client_width() < 900) {
    shorten_text('.info-container > p', 500)
}
if (get_client_width() < 600) {
    shorten_text('.info-container > p', 250)
}