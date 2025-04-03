const botaoMorse = document.getElementById('botaoMorse');
const mensagemDiv = document.getElementById('mensagem');
const codigoDigitadoDisplay = document.getElementById('codigoDigitadoDisplay');
const codigoSecreto = ['.', '-', '-', '.', '.', '-', '-', '.'];
const codigoDigitado = [];
let pressionadoInicio;
const tempoPonto = 300;

function atualizarDisplayCodigo() {
    codigoDigitadoDisplay.textContent = codigoDigitado.join('');
}

function removerEventos() {
    botaoMorse.removeEventListener('mousedown', mousedownHandler);
    botaoMorse.removeEventListener('mouseup', mouseupHandler);
    botaoMorse.removeEventListener('touchstart', touchstartHandler);
    botaoMorse.removeEventListener('touchend', touchendHandler);
}

function trocar(imageId, newImageSrc, time) {
    let imagem = document.getElementById(imageId);
    imagem.style.opacity = "0";
    setTimeout(() => {
        imagem.src = newImageSrc;
        imagem.style.opacity = "1";
    }, time);
    document.getElementById("image-container").style.display = "flex";
}

function verificarCodigo() {
    if (codigoDigitado.every((valor, indice) => valor === codigoSecreto[indice])) {
        mensagemDiv.textContent = "...Após concluir o segundo desafio, a princesa pega a chave misteriosa dentro do lugar onde os sonhos repousam-se. Ela abre a grande porta que a separa do mundo externo e encontra a segunda flor, juntamente com a chave para os aposentos do norte, onde o próximo enigma espera ser solucionado...";

        trocar("trocar", "./resources/images/tulipaComplete.png", 200);
        trocar("trocar2", "./resources/images/tulipaComplete.png", 400);
        trocar("trocar3", "./resources/images/tulipa.png", 600);
        trocar("trocar4", "./resources/images/tulipa.png", 800);
        trocar("trocar5", "./resources/images/tulipa.png", 1000);

        removerEventos();
    } else {
        alert("Incorreto, tente novamente");
        codigoDigitado.length = 0;
        atualizarDisplayCodigo();
    }
}

function handlePress(isTouch) {
    return (event) => {
        if (isTouch) event.preventDefault();
        pressionadoInicio = Date.now();
        mensagemDiv.textContent = '';
    };
}

function handleRelease() {
    return () => {
        if (pressionadoInicio) {
            const tempoPressionado = Date.now() - pressionadoInicio;
            codigoDigitado.push(tempoPressionado < tempoPonto ? '.' : '-');
            pressionadoInicio = null;
            atualizarDisplayCodigo();

            if (codigoDigitado.length === codigoSecreto.length) {
                verificarCodigo();
            } else if (codigoDigitado.length > codigoSecreto.length) {
                mensagemDiv.textContent = "Incorreto, tente novamente (muitos dígitos)";
                codigoDigitado.length = 0;
                atualizarDisplayCodigo();
            }
        }
    };
}

const mousedownHandler = handlePress(false);
const mouseupHandler = handleRelease();
const touchstartHandler = handlePress(true);
const touchendHandler = handleRelease();

botaoMorse.addEventListener('mousedown', mousedownHandler);
botaoMorse.addEventListener('mouseup', mouseupHandler);
botaoMorse.addEventListener('touchstart', touchstartHandler);
botaoMorse.addEventListener('touchend', touchendHandler);
