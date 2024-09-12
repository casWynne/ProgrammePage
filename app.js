document.addEventListener('DOMContentLoaded', () => {
    const programmeMenu = document.getElementById('programme-menu');
    const moduleMenu = document.getElementById('module-menu');
    const modulePage = document.getElementById('module-page');
    const backToProgrammesBtn = document.getElementById('back-to-programmes');
    const backToModulesBtn = document.getElementById('back-to-modules');

    // Load JSON Data
    fetch('modules.json')
        .then(response => response.json())
        .then(data => {
            initializeProgrammeMenu(data);
        })
        .catch(error => console.error('Error loading JSON:', error));

    function initializeProgrammeMenu(data) {
        document.getElementById("page-header").innerHTML = "Select a programme";
        programmeMenu.innerHTML = '<h2>Programmes</h2>';
        data.programmes.forEach(programme => {
            const button = document.createElement('button');
            button.textContent = programme.name;
            button.addEventListener('click', () => showModuleMenu(programme, data));
            programmeMenu.appendChild(button);
        });

        // Set initial visibility
        programmeMenu.classList.add('active');
        backToProgrammesBtn.classList.add('hidden');
    }

    function showModuleMenu(programme, data) {
        document.getElementById("page-header").innerHTML = `${programme.name}`;
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

        // Toggle visibility
        programmeMenu.classList.remove('active');
        moduleMenu.classList.add('active');
        modulePage.classList.remove('active');

        backToProgrammesBtn.classList.remove('hidden');
        backToModulesBtn.classList.add('hidden');
    }

    function showModulePage(module) {
        document.getElementById("page-header").innerHTML = `${module.name}`;
        modulePage.innerHTML = `
            <h2>${module.name}</h2>
            <p><strong>Description:</strong> ${module.description}</p>
            <p><strong>Details:</strong> ${module.details}</p>
        `;

        moduleMenu.classList.remove('active');
        modulePage.classList.add('active');

        backToModulesBtn.classList.remove('hidden');
    }

    backToProgrammesBtn.addEventListener('click', () => {
        moduleMenu.classList.remove('active');
        programmeMenu.classList.add('active');
        backToProgrammesBtn.classList.add('hidden');
        backToModulesBtn.classList.add('hidden');
        document.getElementById("page-header").innerHTML = "Select a programme";
    });

    backToModulesBtn.addEventListener('click', () => {
        modulePage.classList.remove('active');
        moduleMenu.classList.add('active');
        backToModulesBtn.classList.add('hidden');
        backToProgrammesBtn.classList.remove('hidden');
    });
});
