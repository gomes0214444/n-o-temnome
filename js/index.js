import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  increment,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { app } from './firebaseConfig.js';

const db = getFirestore(app); // Inicializa o Firestore
const noticiasContainer = document.getElementById("noticiasContainer"); // Obtém o container onde as notícias serão exibidas

// Função para carregar as notícias do Firestore
function carregarNoticias() {
  // Escuta em tempo real as mudanças na coleção "noticias"
  const unsub = onSnapshot(collection(db, "noticias"), (querySnapshot) => {
    if (querySnapshot.empty) {
      console.log("Nenhuma notícia encontrada.");
      noticiasContainer.innerHTML = "<p>Não há notícias disponíveis no momento.</p>";
      return;
    }

    noticiasContainer.innerHTML = ""; // Limpa o conteúdo anterior

    querySnapshot.forEach((docSnap) => {
      const noticia = docSnap.data(); // Obtém os dados da notícia
      const id = docSnap.id; // Obtém o ID do documento

      const noticiaDiv = document.createElement("div");
      noticiaDiv.className = "noticia"; // Define a classe para o card de notícia

      // Criação do elemento de imagem
      const imagem = document.createElement("img");
      imagem.src = noticia.imagemUrl; // A URL da imagem da notícia
      imagem.alt = "Imagem da Notícia";
      imagem.className = "imagem-grande"; // Adiciona a classe CSS para estilizar a imagem
      noticiaDiv.appendChild(imagem);

      // Criação do título como link
      const tituloLink = document.createElement("a");
      tituloLink.href = `noticia.html?id=${id}`; // A URL do link leva à página de detalhes da notícia
      tituloLink.textContent = noticia.titulo;
      tituloLink.className = "titulo-noticia"; // Adiciona a classe CSS para o título
      noticiaDiv.appendChild(tituloLink);

      // Criação da seção de créditos
      const creditosP = document.createElement("p");
      creditosP.className = "creditos";
      creditosP.textContent = `Créditos: ${noticia.creditos}`;
      noticiaDiv.appendChild(creditosP);

      // Criar o botão de curtir com contador de curtidas
      const curtidas = noticia.curtidas || 0; // Se não houver curtidas, inicia com 0
      const jaCurtiu = localStorage.getItem(`curtida_${id}`) === "true";  // Verifica se o usuário já curtiu
      const curtirBtn = document.createElement("button");
      curtirBtn.className = "curtir-btn";
      curtirBtn.innerHTML = `❤️ <span class="curtidas-contador">${curtidas}</span>`;
      curtirBtn.disabled = jaCurtiu;  // Desativa o botão se o usuário já curtiu

      // Evento de clique para curtir a notícia
      curtirBtn.addEventListener("click", async () => {
        if (curtirBtn.disabled) return; // Impede múltiplos cliques

        try {
          const docRef = doc(db, "noticias", id); // Referência ao documento da notícia no Firestore
          await updateDoc(docRef, {
            curtidas: increment(1), // Incrementa o número de curtidas
          });

          // Atualiza o contador de curtidas no botão
          curtirBtn.innerHTML = `❤️ <span class="curtidas-contador">${curtidas + 1}</span>`;
          curtirBtn.disabled = true;  // Desabilita o botão após curtir

          // Salva no localStorage para impedir que curta novamente
          localStorage.setItem(`curtida_${id}`, "true");
        } catch (error) {
          console.error("Erro ao curtir:", error);
        }
      });

      noticiaDiv.appendChild(curtirBtn); // Adiciona o botão ao card da notícia
      noticiasContainer.appendChild(noticiaDiv); // Adiciona o card de notícia ao container
    });
  });

  // Retorna a função para cancelar a escuta (se necessário)
  return unsub;
}

// Chama a função para carregar as notícias e escutar as mudanças
carregarNoticias();
