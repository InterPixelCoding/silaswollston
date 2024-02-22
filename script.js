// Page Load Animation
const animation_els = document.querySelectorAll("body > *:not(.background-image, nav)");

function staggered_animation(els, speed) {
    els.forEach(function(el, index) {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateX(0%) scaleX(1)';
        }, index * speed);
    })
}

staggered_animation(animation_els, 400);

function create_element(type, class_name) {
    const el = document.createElement(type);
    if(class_name != null) {
        const classes = class_name.split(", ");
        classes.forEach(cls => {
            el.classList.add(cls.replace(/_/g, "-"));
        });
    }
    return el;
}

function convert_date(date) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const [month, day, year] = date.split('-').map(Number);
    const suffix = (day === 1 || day === 21 || day === 31) ? 'st' : (day === 2 || day === 22) ? 'nd' : (day === 3 || day === 23) ? 'rd' : 'th';

    return `${day}${suffix} ${months[month - 1]} ${year}`;
}

function animate_children(container_query, speed) {
    const direct_children = document.querySelectorAll(`${container_query} > *:not(.no-anim)`);
    console.log(direct_children)
    direct_children.forEach( function(child, index) {
        child.style.opacity = '0';
        child.style.transition = '500ms ease all';
        child.style.transform = 'translateX(-20%) rotateX(50deg)';
        setTimeout(() => {
            child.style.opacity = '1';
            child.style.transform = 'translateX(0%) rotateX(0deg)';
        }, index * speed);
    })
}

const navigation_container = document.querySelector('nav');

const navigation_layout = [
    {pages: [
        {text: null, image: './assets/Home.svg', link: './index.html'}
    ]},
    {pages: [
        {text: 'The Rare Theatrical Project', link: './trtp.html'},
        {text: 'Listen', link: './listen.html'},
        {text: 'Read', link: './read.html'},
        {text: 'Shop', link: './shop.html'}
    ]}
]

function append_children(container, children) {
    children.forEach(child => {container.appendChild(child)})
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

    const home = create_element("a", "home-link");
    home.href = './index.html'
    const home_image = create_element("img", null);
    home_image.src = './assets/Home.svg'
    home.appendChild(home_image)

    hamburger.src = './assets/hamburger.svg';
    hamburger.classList.add('image-shadow')
    navigation_container.appendChild(home);
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

function get_page_name() {
    return window.location.pathname.split('/').pop();
}

if(get_client_width() > 700) {
    create_computer_nav(navigation_container, navigation_layout, false)
} else {
    navigation_container.classList.add('mobile-view')
    create_mobile_nav(navigation_container, navigation_layout);
}

if(get_page_name() === 'index.html') {
    if(get_client_width() < 900) {
        shorten_text('.info-container > p', 500)
    }
    if (get_client_width() < 600) {
        shorten_text('.info-container > p', 250)
    }
}

const pages = ['INDEX', 'TRTP', 'LISTEN', 'READ', 'SHOP']

// Get Text Data
function markdown_to_json(input) {
    const lines = input.split('\n');
    let output = [];
    let current_page = {};
    let current_content = null;
    lines.forEach(line => {
        if (line.startsWith('# ')) {
            if (current_page.page) {
                output.push(current_page);
            }
            current_page = { page: line.slice(2).trim(), content: [] };
            current_content = null;
        } else if (line.startsWith('## ')) {
            const page_info = line.slice(3).trim();
            current_content = { data_heading: page_info, data: '' };
            current_page.content.push(current_content);
        } else if (line.trim() !== '') {
            if (current_content) {
                // Remove '###' from the beginning of the data field
                const cleanedLine = line.replace(/^###\s*/, '');
                if (current_content.data === '') {
                    current_content.data += cleanedLine.trim() + ' ';
                } else {
                    current_content.data += '\n' + cleanedLine.trim() + ' ';
                }
            }
        }
    });
    if (current_page.page) {
        output.push(current_page);
    }
    return output;
}

function get_elements(attribute_query) {
    const els = document.querySelectorAll(`[data-${attribute_query}]`);
    if(els) {return els} else {return null}
}

fetch('./website_struct.md')
    .then(data => {
        return data.text();
    })
    .then(text => {
        const output = markdown_to_json(text);
        const page_title = get_page_name().replace('.html', '').toUpperCase();
        const content = output[pages.indexOf(page_title)].content;

        content.forEach(item => {
            const html_els = get_elements(item.data_heading);
            html_els.forEach(el => {el.innerHTML = item.data})
        })
    })



