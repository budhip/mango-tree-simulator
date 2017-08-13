var cron = require('node-cron');
var firebase = require('firebase')

var config = {
  apiKey: "AIzaSyBKtVIN2MX24cshL1z86K3cbH4raqv22RU",
  authDomain: "mango-tree-3c126.firebaseapp.com",
  databaseURL: "https://mango-tree-3c126.firebaseio.com",
  projectId: "mango-tree-3c126",
  storageBucket: "mango-tree-3c126.appspot.com",
  messagingSenderId: "684277572061"
};

firebase.initializeApp(config);

var database = firebase.database()

class FruitTree {
  constructor() {
    this.umur = 0;
    this.tinggi = 0;
    this.buah = [];
    this.statusKesehatan = true;
    this.MaxUmur = 26;
  }
  getAge() {
    return this.umur;
  }
  getHeight() {
    return this.tinggi;
  }
  getFruits() {
    return this.buah;
  }
  getHealtyStatus() {
    return this.statusKesehatan;
  }

  grow(maxUmur) {
    this.umur++;
    if (this.umur < maxUmur) {
      if (this.umur <= (maxUmur-10)) {
        this.tinggi = this.tinggi + parseFloat((Math.random() * 7).toFixed(2));
      }
    }
    if (this.umur == maxUmur) {
      this.statusKesehatan = false;
    }
  }

  produceFruits() {
    if(this.umur > 7) {
      let jumlahBuahdiProduksi = Math.ceil(Math.random() * 15);
      for (let i = 0; i < jumlahBuahdiProduksi; i++) {
        this.buah.push(new Fruit);
      }
    }
  }

  harvest() {
    let jmlGood = 0;
    let jmlBad = 0;

    for (let i = 0; i < this.buah.length; i++) {
      if (this.buah[i].quality == 'good') {
        jmlGood++;
      } else {
        jmlBad++;
      }
    }
    let fruitsHarvested = this.buah.length;
    this.buah = [];
    return `${fruitsHarvested} (${jmlGood} good, ${jmlBad} bad)`
  }
}

class Fruit {
  constructor() {
    this.quality = this.cekKualitasBuah();
  }
  cekKualitasBuah() {
    let kualitasAcak = Math.floor(Math.random() * 2);

    return (kualitasAcak == 0)? 'bad': 'good'
  }
}

class MangoTree extends FruitTree {
  constructor(name) {
    super();
    this.name = name;
    this.maxUmur = 26;
  }
}

class Mango extends Fruit{
}

let mangoTree = new MangoTree('Mango');
console.log(`The ${mangoTree.name} tree is alive! :smile:`);
var task = cron.schedule('*/10 * * * * *', function(){
  if (mangoTree.statusKesehatan != false) {
    mangoTree.grow(26);
    mangoTree.produceFruits();
    var umurnya = mangoTree.umur
    var tingginya = mangoTree.tinggi
    var buahnya = mangoTree.harvest()
    database.ref('mango-tree').set({
      umurSekarang: umurnya,
      tinggiSekarang: tingginya,
      buahSekarang: buahnya
    })
    console.log('ini tahun ke: ',mangoTree.umur);
    console.log('ini tinggi: ',mangoTree.tinggi);
    console.log('ini jumlah buah: ',mangoTree.harvest());
  }
  if (mangoTree.statusKesehatan == false) {
    console.log(`The ${mangoTree.name} tree has met its end. :sad:`);
    task.stop()
  }
});
