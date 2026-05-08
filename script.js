document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dropdown menus logic (Settings and Profile)
    const btnSettings = document.getElementById('navSettings');
    const btnProfile = document.getElementById('navProfile');
    const menuSettings = document.getElementById('settingsMenu');
    const menuProfile = document.getElementById('profileMenu');

    // Function to close all menus
    function closeAllMenus() {
        menuSettings.classList.add('hidden');
        menuProfile.classList.add('hidden');
    }

    btnSettings.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents the menu from closing immediately after opening
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

    // Close menus when clicking anywhere else on the screen
    document.addEventListener('click', () => {
        closeAllMenus();
    });

    // Prevent closing when clicking inside the menu itself
    menuSettings.addEventListener('click', (e) => e.stopPropagation());
    menuProfile.addEventListener('click', (e) => e.stopPropagation());


    // 2. Push notification request logic (Notify me)
    const notifyBtn = document.getElementById('notifyBtn');
    
    notifyBtn.addEventListener('click', () => {
        // Check if the browser supports notifications
        if (!("Notification" in window)) {
            alert("На жаль, ваш браузер не підтримує веб-сповіщення.");
            return;
        }

        // Check current permission status
        if (Notification.permission === "granted") {
            alert("Ви вже надали дозвіл! Ми повідомимо вас, коли кухня буде повною.");
        } else if (Notification.permission !== "denied") {
            // Request permission from the user
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    // If the user granted permission, create a test notification
                    new Notification("Smart Kitchen", {
                        body: "Сповіщення успішно налаштовані! Ви дізнаєтесь, коли кухня звільниться.",
                        icon: "https://cdn-icons-png.flaticon.com/512/3565/3565418.png" // Bell icon
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

    // 3. Visual toggling of the "active" navigation button
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove the active class from all
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add to the clicked one
            this.classList.add('active');
        });
    });

    // 4. History expansion logic (Mehr Anzeigen)
    const toggleHistoryBtn = document.getElementById('toggleHistoryBtn');
    const olderHistory = document.getElementById('olderHistory');
    const toggleText = document.getElementById('toggleText');
    const toggleIcon = document.getElementById('toggleIcon');

    if (toggleHistoryBtn && olderHistory) {
        toggleHistoryBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevents the browser from jumping to the top when clicking the link
            
            if (olderHistory.style.display === 'none') {
                // If it was hidden - show it
                olderHistory.style.display = 'block';
                toggleText.textContent = 'Weniger Anzeigen'; // Change text to "Show less"
                toggleIcon.textContent = 'expand_less';      // Change arrow pointing up
            } else {
                // If it was open - hide it
                olderHistory.style.display = 'none';
                toggleText.textContent = 'Mehr Anzeigen';    // Return text to "Show more"
                toggleIcon.textContent = 'expand_more';      // Return arrow pointing down
            }
        });
    }
});