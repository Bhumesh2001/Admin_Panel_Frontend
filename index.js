document.querySelector('.toggle-btn').addEventListener('click', () => {
    const sideBar = document.querySelector('.sidebar');
    sideBar.classList.toggle('d-none');
});

document.querySelectorAll(".nav-link").forEach(function (navLink) {
    navLink.addEventListener("click", function (event) {
        event.preventDefault();
        document.querySelectorAll(".content > section").forEach(function (page) {
            page.classList.add("d-none");
        });
        const target = event.target.getAttribute("data-target");
        document.querySelector(target).classList.remove("d-none");
    });
});

document.querySelectorAll('.sidebar-link').forEach(function (link) {
    link.addEventListener('click', function () {

        document.querySelectorAll('.sidebar-link').forEach(function (item) {
            item.classList.remove('active');
            item.style.backgroundColor = '';
            item.style.color = '';
        });

        this.classList.add('active');
        this.style.backgroundColor = 'red';
        this.style.color = 'white';
    });
});

document.querySelectorAll('.card-body').forEach((card) => {
    card.addEventListener('click', (event) => {
        console.log(event.currentTarget.id);
        const target = card.getAttribute('data-target');
        if (target) {
            const sidebarLink = document.querySelector(target);
            if (sidebarLink) {
                sidebarLink.click();
            };
        };
    });
});

document.querySelector('.nav-link[data-target="#dashboard"]').click();

// Function to make a fetch request
async function fetchData(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        };

        return await response.json();
    } catch (error) {
        console.error('Fetch error: ', error);
    };
};

// Function to load user data and display it in the table
async function loadUserData() {
    const data = await fetchData('https://video-app-0i3v.onrender.com/admin/users');

    if (!data) return; // Exit if data is not fetched

    const tbody = document.getElementById('t-body');

    data.users.forEach(user => {
        const tr = document.createElement('tr');
        tr.setAttribute('class', 'user_row');

        const userArr = [user.name, user.email, user.mobileNumber, user.isActive ? 'Active' : 'Inactive'];

        userArr.forEach(info => {
            const td = document.createElement('td');
            td.innerText = info;
            tr.appendChild(td);
        });

        const tdActions = document.createElement('td');
        const div = document.createElement('div');
        div.setAttribute('class', 'btn-group');

        ['Edit', 'Delete'].forEach(action => {
            const button = document.createElement('button');
            button.innerText = action;
            button.setAttribute('class', `btn btn-sm btn-${action === 'Edit' ? 'primary' : 'danger'}`);
            div.appendChild(button);
        });

        tdActions.appendChild(div);
        tr.appendChild(tdActions);
        tbody.appendChild(tr);
    });
};

// funtion to load video data and display it on video section
async function loadVideoData() {
    const data = await fetchData('https://video-app-0i3v.onrender.com/admin/videos');
    if (!data) return;

    const videoRow = document.getElementById('video-row');

    data.videos.forEach(video => {

        const colDiv = document.createElement('div');
        const cardDiv = document.createElement('div');
        const img = document.createElement('img');

        const cardBody = document.createElement('div');
        const h5 = document.createElement('h5');

        const btnDiv = document.createElement('div');

        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        colDiv.classList.add('col-12', 'col-sm-4', 'col-md-4', 'col-lg-3', 'mb-4');
        cardDiv.classList.add('card');

        img.classList.add('card-img-top');
        img.setAttribute('alt', 'Video Thumbnail');
        img.src = video.thumbnail.url;

        cardBody.classList.add('card-body');
        h5.classList.add('card-title', 'mb-3');
        h5.innerText = video.title;

        btnDiv.classList.add('btn-group');

        editBtn.classList.add('btn', 'btn-sm', 'btn-primary');
        deleteBtn.classList.add('btn', 'btn-sm', 'btn-danger');

        editBtn.innerText = 'Edit';
        deleteBtn.innerText = 'Delete';

        btnDiv.appendChild(editBtn);
        btnDiv.appendChild(deleteBtn);

        cardBody.appendChild(h5);
        cardBody.appendChild(btnDiv);

        cardDiv.appendChild(img);
        cardDiv.appendChild(cardBody);

        colDiv.appendChild(cardDiv);

        videoRow.appendChild(colDiv);

    });
};

