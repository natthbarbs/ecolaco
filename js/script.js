// Funções para abrir e fechar o menu
function abrirMenu() {
    document.getElementById('menu-overlay').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Impede scroll da página principal
}

function fecharMenu() {
    document.getElementById('menu-overlay').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaura scroll da página principal
}

// Fechar o menu ao clicar fora dele
document.getElementById('menu-overlay').addEventListener('click', function(e) {
    if (e.target === this) {
        fecharMenu();
    }
});

// Fechar o menu com a tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        fecharMenu();
    }
});


// Inicializar o mapa quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('Site EcoLaço carregado com sucesso!');
    
    // Coordenadas do centro de Jacarezinho
    const mapa = L.map('mapa-norte-pioneiro').setView([-23.1600, -49.9698], 13);
    
    // Adicionar camada do mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);
    
    // Ícone personalizado para os marcadores
    const iconeVerde = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    
    // EXEMPLO: Pontos de coleta em Jacarezinho
    // SUBSTITUA estas coordenadas e informações com os dados reais que você tem
    const pontosJacarezinho = [
        {
            nome: "UBS Dr. Domingos Módena (Bairro Aeroporto)", 
            coordenadas: [-23.144288, -49.942360],
            tipo: "Ponto de Entrega Voluntária",
        },
        {
            nome: "Centro da Juventude José Richa - CJJR", 
            coordenadas: [-23.148066, -49.942691],
            tipo: "Ponto de Entrega Voluntária",
        },
        {
            nome: "Posto de Saúde - Bairro Aeroporto", 
            coordenadas: [-23.146231, -49.947891],
            tipo: "Ponto de Entrega Voluntária",
        },
        {
            nome: "UBS Dr Iolando Batista", 
            coordenadas: [-23.154756258343237, -49.96256550448288],
            tipo: "Ponto de Entrega Voluntária",
        },
        {
            nome: "Escola Prof Maria Tereza de A Quevedo", 
            coordenadas: [-23.154121243219528, -49.96028040031802],
            tipo: "Ponto de Entrega Voluntária",
        },
        {
            nome: "EMEF Profa.Ruth Pimentel Rocha", 
            coordenadas: [-23.16113205501756, -49.96525552956386],
            tipo: "Ponto de Entrega Voluntária",
        },
        {
            nome: "Sebrae Jacarezinho", 
            coordenadas: [-23.163218556304724, -49.97307532728019],
            tipo: "Ponto de Entrega Voluntária",
        },
        {
            nome: "BioFórmulas Farmácia de Manipulação Jacarezinho", 
            coordenadas: [-23.15944341802658, -49.972159265939545],
            tipo: "Ponto de Entrega Voluntária",
        },
        {
            nome: "Posto Petrobras - Fox", 
            coordenadas: [-23.1541183352006, -49.96663636061053],
            tipo: "Ponto de Entrega Voluntária",
        },
        {
            nome: "ONG Nubia Rafaela Nogueira ALGBTI+", 
            coordenadas: [-23.149109167973307, -49.965536617218895],
            tipo: "Ponto de Entrega Voluntária",
        },
        {
            nome: "EMEI Nona Panichi", 
            coordenadas: [-23.149217682955943, -49.96433498762096],
            tipo: "Ponto de Entrega Voluntária",
        },
        {
            nome: "UBS Dr. João Bello Netto", 
            coordenadas: [-23.152281473431234, -49.970154557989346],
            tipo: "Ponto de Entrega Voluntária",
        },
        {
            nome: "AABB - Associação Atlética do Banco do Brasil", 
            coordenadas: [-23.148831565342647, -49.97862410771047],
            tipo: "Ponto de Entrega Voluntária",
        },
        {
            nome: "Instituto Federal do Paraná - Campus Jacarezinho", 
            coordenadas: [-23.140379045141213, -49.97264353366613],
            tipo: "Ponto de Entrega Voluntária",
        },
        {
            nome: "UBS Dom Pedro Filipack - Irmã Margarida", 
            coordenadas: [-23.154038008796164, -49.9892672270356],
            tipo: "Ponto de Entrega Voluntária",
        },
        {
            nome: "EMEI Cantinho Meu", 
            coordenadas: [-23.157634751049546, -49.98833075005211],
            tipo: "Ponto de Entrega Voluntária",
        },
        {
            nome: "Uninter Polo Jacarezinho", 
            coordenadas: [-23.161484987465922, -49.98135123248604],
            tipo: "Ponto de Entrega Voluntária",
        },
        {
            nome: "Núcleo Regional de Educação de Jacarezinho",
            coordenadas:[-23.152993946554357, -49.97609361948579],
            tipo: "Ponto de Entrega Voluntária"
        },
        {
            nome: "EMEF Arlindo Bessa Junior",
            coordenadas:[-23.17054063039476, -49.98110226572005],
            tipo: "Ponto de Entrega Voluntária"
        },
        {
            nome: "Corpo de Bombeiros de JacarezinhoS",
            coordenadas:[-23.171881928774056, -49.97832652384913],
            tipo: "Ponto de Entrega Voluntária"
        },
    ];
    
    // Adicionar marcadores para os pontos de Jacarezinho
    pontosJacarezinho.forEach(ponto => {
        const marker = L.marker(ponto.coordenadas, {icon: iconeVerde})
            .addTo(mapa)
            .bindPopup(`
                <strong>${ponto.nome}</strong><br>
                <em>${ponto.tipo}</em><br>
                ${ponto.descricao}
            `);
    });
    
    // Adicionar event listeners para os cards
    const cards = {
        'mapa-card': 'mapa.html',
        'pev-card': 'pev.html',
        'dicas-card': 'dicas.html',
        'campanha-card': 'campanhas.html',
        'indicadores-card': 'indicadores.html'
    };
    
});