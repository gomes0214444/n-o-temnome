import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { app } from './firebaseConfig.js';

const db = getFirestore(app);

const noticiaForm = document.getElementById("noticiaForm");

noticiaForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const conteudo = document.getElementById("conteudo").value;
  const descricao = document.getElementById("descricao").value;
  const creditos = document.getElementById("creditos").value;
  const imagem = document.getElementById("imagem").files[0];

  if (!imagem) {
    alert("Por favor, selecione uma imagem.");
    return;
  }

  const reader = new FileReader();
  reader.onload = async () => {
    const imagemBase64 = reader.result;

    try {
      await addDoc(collection(db, "noticias"), {
        titulo,
        conteudo,
        descricao,
        creditos,
        imagemUrl: imagemBase64,
        data: new Date()
      });

      alert("Notícia publicada com sucesso!");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao publicar notícia:", error);
      alert("Erro ao publicar notícia.");
    }
  };

  reader.readAsDataURL(imagem);
});
