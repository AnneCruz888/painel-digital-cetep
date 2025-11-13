document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.getElementById(tab.dataset.tab);

            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));

            tab.classList.add('active');
            target.classList.add('active');
        });
    });

    const allCourses = [
        { id: 'informatica', name: 'Informática' },
        { id: 'edificacoes', name: 'Edificações' },
        { id: 'nutricao_dietetica', name: 'Nutrição e Dietética' },
        { id: 'enfermagem', name: 'Enfermagem' },
        { id: 'analises_clinicas', name: 'Análises Clínicas' },
        { id: 'quimica', name: 'Química' },
        { id: 'meio_ambiente', name: 'Meio Ambiente' },
        { id: 'logistica', name: 'Logística' },
        { id: 'seguranca_trabalho', name: 'Segurança do Trabalho' },
        { id: 'administracao', name: 'Administração' }
    ];

    const allSchedules = {
        '1a-informatica': {
            title: "1ª Série - Informática", sala: "Lab 01", turno: "Manhã",
            horarios: {
                "Segunda-feira": [{ materia: "Lógica de Programação", prof: "Andressa" }, { materia: "Português I", prof: "Wagner" }],
                "Terça-feira": [{ materia: "Hardware", prof: "Alexandre" }, { materia: "Matemática I", prof: "Marcus Lins" }],
                "Quarta-feira": [{ materia: "Sistemas Operacionais", prof: "Edjan" }, { materia: "História", prof: "Felipe" }],
                "Quinta-feira": [{ materia: "Desenho Técnico", prof: "Ana" }, { materia: "Inglês Técnico", prof: "Carla" }],
                "Sexta-feira": [{ materia: "Biologia", prof: "Luciana" }, { materia: "Química", prof: "Mariana" }]
            }
        },
        '2a-edificacoes': {
            title: "2ª Série - Edificações", sala: "Sala 06", turno: "Vespertino",
            horarios: {
                "Segunda-feira": [{ materia: "Desenho Técnico II", prof: "Carlos" }, { materia: "Resistência dos Materiais", prof: "Bia" }],
                "Terça-feira": [{ materia: "Sistemas Estruturais", prof: "João" }, { materia: "Língua Portuguesa II", prof: "Wagner" }],
                "Quarta-feira": [{ materia: "Gestão de Obras", prof: "Ana" }, { materia: "Física II", prof: "Rita" }],
                "Quinta-feira": [{ materia: "Instalações Hidráulicas", prof: "Laura" }, { materia: "Matemática II", prof: "Marcus Lins" }],
                "Sexta-feira": [{ materia: "Topografia II", prof: "Pedro" }, { materia: "História", prof: "Felipe" }]
            }
        },
        '3a-informatica': {
            title: "3ª Série - Informática (3TIM4)", sala: "Lab 03", turno: "Manhã",
            horarios: {
                "Segunda-feira": [{ materia: "Inst e Manut de Compu I", prof: "Alexandre" }, { materia: "Inst e Manut de Compu I", prof: "Alexandre" }, { materia: "Ling de Programação", prof: "Andressa" }, { materia: "Mundo Trab Emp Int Social", prof: "Carise" }, { materia: "Mundo Trab Emp Int Social", prof: "Carise" }, { materia: "Química", prof: "Mariana" }],
                "Terça-feira": [{ materia: "Redes de Computadores II", prof: "Edjan" }, { materia: "Redes de Computadores II", prof: "Edjan" }, { materia: "Seg de Sist e Redes", prof: "Alexandre" }, { materia: "Seg de Sist e Redes", prof: "Alexandre" }, { materia: "Língua Portuguesa", prof: "Wagner Santana" }, { materia: "Matemática", prof: "Marcus Lins" }],
                "Quarta-feira": [{ materia: "Física", prof: "Rita" }, { materia: "Biologia", prof: "Luciana" }, { materia: "Projeto Experimental II", prof: "Jesiane/Mariluce" }, { materia: "Higi Saúde Seg no Traba", prof: "Antonia" }, { materia: "Matemática", prof: "Marcus Lins" }, { materia: "Matemática", prof: "Marcus Lins" }],
                "Quinta-feira": [{ materia: "Análise e Proj de Sistema", prof: "Alexandre" }, { materia: "Análise e Proj de Sistema", prof: "Alexandre" }, { materia: "Programação Visual", prof: "Andressa" }, { materia: "Programação Visual", prof: "Andressa" }, { materia: "Língua Portuguesa", prof: "Wagner Santana" }, { materia: "Língua Portuguesa", prof: "Wagner Santana" }],
                "Sexta-feira": [{ materia: "Internet e Programação We", prof: "Andressa" }, { materia: "Internet e Programação We", prof: "Andressa" }, { materia: "Geografia", prof: "Ivanice" }, { materia: "Geografia", prof: "Ivanice" }, { materia: "Arte", prof: "Sergio" }, { materia: "Arte", prof: "Sergio" }]
            }
        }
    };
    
    const allAnnouncements = [
        { title: "Período de Avaliações (3ª Unidade)", content: "Prezados alunos, o período de avaliações da 3ª Unidade terá início no dia 24/11. Consultem o cronograma completo fixado nos murais." },
        { title: "Mudança no Horário da Turma 3QUIM1", content: "Atenção, Turma 3QUIM1! O professor de Química Orgânica foi substituido. A mudança é válida a partir desta quinta-feira." },
        { title: "Sábado Letivo Obrigatório", content: "Lembramos que o próximo sábado será um Sábado Letivo Obrigatório para todas as turmas, para reposição de feriados. As aulas seguirão a grade da 6ª Feira." }
    ];

    const selectGrade = document.getElementById('select-grade');
    const selectCourse = document.getElementById('select-course');
    const scheduleDisplay = document.getElementById('schedule-display');
    const scheduleTitle = document.getElementById('schedule-title');
    const scheduleGrid = document.getElementById('schedule-grid');

    allCourses.forEach(course => {
        const option = document.createElement('option');
        option.value = course.id;
        option.textContent = course.name;
        selectCourse.appendChild(option);
    });

    function updateSchedule() {
        const grade = selectGrade.value;
        const course = selectCourse.value;
        
        if (grade && course) {
            const key = `${grade}-${course}`;
            const scheduleData = allSchedules[key];
            
            if (scheduleData) {
                scheduleTitle.textContent = `${scheduleData.title} | Turno: ${scheduleData.turno} | Sala: ${scheduleData.sala}`;
                scheduleGrid.innerHTML = '';
                
                const diasDaSemana = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"];

                diasDaSemana.forEach(dia => {
                    if (scheduleData.horarios[dia]) {
                        const dayCard = document.createElement('div');
                        dayCard.className = 'schedule-day';
                        
                        let dayHTML = `<h4>${dia}</h4>`;
                        
                        scheduleData.horarios[dia].forEach(item => {
                            const horaDisplay = item.hora ? `<strong>${item.hora}</strong> - ` : '';
                            const profDisplay = item.prof ? `<br><span>Professor(a): ${item.prof}</span>` : '';
                            dayHTML += `
                                <div class="schedule-item">
                                    ${horaDisplay}${item.materia}
                                    ${profDisplay}
                                </div>
                            `;
                        });
                        
                        dayCard.innerHTML = dayHTML;
                        scheduleGrid.appendChild(dayCard);
                    }
                });
                
                scheduleDisplay.classList.remove('hidden');
            } else {
                scheduleGrid.innerHTML = '<p class="placeholder">Horário não encontrado para esta combinação.</p>';
                scheduleDisplay.classList.remove('hidden');
            }
        }
    }
    
    selectGrade.addEventListener('change', updateSchedule);
    selectCourse.addEventListener('change', updateSchedule);

    const announcementList = document.getElementById('announcement-list');

    function loadAnnouncements() {
        if (allAnnouncements.length > 0) {
            announcementList.innerHTML = '';
            allAnnouncements.forEach(item => {
                const announcementCard = document.createElement('div');
                announcementCard.className = 'announcement-item';
                announcementCard.innerHTML = `
                    <h4>${item.title}</h4>
                    <p>${item.content}</p>
                `;
                announcementList.appendChild(announcementCard);
            });
        }
    }
    
    loadAnnouncements();

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => console.log('Service Worker registrado com sucesso!'))
                .catch(error => console.log('Falha ao registrar Service Worker:', error));
        });
    }
});