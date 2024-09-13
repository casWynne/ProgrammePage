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
        // document.getElementById("page-header").innerHTML = "Select a programme";
        programmeMenu.innerHTML = `
                <h2>Psychology Programmes</h2>
                <p>Please choose the programme you are interested in:</p>
            `;
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

    function renderDetails(targetElement, details) {
        // Clear the existing content of the target element
        // Loop through each detail and append it to the target element
        details.forEach(detail => {
            if (detail.type === 'header') {
                const header = document.createElement('h3');
                header.textContent = detail.content;
                targetElement.appendChild(header);
            } else if (detail.type === 'text') {
                const paragraph = document.createElement('p');
                paragraph.textContent = detail.content;
                targetElement.appendChild(paragraph);
            } else if (detail.type === 'image') {
                const image = document.createElement('img');
                image.classList.add('details-image');
                image.src = detail.src;
                image.alt = detail.alt;
                targetElement.appendChild(image);
            }
        });
    }

    function showModuleMenu(programme, data) {
        // Clear previous content
        moduleMenu.innerHTML = '';

        // Create a container for the layout (flex container)
        const container = document.createElement('div');
        container.classList.add('module-menu-container');

        // Create a div for programme details (left side)
        const moduleDetails = document.createElement('div');
        moduleDetails.classList.add('module-details');
        renderDetails(moduleDetails, programme.details);

        // Create a div for staff details (left side)
        let staffDetails = document.createElement('div');
        const staffMember = data.staff.find(staff => staff.id === programme.staff);
        if (staffMember) {
            staffDetails.innerHTML = `
                    <h3>Staff Member</h3>
                    <p>If you have any questions or would like to know more about this ${programme.name} then please talk to ${staffMember.name} for more details.</p>
                    <img src="${staffMember.picture}" alt="${staffMember.name}" class="staff-image">
                    <p class="staff-name"><strong>${staffMember.name}</strong></p>
                `;
        } else {
            staffDetails.innerHTML = `<p>Please speak to a member of staff for more details</p>`;
        }

        // Append staff details below programme details in the same column
        moduleDetails.appendChild(staffDetails);

        // Create a div for buttons (right side)
        const moduleButtons = document.createElement('div');
        moduleButtons.classList.add('module-buttons');
        moduleButtons.innerHTML += `<h2>Modules</h2>`;
        programme.modules.forEach(moduleId => {
            const module = data.modules.find(mod => mod.id === moduleId);
            if (module) {
                const button = document.createElement('button');
                button.textContent = module.name;
                button.addEventListener('click', () => showModulePage(module));
                moduleButtons.appendChild(button);
            } else {
                console.warn(`Module with ID ${moduleId} not found.`);
            }
        });

        // Append both details and buttons to the container
        container.appendChild(moduleDetails);
        container.appendChild(moduleButtons);

        // Append container to the moduleMenu
        moduleMenu.appendChild(container);

        // Toggle visibility
        programmeMenu.classList.remove('active');
        moduleMenu.classList.add('active');
        modulePage.classList.remove('active');
        backToProgrammesBtn.classList.remove('hidden');
        backToModulesBtn.classList.add('hidden');
    }


    function showModulePage(module) {
        // document.getElementById("page-header").innerHTML = `${module.name}`;
        modulePage.innerHTML = `
                <h2>${module.name}</h2>
            `;

        renderDetails(modulePage, module.details);

        moduleMenu.classList.remove('active');
        modulePage.classList.add('active');

        backToModulesBtn.classList.remove('hidden');
    }

    backToProgrammesBtn.addEventListener('click', () => {
        moduleMenu.classList.remove('active');
        programmeMenu.classList.add('active');
        backToProgrammesBtn.classList.add('hidden');
        backToModulesBtn.classList.add('hidden');
        // document.getElementById("page-header").innerHTML = "Select a programme";
    });

    backToModulesBtn.addEventListener('click', () => {
        modulePage.classList.remove('active');
        moduleMenu.classList.add('active');
        backToModulesBtn.classList.add('hidden');
        backToProgrammesBtn.classList.remove('hidden');
    });
});
