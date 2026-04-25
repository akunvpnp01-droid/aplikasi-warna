// 🔥 GANTI DENGAN CONFIG FIREBASE KAMU
const firebaseConfig = {
  apiKey: "ISI",
  authDomain: "ISI",
  projectId: "ISI",
  storageBucket: "ISI",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// LOGIN
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("Login berhasil");
      loadData();
    })
    .catch(err => alert(err.message));
}

// SIMPAN DATA
function simpan() {
  const spk = document.getElementById("spk").value;
  const unit = document.getElementById("unit").value;
  const ket = document.getElementById("ket").value;
  const file = document.getElementById("gambar").files[0];

  if (!file) return alert("Upload gambar dulu");

  const ref = firebase.storage().ref(file.name);

  ref.put(file).then(() => {
    ref.getDownloadURL().then(url => {
      db.collection("spk").add({
        spk, unit, ket, gambar: url
      }).then(() => {
        alert("Data tersimpan");
        loadData();
      });
    });
  });
}

// LOAD DATA
function loadData() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  db.collection("spk").get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();

      const li = document.createElement("li");
      li.innerHTML = `
        <b>${data.spk}</b> - ${data.unit} 
        <br>
        <img src="${data.gambar}" width="100">
      `;

      list.appendChild(li);
    });
  });
}
