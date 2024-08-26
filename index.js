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


async function laodUserData() {

    const response = await fetch('http://localhost:3000/admin/all-users', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    };

    const data = await response.json();

    const tbody = document.getElementById('t-body');

    let userArr = [];

    for (user of data.users) {

        userArr.push(user.name);
        userArr.push(user.email);
        userArr.push(user.mobileNumber);
        if (user.isActive) {
            userArr.push('Active')
        } else {
            userArr.push('InActive');
        };

        const tr = document.createElement('tr');
        tr.setAttribute('class', 'user_row');

        for (let i = 0; i < 5; i++) {
            const td = document.createElement('td');

            if (i === 4) {
                const div = document.createElement('div');
                const edit = document.createElement('button');
                const Delete = document.createElement('button');

                edit.innerText = 'Edit';
                Delete.innerText = 'Delete';

                div.setAttribute('class', 'btn-group');
                edit.setAttribute('class', 'btn btn-sm btn-primary');
                Delete.setAttribute('class', 'btn btn-sm btn-danger');

                div.appendChild(edit);
                div.appendChild(Delete);

                td.appendChild(div);
            } else {
                td.innerText = userArr[i];
            };
            tr.appendChild(td);
        };
        tbody.appendChild(tr);

        userArr.length = 0;
    };
};

laodUserData();

async function showTotaUsers() {
    const response = await fetch('http://localhost:3000/admin/all-users', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    };

    const data = await response.json();

    const show_total_user = document.getElementById('total_user');

    show_total_user.innerText = data.totalUsers;

};
showTotaUsers();

async function showTotalVideos() {
    const response = await fetch('http://localhost:3000/admin/get-all-videos', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    };

    const data = await response.json();

    const show_total_videos = document.getElementById('total_video');
    show_total_videos.innerText = data.totalVideos;

};
showTotalVideos();

async function showTotaCategories() {
    const response = await fetch('http://localhost:3000/admin/get-all/categories', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    };

    const data = await response.json();

    const show_total_category = document.getElementById('total_category');
    show_total_category.innerText = data.totalCategory;

};

showTotaCategories();


const videoSection = document.getElementById('video');
const add_new_Video_Page = document.getElementById('new_video');

document.getElementById('add-new-video').addEventListener('click', () => {

    videoSection.classList.add('d-none');
    add_new_Video_Page.classList.remove('d-none');
    add_new_Video_Page.classList.add('d-block');
});

document.getElementById('back-btn').addEventListener('click', () => {

    videoSection.classList.remove('d-none');
    add_new_Video_Page.classList.add('d-none');
    add_new_Video_Page.classList.remove('d-block');
});


const article = document.getElementById('article');
const add_newArticle = document.getElementById('new_article');

document.getElementById('add-new-article').addEventListener('click', () => {
    article.classList.add('d-none');
    add_newArticle.classList.remove('d-none');
    add_newArticle.classList.add('d-block');
});

document.getElementById('back-btn').addEventListener('click', () => {

    add_newArticle.classList.remove('d-block');
    article.classList.remove('d-none');
    article.classList.add('d-block');

});