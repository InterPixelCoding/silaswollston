const panel_container = document.querySelector('.panel-container');
const the_vision = document.querySelector('.the-vision')
const stages = panel_container.querySelector('.the-vision > .stages')
const stage_els = stages.querySelectorAll('.stage');
const progress_bar = stages.querySelector('.progress-line');
const blog_container = document.querySelector('.updates-container');

function fix_progress_bar(container, progress_bar, first) {
    const children = Array.from(container.children);
    const height = Math.abs(children[0].offsetTop - children[3].offsetTop)

    if(first) {
        progress_bar.style.height = `${(height * 2) + 15}px`;
    } else {
        progress_bar.style.height = `${(height) + 15}px`;
    }
}

fix_progress_bar(stages, progress_bar, true)

stage_els.forEach(el => {
    el.addEventListener("mouseover", () => {
        setTimeout(() => {
            fix_progress_bar(stages, progress_bar, false)
        }, 500);
    })
})

const data_arr = [
    {
        title: "Title of Blog Post",
        date: "02-22-2024",
        blog_content: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
         Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, 
         ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor 
         ornare leo, non suscipit magna interdum eu.
        `
    },
    {
        title: "Title of Blog Post",
        date: "02-22-2024",
        blog_content: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
         Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, 
         ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor 
         ornare leo, non suscipit magna interdum eu.
        `
    },
    {
        title: "Title of Blog Post",
        date: "02-22-2024",
        blog_content: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
        Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, 
        ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor 
         ornare leo, non suscipit magna interdum eu.
        `
    },
    {
        title: "Title of Blog Post",
        date: "02-22-2024",
        blog_content: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
         Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, 
         ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor 
         ornare leo, non suscipit magna interdum eu.
        `
    }
]

function create_blog_post(obj) {
    const update = create_element("div", "update")
        const title = create_element("span", "title");
        title.textContent = obj.title;
        const date = create_element("span", "date");
        date.textContent = convert_date(obj.date);
        const divider = create_element("div", "vertical-divider");
        const blog_content = create_element("p", "blog-content");
        blog_content.innerHTML = obj.blog_content;
        const read_more = create_element("button", "read-more");
            const read_more_image = create_element("img", null);
            read_more_image.src = './assets/right-arrow.svg';
        read_more.appendChild(read_more_image) 
    append_children(update, [title, date, divider, blog_content, read_more]);
    
    return update;
}

const updates_container = panel_container.querySelector('.updates');
let updates_height = updates_container.offsetHeight;
let current_height = 0;
let max_updates = false;

data_arr.forEach( function(update, index) {
    const new_update = create_blog_post(update);
    let max = 3;
    if(get_client_width() < 1340) {max = 2}
    if(index < max) {
        updates_container.appendChild(new_update);
    }
})

fix_height_in_pixels(blog_container)

setTimeout(() => {
    if(get_client_width() < 1340) {
        the_vision.style.height = `${blog_container.offsetHeight}px`
    }

    animate_children('.updates', 2000);
    animate_children('.stages', 400);
}, 2000)



