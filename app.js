document.addEventListener('DOMContentLoaded', () => {
    const programmeMenu = document.getElementById('programme-menu');
    const moduleMenu = document.getElementById('module-menu');
    const modulePage = document.getElementById('module-page');

    // Load JSON Data
    fetch('modules.json')
        .then(response => response.json())
        .then(data => {
            initializeProgrammeMenu(data);
        })
        .catch(error => console.error('Error loading JSON:', error));

    function initializeProgrammeMenu(data) {
        document.getElementById("page-header").innerHTML = `Select a programme`
        programmeMenu.innerHTML = '<h2>Programmes</h2>';
        data.programmes.forEach(programme => {
            const button = document.createElement('button');
            button.textContent = programme.name;
            button.addEventListener('click', () => showModuleMenu(programme, data));
            programmeMenu.appendChild(button);
        });

        // Set initial visibility
        programmeMenu.classList.add('active');
    }

    function showModuleMenu(programme, data) {
        document.getElementById("page-header").innerHTML = `${programme.name}`
        // Populate the module menu
        moduleMenu.innerHTML = `
        <p><strong>Programme Description:</strong> ${programme.description}</p>
        <h2>Modules</h2>
        `;
        programme.modules.forEach(moduleId => {
            const module = data.modules.find(mod => mod.id === moduleId);
            const button = document.createElement('button');
            button.textContent = module.name;
            button.addEventListener('click', () => showModulePage(module));
            moduleMenu.appendChild(button);
        });

        const backButton = document.createElement('button');
        backButton.textContent = 'Back to Programmes';
        backButton.addEventListener('click', goBackToProgrammeMenu);
        moduleMenu.appendChild(backButton);

        // Hide programme menu, show module menu
        programmeMenu.classList.remove('active');
        moduleMenu.classList.add('active');
        modulePage.classList.remove('active');
    }

    function showModulePage(module) {
        modulePage.innerHTML = `
            <h2>${module.name}</h2>
            <p><strong>Description:</strong> ${module.description}</p>
            <p><strong>Details:</strong> ${module.details}</p>
        `;

        const backButton = document.createElement('button');
        backButton.textContent = 'Back to Modules';
        backButton.addEventListener('click', goBackToModuleMenu);
        modulePage.appendChild(backButton);

        // Hide module menu, show module page
        moduleMenu.classList.remove('active');
        modulePage.classList.add('active');
    }

    function goBackToProgrammeMenu() {
        document.getElementById("page-header").innerHTML = `Select a programme`;
        // Show programme menu, hide module menu
        moduleMenu.classList.remove('active');
        programmeMenu.classList.add('active');
    }

    function goBackToModuleMenu() {
        // Show module menu, hide module page
        modulePage.classList.remove('active');
        moduleMenu.classList.add('active');
    }
});
