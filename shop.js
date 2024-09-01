let lazy_loading = false;  // Toggle this variable to show or hide loading
if(get_client_width() < 800) {lazy_loading = true}

function active_listener(el, listen_item) {
    listen_item.addEventListener("mouseenter", (e) => { el.classList.add("active"); });
    listen_item.addEventListener("mouseleave", (e) => { el.classList.remove("active"); });
}

async function fetch_data(api_key, link) {
    try {
        const sheet_id = link.match(/\/d\/(.*?)\//)[1];
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}/values/A1:Z1000?key=${api_key}`;
        const response = await fetch(url);

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const headers = data.values[0];
        const rows = data.values.slice(1);

        return rows.map(row => {
            let obj = {};
            headers.forEach((header, index) => {
                obj[header] = row[index] || null;
            });
            return obj;
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Select elements
const loading_container = document.querySelector('.loading-container');
const container = document.querySelector('.listen-items');
const loading_percentage_span = document.querySelector('.loading-percentage');

// Immediately hide loading container if lazy_loading is true
if (lazy_loading) {
    loading_container.classList.add('hidden');
}

fetch_data("AIzaSyAM07AIfBXXRU0Y8MbpzySSVtCAG3xjHr0", "https://docs.google.com/spreadsheets/d/1FauXTMjWxaPddvDzqazbUtSWVtY7sgNjVk4arYobhFY/edit?usp=sharing").then(data => {
    if (!data) return;

    const iframes = [];
    let loaded_iframes = 0;
    let current_percentage = 0;

    function update_percentage(target_percentage) {
        const increment = target_percentage > current_percentage ? 1 : 0;

        const interval = setInterval(() => {
            current_percentage += increment;
            if (current_percentage >= target_percentage || current_percentage >= 100) {
                current_percentage = Math.min(target_percentage, 100);
                clearInterval(interval);
            }
            loading_percentage_span.textContent = `${current_percentage}%`;
        }, 20); // Adjust timing as needed for smoothness
    }

    const non_performers = data.filter(item => item.is_performer === "FALSE");
    const performers = data.filter(item => item.is_performer === "TRUE");
    
    const formatted_data = [...non_performers, ...performers];

    formatted_data.forEach(item => {
        const listen_item = create_element("div", "listen-item");
        if ((item.embed.substring(0, 1)) !== "<" && item.embed !== "n/a") {
            const clip_src = `./assets/listen/${item.embed}-clip.mp3`;
            const track_src = `./assets/listen/${item.embed}.mp3`;
            listen_item.classList.add('music-player-parent');

            const music_player = generate_music_player(listen_item, `./assets/shop/${item.cover_url}`, clip_src, track_src);
            active_listener(music_player, listen_item);
            listen_item.appendChild(music_player);
        }
        listen_item.ariaLabel = (item.is_performer).toLowerCase();
        const link = create_element("a", "buy-link");
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
        link.href = item.link;

        let icon = "";
        if (String(item.is_buy) === "TRUE") {
            icon = "url(./assets/shopping-basket.png)";
        } else {
            icon = "url(./assets/open_link.svg)";
        }

        link.style.setProperty("--src", icon);

        listen_item.appendChild(link);

        if (((item.cover_url).split('.')[1]) !== 'mp4') {
            const cover_image = create_element("div", "cover-image, subtle-component");
            cover_image.style.setProperty("background-image", `url("./assets/shop/${item.cover_url}")`);
            listen_item.appendChild(cover_image);
        } else {
            const video = create_element("video", "video-embed, subtle-component");
            video.src = `./assets/shop/${item.cover_url}`;
            video.setAttribute("controls", true);
            listen_item.appendChild(video);
        }

        if (item.embed !== "n/a") {
            if (listen_item.classList.contains('music-player-parent')) {
                active_listener(listen_item.querySelector('.music-player'), listen_item);
            }
            
            listen_item.style.marginBottom = '4.5rem';

            if (item.embed.substring(0, 1) === "<") {
                const embed = create_element("div", "embed");
                active_listener(embed, listen_item);
                listen_item.appendChild(embed);
                embed.innerHTML = item.embed;

                const iframe = embed.querySelector('iframe');
                if (iframe) {
                    iframes.push(new Promise(resolve => {
                        iframe.onload = () => {
                            loaded_iframes++;
                            const target_percentage = Math.floor((loaded_iframes / iframes.length) * 100);
                            update_percentage(target_percentage);
                            resolve();
                        };
                    }));
                }
            }
        } else {
            listen_item.style.marginBottom = '2.5rem';
        }

        container.appendChild(listen_item);

        active_listener(link, listen_item);
    });

    if (!lazy_loading) {
        // Show the loading container if lazy_loading is false
        loading_container.classList.remove('hidden');
    }

    Promise.all(iframes).then(() => {
        update_percentage(100);  // Ensure the percentage reaches 100%
        if (!lazy_loading) {
            loading_container.classList.add('hidden');  // Hide the loading container
        }
    }).catch(error => {
        console.error('Error with iframe loading:', error);
        if (!lazy_loading) {
            loading_container.classList.add('hidden');  // Hide the loading container on error
        }
    });
});