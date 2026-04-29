document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Логіка випадаючих меню (Settings та Profile)
    const btnSettings = document.getElementById('navSettings');
    const btnProfile = document.getElementById('navProfile');
    const menuSettings = document.getElementById('settingsMenu');
    const menuProfile = document.getElementById('profileMenu');

    // Функція для закриття всіх меню
    function closeAllMenus() {
        menuSettings.classList.add('hidden');
        menuProfile.classList.add('hidden');
    }

    btnSettings.addEventListener('click', (e) => {
        e.stopPropagation(); // Запобігає закриттю меню одразу після відкриття
        const isHidden = menuSettings.classList.contains('hidden');
        closeAllMenus();
        if (isHidden) menuSettings.classList.remove('hidden');
    });

    btnProfile.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = menuProfile.classList.contains('hidden');
        closeAllMenus();
        if (isHidden) menuProfile.classList.remove('hidden');
    });

    // Закриття меню при кліку в будь-якому іншому місці екрану
    document.addEventListener('click', () => {
        closeAllMenus();
    });

    // Заборона закриття меню при кліку всередині самого меню
    menuSettings.addEventListener('click', (e) => e.stopPropagation());
    menuProfile.addEventListener('click', (e) => e.stopPropagation());


    // 2. Логіка запиту на Push-сповіщення (Notify me)
    const notifyBtn = document.getElementById('notifyBtn');
    
    notifyBtn.addEventListener('click', () => {
        // Перевіряємо чи підтримує браузер сповіщення
        if (!("Notification" in window)) {
            alert("На жаль, ваш браузер не підтримує веб-сповіщення.");
            return;
        }

        // Перевіряємо поточний статус дозволу
        if (Notification.permission === "granted") {
            alert("Ви вже надали дозвіл! Ми повідомимо вас, коли кухня буде повною.");
        } else if (Notification.permission !== "denied") {
            // Запитуємо дозвіл у користувача
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    // Якщо користувач дозволив, створюємо тестове сповіщення
                    new Notification("Smart Kitchen", {
                        body: "Сповіщення успішно налаштовані! Ви дізнаєтесь, коли кухня звільниться.",
                        icon: "https://cdn-icons-png.flaticon.com/512/3565/3565418.png" // Іконка дзвіночка
                    });
                    notifyBtn.textContent = "Увімкнено ✓";
                    notifyBtn.style.backgroundColor = "#d1e8d4";
                } else {
                    alert("Ви відхилили запит на сповіщення.");
                }
            });
        } else {
            alert("Ви раніше заблокували сповіщення. Дозвольте їх у налаштуваннях браузера.");
        }
    });

    // 3. Візуальне перемикання "активної" кнопки навігації
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Знімаємо клас active з усіх
            navItems.forEach(nav => nav.classList.remove('active'));
            // Додаємо тому, на який клікнули
            this.classList.add('active');
        });
    });

    // 4. Логіка розгортання історії (Mehr Anzeigen)
    const toggleHistoryBtn = document.getElementById('toggleHistoryBtn');
    const olderHistory = document.getElementById('olderHistory');
    const toggleText = document.getElementById('toggleText');
    const toggleIcon = document.getElementById('toggleIcon');

    if (toggleHistoryBtn && olderHistory) {
        toggleHistoryBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Зупиняє браузер від стрибка нагору при кліку на посилання
            
            if (olderHistory.style.display === 'none') {
                // Якщо було приховано - показуємо
                olderHistory.style.display = 'block';
                toggleText.textContent = 'Weniger Anzeigen'; // Міняємо текст на "Показати менше"
                toggleIcon.textContent = 'expand_less';      // Міняємо стрілочку догори
            } else {
                // Якщо було відкрито - ховаємо
                olderHistory.style.display = 'none';
                toggleText.textContent = 'Mehr Anzeigen';    // Повертаємо текст "Показати більше"
                toggleIcon.textContent = 'expand_more';      // Повертаємо стрілочку донизу
            }
        });
    }
});