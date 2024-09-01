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

// Function to update DOM elements with fetched data
async function updateDashboardElement(url, elementId, property) {
    const data = await fetchData(url);

    if (!data) return; // Exit if data is not fetched

    const element = document.getElementById(elementId);
    element.innerText = data[property];
};

// Initialize data loading
loadUserData();
updateDashboardElement('https://video-app-0i3v.onrender.com/admin/users', 'total_user', 'totalUsers');
updateDashboardElement('https://video-app-0i3v.onrender.com/admin/videos', 'total_video', 'totalVideos');
updateDashboardElement('https://video-app-0i3v.onrender.com/admin/categories', 'total_category', 'totalCategory');


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
