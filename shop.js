const shop_container = document.querySelector('.shop-container')

fetch('./website_struct.md')
    .then(response => {
        return response.text();
    })
    .then(text => {
        const shop_json = markdown_to_json(text).filter(item => {
            if(item.page === 'Shop') {
                return item;
            }
        });
        const shop_items = (shop_json[0].content[0].data).split('\n');
        shop_items.forEach(shop_item => {
            const item_arr = shop_item.split(', ');
            const name = item_arr[0];
            const link = item_arr[1];
            const file = item_arr[2];

                const new_item = create_element("div", "shop-item, subtle-component");
                    const name_el = create_element("span", "item-name");
                    const link_el = create_element("a", "image-link");
                    link_el.setAttribute("target", "_blank");
                    link_el.setAttribute("rel", "noopener noreferrer");
                        const image_el = create_element("img", null);
                        image_el.src = `/assets/shop/${file}`;
                    link_el.href = link;
                    link_el.appendChild(image_el);
                    name_el.textContent = name;
                new_item.appendChild(link_el, name_el);

            shop_container.appendChild(new_item)
        })
    })