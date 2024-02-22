const panel_container = document.querySelector('.panel-container');
const stages = panel_container.querySelector('.the-vision > .stages')
const stage_els = stages.querySelectorAll('.stage');
const progress_bar = stages.querySelector('.progress-line');

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

