let currently_playing = null;
const audio_player = document.querySelector('audio');

function play(span, audio) {
    
    const container = create_element("div", "play-buttons");
    const button = create_element("img", "play-button");
    button.src = "./assets/play.svg";
    
    button.addEventListener("click", () => {
        // Reset all other buttons to play icon
        document.querySelectorAll('.play-button').forEach(btn => {
            if (btn !== button) {
                btn.src = "./assets/play.svg";
            }
        });

        if (currently_playing && currently_playing.audio_player !== audio_player) {
            // Stop and reset the previous audio
            currently_playing.audio_player.pause();
            currently_playing.audio_player.currentTime = 0;
            currently_playing.button.src = "./assets/play.svg";
        }

        // Set the new audio source
        audio_player.src = audio;

        // Manage the play/pause state of the new audio
        if (button.src.endsWith("play.svg")) {
            audio_player.play();
            button.src = "./assets/pause.svg";
        } else {
            audio_player.pause();
            button.src = "./assets/play.svg";
        }

        // Update the `currently_playing` state
        currently_playing = {
            audio_player: audio_player,
            button: button
        };
    });

    const span_info = create_element("span", "span-info");
    span_info.textContent = span;
    append_children(container, [button, span_info]);

    return container;
}


function generate_music_player(el, cover_src, clip, track) {
    const music_player = create_element("div", "music-player, embed");
        const cover_image = create_element("div", "cover-image");
        cover_image.style.backgroundImage = `url(${cover_src})`;
        const play_container = create_element("div", "play-container");
            const play_clip = play("Play clip", clip);
            const play_from_start = play("Play from start", track);
            append_children(play_container, [play_clip, play_from_start]);
        const timeline = create_element("div", "timeline");
            const elapsed = create_element("div", "elapsed");
            timeline.appendChild(elapsed);
        const time_values = create_element("div", "time-values");
            const elapsed_time = create_element("span", "elapsed-time");
            const duration = create_element("span", "duration");
            elapsed_time.textContent = "0:00";
            duration.textContent = "--:--";

            setInterval(() => {
                if (audio_player.readyState > 0) {
                    let current_time = audio_player.currentTime;
                    let duration_time = audio_player.duration;
                    let progress_percentage = (current_time / duration_time) * 100;
            
                    // Function to format time in m:ss
                    const format_time = (time) => {
                        let minutes = Math.floor(time / 60);
                        let seconds = Math.floor(time % 60);
                        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
                    };
            
                    elapsed_time.textContent = format_time(current_time);
                    duration.textContent = format_time(duration_time);
                    elapsed.style.width = `${progress_percentage.toFixed(2)}%`;
                } else {
                    elapsed_time.textContent = "0:00";
                    duration.textContent = "--:--";
                }
            }, 1000);

            append_children(time_values, [elapsed_time, duration])

        get_average_light_dark_colors(cover_src, function(colors) {
            music_player.style.setProperty("--dark-col", colors.dark_color)
            music_player.setAttribute("light-col", colors.light_color);
            music_player.setAttribute("dark-col", colors.dark_color);
        })
    append_children(music_player, [cover_image, play_container, timeline, time_values]);

    return music_player;
}
