function tabDeyis(panel) {

        
        document.getElementById('btn1').classList.remove('active')
        document.getElementById('btn2').classList.remove('active')
        document.getElementById('btn3').classList.remove('active')
        document.getElementById('btn4').classList.remove('active')
        document.getElementById('kredit').style.display = 'none'
        document.getElementById('depozit').style.display = 'none'
        document.getElementById('avtokredit').style.display = 'none'
        document.getElementById('ipoteka').style.display = 'none'
        document.getElementById('kredit-netice').style.display = 'none'
        document.getElementById('depozit-netice').style.display = 'none'
        document.getElementById('avtokredit-netice').style.display = 'none'
        document.getElementById('ipoteka-netice').style.display = 'none'
        
        if (panel === 'kredit') {
          document.getElementById('btn1').classList.add('active')
          document.getElementById('kredit').style.display = 'block'
          document.getElementById('kredit-netice').style.display = 'block'
        }

        if (panel === 'depozit') {
          document.getElementById('btn2').classList.add('active')
          document.getElementById('depozit').style.display = 'block'
          document.getElementById('depozit-netice').style.display = 'block'
        }

        if (panel === 'avtokredit') {
          document.getElementById('btn3').classList.add('active')
          document.getElementById('avtokredit').style.display = 'block'
          document.getElementById('avtokredit-netice').style.display = 'block'
        }

        if (panel === 'ipoteka') {
          document.getElementById('btn4').classList.add('active')
          document.getElementById('ipoteka').style.display = 'block'
          document.getElementById('ipoteka-netice').style.display = 'block'
        }
      }

      document.getElementById('btn1').onclick = function() { tabDeyis('kredit') }
      document.getElementById('btn2').onclick = function() { tabDeyis('depozit') }
      document.getElementById('btn3').onclick = function() { tabDeyis('avtokredit') }
      document.getElementById('btn4').onclick = function() { tabDeyis('ipoteka') }


      function kreditHesabla() {
        let P = Number(document.getElementById('mebleg-slider').value)
        let n = Number(document.getElementById('muddet-slider').value)
        let faiz = Number(document.getElementById('faiz-slider').value)
        let r = faiz / 100 / 12
        let aylik = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
        document.getElementById('kredit-netice-deger').textContent = aylik.toFixed(2) + ' ₼'
      }

      document.getElementById('mebleg-slider').oninput = function() {
        document.getElementById('mebleg-deger').textContent = this.value
        kreditHesabla()
      }

      document.getElementById('muddet-slider').oninput = function() {
        document.getElementById('muddet-deger').textContent = this.value
        kreditHesabla()
      }

      document.getElementById('faiz-slider').oninput = function() {
        document.getElementById('faiz-deger').textContent = this.value
        kreditHesabla()
      }

      kreditHesabla()

      let depFaizler_AZN_ay = { 3: 6, 6: 9, 12: 9.5, 18: 10, 24: 10, 36: 8.5 }
      let depFaizler_AZN_il = { 1: 7, 3: 8, 6: 10, 12: 10.5, 18: 11, 24: 11, 36: 9.5 }
      let depFaizler_USD_ay = { 3: 2, 6: 2.5, 12: 3, 18: 3 }
      let depFaizler_USD_il = { 1: 2, 3: 2.5, 6: 3, 12: 3.5, 18: 3.5 }
      let muddetler_AZN_ay = [3, 6, 12, 18, 24, 36]
      let muddetler_AZN_il = [1, 3, 6, 12, 18, 24, 36]
      let muddetler_USD_ay = [3, 6, 12, 18]
      let muddetler_USD_il = [1, 3, 6, 12, 18]
      let depValyuta = 'AZN'
      let depNov = 'ay'
      let depSecilmisAy = 3

      function depMuddetleriGoster() {
        let muddetSiyahisi = []

        if (depValyuta === 'AZN' && depNov === 'ay') {
          muddetSiyahisi = muddetler_AZN_ay
          depSecilmisAy = muddetler_AZN_ay[0]
        }

        if (depValyuta === 'AZN' && depNov === 'il') {
          muddetSiyahisi = muddetler_AZN_il
          depSecilmisAy = muddetler_AZN_il[0]
        }

        if (depValyuta === 'USD' && depNov === 'ay') {
          muddetSiyahisi = muddetler_USD_ay
          depSecilmisAy = muddetler_USD_ay[0]
        }

        if (depValyuta === 'USD' && depNov === 'il') {
          muddetSiyahisi = muddetler_USD_il
          depSecilmisAy = muddetler_USD_il[0]
        }
        let kod = ''
        muddetSiyahisi.forEach(function(m, i) {
          if (i === 0) {
            kod += `<button class="dep-ay-btn active" data-ay="${m}">${m}</button>`
          } else {
            kod += `<button class="dep-ay-btn" data-ay="${m}">${m}</button>`
          }
        })
        document.getElementById('dep-muddet-group').innerHTML = kod

        document.querySelectorAll('.dep-ay-btn').forEach(function(btn) {
          btn.onclick = function() {
            document.querySelectorAll('.dep-ay-btn').forEach(function(b) {
              b.classList.remove('active')
            })
            this.classList.add('active')
            depSecilmisAy = Number(this.dataset.ay)
            depozitHesabla()
          }
        })

        depozitHesabla()
      }

      function depozitHesabla() {
        let P = Number(document.getElementById('dep-mebleg-slider').value)
        let faiz = 0
        let simvol = ''
        if (depValyuta === 'AZN') {
          simvol = ' ₼'
        } else {
          simvol = ' $'
        }
        if (depValyuta === 'AZN' && depNov === 'ay') {
          faiz = depFaizler_AZN_ay[depSecilmisAy]
        }

        if (depValyuta === 'AZN' && depNov === 'il') {
          faiz = depFaizler_AZN_il[depSecilmisAy]
        }

        if (depValyuta === 'USD' && depNov === 'ay') {
          faiz = depFaizler_USD_ay[depSecilmisAy]
        }

        if (depValyuta === 'USD' && depNov === 'il') {
          faiz = depFaizler_USD_il[depSecilmisAy]
        }
        let aylikFaiz = P * (faiz / 100) / 12
        let n = 0
        if (depNov === 'ay') {
          n = depSecilmisAy
        } else {
          n = depSecilmisAy * 12
        }
        let umumi = aylikFaiz * n
        document.getElementById('dep-umumi-deger').textContent = umumi.toFixed(2) + simvol
        document.getElementById('dep-aylik-faiz').textContent = aylikFaiz.toFixed(2) + simvol
        document.getElementById('dep-faiz-derece').textContent = faiz + ' %'
        document.getElementById('dep-mebleg-deger').textContent = Number(P).toLocaleString()
      }

      document.getElementById('dep-mebleg-slider').oninput = function() {
        document.getElementById('dep-mebleg-deger').textContent = Number(this.value).toLocaleString()
        depozitHesabla()
      }

      document.getElementById('dep-her-ay').onclick = function() {
        document.getElementById('dep-her-ay').classList.add('active')
        document.getElementById('dep-her-il').classList.remove('active')
        depNov = 'ay'
        depMuddetleriGoster()
      }

      document.getElementById('dep-her-il').onclick = function() {
        document.getElementById('dep-her-il').classList.add('active')
        document.getElementById('dep-her-ay').classList.remove('active')
        depNov = 'il'
        depMuddetleriGoster()
      }

      document.getElementById('dep-azn').onclick = function() {
        document.getElementById('dep-azn').classList.add('active')
        document.getElementById('dep-usd').classList.remove('active')
        depValyuta = 'AZN'
        depMuddetleriGoster()
      }

      document.getElementById('dep-usd').onclick = function() {
        document.getElementById('dep-usd').classList.add('active')
        document.getElementById('dep-azn').classList.remove('active')
        depValyuta = 'USD'
        depMuddetleriGoster()
      }
      depMuddetleriGoster()
      let avtoFaiz = 14

      function avtoHesabla() {
        let qiymet = Number(document.getElementById('avto-qiymet-slider').value)
        let ilkinFaiz = Number(document.getElementById('avto-ilkin-slider').value)
        let n = Number(document.getElementById('avto-muddet-slider').value)

        let ilkinOdenis = qiymet * ilkinFaiz / 100
        let kreditMebleg = qiymet - ilkinOdenis
        let r = avtoFaiz / 100 / 12
        let aylik = (kreditMebleg * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
        let komissiya = kreditMebleg * 0.005
        if (komissiya < 20) {
          komissiya = 20
        }
        let umumi = aylik * n + komissiya
        document.getElementById('avto-aylik-deger').textContent = aylik.toFixed(2) + ' ₼'
        document.getElementById('avto-kredit-mebleg').textContent = kreditMebleg.toFixed(0) + ' ₼'
        document.getElementById('avto-faiz-derece').textContent = avtoFaiz + ' %'
        document.getElementById('avto-komissiya').textContent = komissiya.toFixed(0) + ' ₼'
        document.getElementById('avto-umumi').textContent = umumi.toFixed(2) + ' ₼'
      }
      document.querySelectorAll('.avto-nov-btn').forEach(function(btn) {
        btn.onclick = function() {
          document.querySelectorAll('.avto-nov-btn').forEach(function(b) {
            b.classList.remove('active')
          })
          this.classList.add('active')
          avtoFaiz = Number(this.dataset.faiz)
          avtoHesabla()
        }
      })
      document.getElementById('avto-qiymet-slider').oninput = function() {
        document.getElementById('avto-qiymet-deger').textContent = this.value
        avtoHesabla()
      }
      document.getElementById('avto-ilkin-slider').oninput = function() {
        document.getElementById('avto-ilkin-deger').textContent = this.value
        avtoHesabla()
      }
      document.getElementById('avto-muddet-slider').oninput = function() {
        document.getElementById('avto-muddet-deger').textContent = this.value
        avtoHesabla()
      }
      avtoHesabla()
      let ipoFaiz = 7
      function ipotekaHesabla() {
        let P = Number(document.getElementById('ipo-mebleg-slider').value)
        let il = Number(document.getElementById('ipo-muddet-slider').value)
        let n = il * 12
        let r = ipoFaiz / 100 / 12
        let aylik = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
        document.getElementById('ipo-aylik-deger').textContent = aylik.toFixed(2) + ' ₼'
        document.getElementById('ipo-kredit-mebleg').textContent = P.toLocaleString() + ' ₼'
        document.getElementById('ipo-faiz-derece').textContent = ipoFaiz + ' %'
        document.getElementById('ipo-mebleg-deger').textContent = P.toLocaleString()
      }
      document.getElementById('ipo-mebleg-slider').oninput = function() {
        document.getElementById('ipo-mebleg-deger').textContent = Number(this.value).toLocaleString()
        ipotekaHesabla()
      }
      document.getElementById('ipo-muddet-slider').oninput = function() {
        document.getElementById('ipo-muddet-deger').textContent = this.value
        ipotekaHesabla()
      }
      document.querySelectorAll('.ipo-faiz-btn').forEach(function(btn) {
        btn.onclick = function() {
          document.querySelectorAll('.ipo-faiz-btn').forEach(function(b) {
            b.classList.remove('active')
          })
          this.classList.add('active')
          ipoFaiz = Number(this.dataset.faiz)
          ipotekaHesabla()
        }
      })
      ipotekaHesabla()

      document.getElementById('tema-btn').onclick = function() {
        document.body.classList.toggle('light')
        if (document.body.classList.contains('light')) {
          this.textContent = '☀️'
        } else {
          this.textContent = '🌙'
        }
      }