// function to load article data and display it on article section
async function loadArticleData() {
    const data = await fetchData('https://video-app-0i3v.onrender.com/admin/articls');
    if (!data) return;

    const articleRow = document.getElementById('article-row');

    data.articls.forEach(article => {

        const colDiv = document.createElement('div');
        const articleCard = document.createElement('div');
        const articleImg = document.createElement('img');

        const cardHeader = document.createElement('div');
        const h5 = document.createElement('h5');

        const cardBodyDiv = document.createElement('div');
        const btnDiv = document.createElement('div');

        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        colDiv.classList.add('col-12', 'col-sm-4', 'col-md-4', 'col-lg-3', 'mb-4');
        articleCard.classList.add('card', 'article-card');

        articleImg.classList.add('card-img-top', 'article-image');
        articleImg.src = article.image;
        articleImg.classList.add('alt', 'article_image');

        cardHeader.classList.add('card-header');
        h5.classList.add('card-title');
        h5.innerText = article.title;

        cardHeader.appendChild(h5);
        cardBodyDiv.classList.add('card-body');

        btnDiv.classList.add('d-flex', 'justify-content-end');

        editBtn.classList.add('btn', 'btn-sm', 'btn-primary', 'me-2');
        deleteBtn.classList.add('btn', 'btn-sm', 'btn-danger');

        editBtn.innerText = 'Edit';
        deleteBtn.innerText = 'Delete';

        btnDiv.appendChild(editBtn);
        btnDiv.appendChild(deleteBtn);

        cardBodyDiv.appendChild(btnDiv);

        articleCard.appendChild(articleImg);
        articleCard.appendChild(cardHeader);
        articleCard.appendChild(cardBodyDiv);

        colDiv.appendChild(articleCard)
        articleRow.appendChild(colDiv);

    });
};

// Function to update DOM elements with fetched data
async function updateDashboardElement(url, Data) {
    const data = await fetchData(url);

    if (!data) return;

    for ([key, value] of Object.entries(Data)) {
        const element = document.getElementById(key);
        element.innerText = data[value];
    };
};

// Initialize data loading
loadUserData();
loadVideoData();
loadArticleData();

const url = "https://video-app-0i3v.onrender.com/admin/dashboard-count";
const Data = {
    "total_user": "totalUser",
    "total_video": "totalVideo",
    "total_category": "totalCategory",
    "total_like": "totalArticleAndVideoLikes",
    "total_comment": "totalArticleAndVideoComments",
    "total_articles": "totalArticle",
};

updateDashboardElement(url, Data);

// video add new and remove button
const videoSection = document.getElementById('video');
const add_new_Video_Page = document.getElementById('new_video');

document.getElementById('add-new-video').addEventListener('click', () => {

    videoSection.classList.add('d-none');
    add_new_Video_Page.classList.remove('d-none');
    add_new_Video_Page.classList.add('d-block');
});

document.getElementById('back-btn').addEventListener('click', () => {

    add_new_Video_Page.classList.remove('d-block');
    add_new_Video_Page.classList.add('d-none');

    videoSection.classList.remove('d-none');
    videoSection.classList.add('d-block');
});


// article add new butotn and remove button
const article = document.getElementById('article');
const add_newArticle = document.getElementById('new_article');

document.getElementById('add-new-article').addEventListener('click', () => {

    article.classList.add('d-none');
    add_newArticle.classList.remove('d-none');
    add_newArticle.classList.add('d-block');
});

document.getElementById('back-article_btn').addEventListener('click', () => {

    add_newArticle.classList.remove('d-block');
    add_newArticle.classList.add('d-none');

    article.classList.remove('d-none');
    article.classList.add('d-block');

});

// add new user button

const users = document.getElementById('users');
const new_user = document.getElementById('new_user');

document.getElementById('add-new-user').addEventListener('click', () => {

    users.classList.add('d-none');
    new_user.classList.remove('d-none');
    new_user.classList.add('d-block');
});

document.getElementById('back-btn-user').addEventListener('click', () => {
    new_user.classList.remove('d-block');
    new_user.classList.add('d-none');

    users.classList.remove('d-none');
    users.classList.add('d-block');
});
