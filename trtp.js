const panel_container = document.querySelector('.panel-container');
const the_vision = document.querySelector('.the-vision')
const stages = panel_container.querySelector('.the-vision > .stages')
const stage_els = stages.querySelectorAll('.stage');
const progress_bar = stages.querySelector('.progress-line');
const blog_container = document.querySelector('.updates-container');

function handle_progress_bar() {
    fix_progress_bar(stages, progress_bar, true)

    stage_els.forEach(el => {
        el.addEventListener("mouseover", () => {
            the_vision.style.height = 'fit-content'
            the_vision.style.maxHeight = '200vh';
            setTimeout(() => {
                fix_progress_bar(stages, progress_bar, false)
            }, 500);
        })
    })
}   

function fix_progress_bar(container, progress_bar, first) {
    const children = Array.from(container.children);
    const height = Math.abs(children[0].offsetTop - children[3].offsetTop);
    if(first) {
        progress_bar.style.height = `${(height * 2) + 15}px`;
    } else {
        progress_bar.style.height = `${(height) + 15}px`;
    }
}

stage_els.forEach(el => {
    el.addEventListener("mouseover", () => {
        fit_content(the_vision);
    });
})

// handle_progress_bar();

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
            read_more.style.cursor = 'pointer';
            read_more.classList.add('text-shadow');
            const read_more_image = create_element("img", null);
            read_more_image.src = './assets/right-arrow.svg';

            read_more.addEventListener("click", open_pop_up);
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

function create_pop_up_structure() {
    const pop_up_container = create_pop_up();
        const timeline = create_element("div", "timeline");
        const updates_container = create_element("div", "main-updates-container, custom-scroll-bar");
        const current_post = create_element("div", "current-post");
        const exit = create_element("img", "exit, dark-text-shadow");
            exit.src = './assets/exit.svg'
        exit.addEventListener("click", close_pop_up)
    
    append_children(pop_up_container, [timeline, updates_container, current_post, exit]);
    document.body.appendChild(pop_up_container);
    
    data_arr.forEach(update => {
        const new_post = create_blog_post(update);
        new_post.style.opacity = '1';
        updates_container.appendChild(new_post);
    })
}

create_pop_up_structure();


