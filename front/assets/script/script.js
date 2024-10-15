const uri = 'http://localhost:3000/';
const divs = document.querySelectorAll('.quad');
const corpo = document.getElementById('corpo');

function formatarPreco(preco) {
    return 'R$ ' + preco.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

divs.forEach(div => {
    div.addEventListener('click', () => {
        const conteudo = div.textContent;

        document.getElementById('area').textContent = 'Área ' + conteudo;

        fetch(uri + 'alocacao/' + conteudo)
            .then(response => {
                if (!response.ok) {
                    throw new Error('woNetrk response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && Array.isArray(data)) {
                    corpo.innerHTML = '';
                    data.forEach(aloc => {
                        corpo.innerHTML += `
                        <tr>
                            <td style="text-align:center">${aloc.automoveis.Modelo}</td>
                            <td id="preco">${formatarPreco(aloc.automoveis.Preco)}</td>
                            <td style="text-align:center">
                                <button class="bexcluir" onclick="excluir(${aloc.id})">Excluir</button>
                                <button class="bvisualizar" onclick="visualizar(${aloc.id})">Visualizar</button>
                            </td>
                        </tr>`;
                    });
                } else {
                    console.warn('Nenhuma alocação encontrada ou a estrutura é inválida.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar alocação:', error);
            });
    });
});




function modal() {
    modalNovo.classList.remove('oculto')
}


