let pages = [];

const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function flipPage(page) {

    page.style.zIndex = pages.length;
    let pageIndex = parseInt(page.id.replace('page', ''));
    console.log(pageIndex);

    for (let i = 0; i < pages.length; i++) {
        if (i < pageIndex) {
            pages[i].style.zIndex = pages.length - pageIndex + i;
        } else if (i == pageIndex) {
            pages[i].style.zIndex = pages.length;
        }
        else {
            pages[i].style.zIndex = pages.length - i - 1;
        }
    }

    if (page.classList.contains('flipped')) {
        page.classList.remove('flipped');
    } else {
        page.classList.add('flipped');
    }
};

function initFlipbook() {
    const flipBook = document.getElementById('flipbook');
    for (let i = 0; i <= NUM_PAGES; i+=2) {
        let page = document.createElement('div');
        page.classList.add('page');
        page.id = `page${Math.floor(i/2)}`;
        page.style.zIndex = Math.floor(NUM_PAGES/2) - Math.floor(i/2);

        let frontPage = document.createElement('div');
        frontPage.classList.add('front_page');
        let front_content = document.createElement('img');
        front_content.classList.add('content');
        front_content.src = `assets/pages/${i}.webp`;
        front_content.alt = `Page ${i}`;
        frontPage.appendChild(front_content);

        let edge_shading = document.createElement('img');
        edge_shading.classList.add('edge_shading');
        edge_shading.src = 'assets/images/edge_shading_front.webp';
        edge_shading.alt = 'Edge Shading';
        frontPage.appendChild(edge_shading);
        page.appendChild(frontPage);
        
        let backPage = document.createElement('div');
        backPage.classList.add('back_page');
        let back_content = document.createElement('img');
        back_content.classList.add('content');
        back_content.src = `assets/pages/${i+1}.webp`;
        back_content.alt = `Page ${i+1}`;
        backPage.appendChild(back_content);

        let back_edge_shading = document.createElement('img');
        back_edge_shading.classList.add('edge_shading');
        back_edge_shading.src = 'assets/images/edge_shading_back.webp';
        back_edge_shading.alt = 'Edge Shading';
        backPage.appendChild(back_edge_shading);
        page.appendChild(backPage);

        page.addEventListener('click', function() {
            flipPage(page);
        });

        flipBook.appendChild(page);
        pages.push(page);
    }

    pages[0].classList.add('front_cover');
    pages[pages.length - 1].classList.add('back_cover');
}

function zipBookmarks() {
    /**
     * @brief Zips the BOOKMARKS and SECTIONS arrays together based on page numbers.
     */
    
    let zipped = [];
    let lastPageNum = 0;
    for (let i = 0; i < SECTIONS.length; i++) {
        let curr_section = SECTIONS[i];
        let next_section = (i + 1 < SECTIONS.length) ? SECTIONS[i + 1] : { page: NUM_PAGES + 1 };
        curr_section.type = 'section';
        zipped.push(curr_section);
        
        let bookmarks = BOOKMARKS.filter(bookmark => bookmark.page >= lastPageNum && bookmark.page < next_section.page);
        bookmarks.forEach(bookmark => {
            bookmark.type = 'bookmark';
            zipped.push(bookmark);
        });
        
        lastPageNum = curr_section.page;
    }

    return zipped;
}

function initBookmarks() {
    const bookmarksDiv = document.getElementById('bookmarks-tab');
    let items = zipBookmarks();
    items.forEach(item => {
        let itemElem = document.createElement('div');
        itemElem.classList.add(item.type);
        itemElem.innerText = item.title;
        itemElem.addEventListener('click', function() {
            let targetPageIndex = Math.floor((item.page - 1) / 2);
            pages.forEach((page, index) => {
                if (index < targetPageIndex) {
                    if (!page.classList.contains('flipped')) {
                        flipPage(page);
                    }
                } else {
                    if (page.classList.contains('flipped')) {
                        flipPage(page);
                    }
                }
            });
        });
        bookmarksDiv.appendChild(itemElem);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initFlipbook();
    initBookmarks();
});