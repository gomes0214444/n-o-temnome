import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { app } from './firebaseConfig.js';

const db = getFirestore(app);
const container = document.getElementById("noticiaCompleta");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function carregarNoticia() {
  if (!id) return container.innerHTML = "<p>Notícia não encontrada.</p>";

  const docRef = doc(db, "noticias", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return container.innerHTML = "<p>Notícia não encontrada.</p>";

  const noticia = docSnap.data();

  // Verificação para garantir que os campos existam antes de exibir
  const titulo = noticia.titulo || "Sem título";
  const imagemUrl = noticia.imagemUrl || "";
  const descricao = noticia.descricao || "Sem descrição";
  const conteudo = noticia.conteudo || "Sem conteúdo disponível.";
  const creditos = noticia.creditos || "Não informado";
  
  // Coletando a data de publicação (se houver) e formatando-a
  const dataPublicacao = noticia.dataPublicacao ? new Date(noticia.dataPublicacao.seconds * 1000) : new Date();
  const dataFormatada = dataPublicacao.toLocaleDateString("pt-BR");

  container.innerHTML = `
    <h2>${titulo}</h2>
    ${imagemUrl ? `<img src="${imagemUrl}" alt="Imagem da notícia" style="max-width: 100%; margin-bottom: 1rem;" />` : ""}
    <p>${descricao}</p>
    <p>${conteudo}</p>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <p><strong>Créditos:</strong> ${creditos}</p>
      <p><strong>Data de Publicação:</strong> ${dataFormatada}</p>
    </div>
  `;
}

carregarNoticia();
