document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.content-section');
    const navContainer = document.getElementById('desktop-nav');

    const icons = {
        'api-key': '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />',
        'description': '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />',
        'subject': '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />',
        'setting': '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />',
        'visuals': '<path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />',
        'audio': '<path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />',
        'extras': '<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />',
        'video-details': '<path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.375 .908l-2.036 2.036a.75.75 0 11-1.06-1.06l2.036-2.036a3 3 0 01.908-.375H9zM9 3.75v1.007a3 3 0 00.375.908l2.036 2.036a.75.75 0 001.06-1.06l-2.036-2.036a3 3 0 00-.908-.375H9z" /><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />',
        'generate': '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l4.5-4.5m0 0l4.5 4.5m-4.5-4.5v12m4.5-16.5l4.5 4.5m-4.5-4.5v12" />',
        'optimize': '<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a3.375 3.375 0 00-2.3-2.3L12.75 18l1.178-.398a3.375 3.375 0 002.3-2.3L16.5 14.25l.398 1.178a3.375 3.375 0 002.3 2.3l1.178.398-1.178.398a3.375 3.375 0 00-2.3 2.3z" />'
    };

    const iconColors = {
        'api-key': { text: 'text-yellow-500', bg: 'bg-yellow-100' },
        'description': { text: 'text-blue-500', bg: 'bg-blue-100' },
        'subject': { text: 'text-purple-500', bg: 'bg-purple-100' },
        'setting': { text: 'text-green-500', bg: 'bg-green-100' },
        'visuals': { text: 'text-orange-500', bg: 'bg-orange-100' },
        'audio': { text: 'text-green-700', bg: 'bg-green-100' },
        'extras': { text: 'text-blue-700', bg: 'bg-blue-100' },
        'video-details': { text: 'text-red-600', bg: 'bg-red-100' },
        'default': { text: 'text-sky-500', bg: 'bg-sky-100' }
    };

    const navTitles = {
        'api-key': 'Kunci API',
        'description': 'Deskripsi Video',
        'subject': 'Subjek & Aksi',
        'setting': 'Latar / Tempat',
        'visuals': 'Gaya Visual',
        'audio': 'Audio',
        'extras': 'Detail Tambahan',
        'video-details': 'Detail Video',
        'generate': 'Buat Prompt',
        'optimize': 'Optimalkan'
    };

    sections.forEach(section => {
        const id = section.id;
        const h2 = section.querySelector('h2');
        const fullTitle = h2.textContent;
        const navTitle = navTitles[id] || fullTitle;
        const iconPath = icons[id] || icons['extras'];
        const colors = iconColors[id] || iconColors['default'];

        const li = document.createElement('li');
        li.innerHTML = `
            <a href="#${id}" class="nav-link">
                <svg class="icon" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    ${iconPath}
                </svg>
                ${navTitle}
            </a>
        `;
        navContainer.appendChild(li);

        const iconSpan = `<span class="${colors.text} ${colors.bg} p-2 rounded-lg">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${iconPath}</svg>
        </span>`;
        if (!h2.classList.contains('!text-white')) {
            h2.innerHTML = iconSpan + fullTitle;
        }
    });

    const navLinks = navContainer.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: "-30% 0px -70% 0px" });

    sections.forEach(section => {
        observer.observe(section);
    });

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach(el => {
        animationObserver.observe(el);
    });

    const generateH2 = document.querySelector('#generate h2');
    const optimizeH2 = document.querySelector('#optimize h2');

    if (generateH2) {
        generateH2.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${icons['generate']}</svg>` + generateH2.textContent;
    }
    if (optimizeH2) {
        optimizeH2.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${icons['optimize']}</svg>` + optimizeH2.textContent;
    }
});
